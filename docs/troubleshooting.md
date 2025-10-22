# 🔧 Troubleshooting — Sistema Futebol

Este guia une e organiza o melhor conteúdo de `docs/sugestao TROUBLESHOOTING.md` e do antigo `docs/troubleshooting.md`. Foca em recuperação rápida, diagnóstico eficiente e correções seguras em produção.

## Checklist de Diagnóstico Rápido

1. Status dos containers
```
docker compose -f docker-compose.prod.yml ps
```
2. Logs do backend
```
docker compose -f docker-compose.prod.yml logs --tail=100 backend
```
3. Health HTTP
```
curl -s http://localhost:5000/api/health
```
4. Banco de dados
```
docker compose -f docker-compose.prod.yml exec postgres \
  psql -U sistema_futebol -d sistema_futebol_prod -c "SELECT 1"
```
5. Migrações Alembic
```
docker compose -f docker-compose.prod.yml exec backend flask db current
```
6. Emergency fix (se necessário)
```
bash scripts/emergency-fix.sh
```

## Falha de Startup — Loop de Restart e erro SQLAlchemy 2.x

- Sintomas:
  - Backend em "Restarting"/"unhealthy"; 502 no site.
  - Log: `❌ [SCHEMA] Schema validation failed: 'Engine' object has no attribute 'execute'`.
- Causa: uso de padrão antigo do SQLAlchemy 1.x (`engine.execute`) no entrypoint/cheques de schema, enquanto o projeto usa SQLAlchemy 2.x.
- Correção temporária segura (bypass do entrypoint + migrations + gunicorn):
```
# docker-compose.override.yml (exemplo) — aplicar junto com o compose principal
services:
  backend:
    entrypoint: []
    command: >
      sh -c "\
        echo '🔄 Aplicando migrations...' && \
        flask db upgrade && \
        echo '✅ Migrations OK' && \
        echo '🚀 Iniciando Gunicorn...' && \
        gunicorn -w 4 -b 0.0.0.0:5000 --timeout 120 backend.app:app"
    environment:
      SKIP_SCHEMA_VALIDATION: "true"
```
- Execução com override:
```
docker compose -f docker-compose.prod.yml -f docker-compose.override.yml up -d --pull always
```
- Verificar que o override foi aplicado:
```
docker inspect sistema_futebol_backend | grep -i Entrypoint
```
- Correção permanente (aplicar no código):
```
from sqlalchemy import text, inspect

# Inspeção segue via engine
inspector = inspect(db.engine)

# Queries devem usar conexão
with db.engine.connect() as conn:
    conn.execute(text('SELECT 1'))
```

## Migrações falhando — InFailedSqlTransaction

- Sintomas:
  - `flask db upgrade` aborta; logs mostram transação abortada.
- Solução:
```
# Aplicar SQL idempotente
 docker compose -f docker-compose.prod.yml exec -T postgres \
  psql -U sistema_futebol -d sistema_futebol_prod < scripts/migrations_idempotent.sql

# Reiniciar backend
 docker compose -f docker-compose.prod.yml restart backend
```
- Sincronismo Alembic:
```
docker compose -f docker-compose.prod.yml exec backend flask db stamp head
docker compose -f docker-compose.prod.yml exec backend flask db upgrade
```

## Colunas ausentes / Schema divergente

- Exemplos comuns:
  - `users.initial_balance` ausente
  - `monthly_players.custom_monthly_fee` ou `players.monthly_fee` ausentes
- Diagnóstico:
```
docker compose -f docker-compose.prod.yml exec postgres \
  psql -U sistema_futebol -d sistema_futebol_prod -c "\\d users"
```
- Correção idempotente rápida (exemplo):
```
docker compose -f docker-compose.prod.yml exec postgres \
  psql -U sistema_futebol -d sistema_futebol_prod -c "ALTER TABLE users ADD COLUMN IF NOT EXISTS initial_balance NUMERIC(12,2) DEFAULT 0 NOT NULL;"
```
- Confirmar versão Alembic e reiniciar backend:
```
docker compose -f docker-compose.prod.yml exec backend flask db current
docker compose -f docker-compose.prod.yml restart backend
```

## PostgreSQL — Conexão e Saúde

- Diagnóstico:
```
docker compose -f docker-compose.prod.yml ps postgres

docker compose -f docker-compose.prod.yml logs postgres

docker compose -f docker-compose.prod.yml exec postgres \
  psql -U sistema_futebol -d sistema_futebol_prod -c "SELECT 1"
```
- Se necessário, reiniciar:
```
docker compose -f docker-compose.prod.yml restart postgres
```

## Containers "unhealthy"

- Ver o check que falha:
```
docker compose -f docker-compose.prod.yml ps
```
- Backend:
```
docker compose -f docker-compose.prod.yml exec backend curl -s http://localhost:5000/api/health

docker compose -f docker-compose.prod.yml logs --tail=100 backend
```
- Reinício isolado:
```
docker compose -f docker-compose.prod.yml restart backend
```

## Frontend 502 com Backend OK

- Diagnóstico e correção:
```
docker compose -f docker-compose.prod.yml up -d frontend

docker compose -f docker-compose.prod.yml logs --tail=50 frontend

# Teste rápido
curl -I https://esporteflowpro.com.br
```

## Deploy — GitHub Actions

- Se falhar em "Deploy to VPS":
  - Verificar secrets em `Settings > Secrets and variables > Actions`:
    - `VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY`, `POSTGRES_PASSWORD`, `PROD_SECRET_KEY`, `PROD_JWT_SECRET_KEY`, `PROD_CORS_ORIGINS`.
  - Testar SSH manual: `ssh root@<HOST>`.

## Rotas e Login

- Use o prefixo correto: `POST /api/auth/login`.
- Certifique que o backend está respondendo e o proxy mapeia para o container.

## Performance e Observabilidade

- Endpoint agregado `/api/cashflow/summary`:
  - Índices concorrentes recomendados:
```
CREATE INDEX CONCURRENTLY idx_expenses_user_year_month ON expenses (user_id, year, month);
CREATE INDEX CONCURRENTLY idx_monthly_periods_user_year_month ON monthly_periods (user_id, year, month);
```
  - Medir com `EXPLAIN ANALYZE`.
  - Monitorar progresso de índices: `SELECT * FROM pg_stat_progress_create_index;`.
- Headers úteis:
  - `X-Trace-Id`: correlação de logs.
  - `X-Request-Duration-ms`: duração no servidor.
- Rollbacks úteis:
  - Frontend: desligar `NEXT_PUBLIC_USE_AGGREGATED_CF`.
  - Backend: desativar `Flask-Compress` apenas para diagnóstico.

## Comandos Úteis

- Logs:
```
docker compose -f docker-compose.prod.yml logs -f backend

docker compose -f docker-compose.prod.yml logs --tail=100 backend

docker compose -f docker-compose.prod.yml logs backend | grep -i error
```
- Status e inspeção:
```
docker compose -f docker-compose.prod.yml ps

docker stats

docker inspect sistema_futebol_backend
```

## Banco de Dados — Operações

- Conectar:
```
docker compose -f docker-compose.prod.yml exec postgres \
  psql -U sistema_futebol -d sistema_futebol_prod
```
- Tabelas e estrutura:
```
\dt
\d users
SELECT * FROM alembic_version;
```
- Sair: `\q`

## Backup e Restore

- Backup:
```
docker compose -f docker-compose.prod.yml exec -T postgres \
  pg_dump -Fc -U sistema_futebol sistema_futebol_prod \
  > backup_$(date +%Y%m%d_%H%M%S).dump
```
- Restore:
```
docker compose -f docker-compose.prod.yml exec -T postgres \
  pg_restore -c -U sistema_futebol -d sistema_futebol_prod \
  < backup_NOME_DO_ARQUIVO.dump
```

## Dicas de Compose — Variáveis e Health

- Backend deve ter variáveis de DB disponíveis (ex.: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`) além de `DATABASE_URL`.
- Healthcheck HTTP tolerante em startup:
```
healthcheck:
  test: ["CMD", "curl", "-s", "http://localhost:5000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 5
  start_period: 60s
```
- Para endurecer o health após estabilização, usar `-fsS` no `curl`.

## Procedimentos de Emergência

- Rollback rápido:
```
cd ~/sistema_futebol
bash scripts/emergency-fix.sh
```
- Restaurar backup:
```
cd ~/sistema_futebol/backups
ls -lh
# Escolher o arquivo mais recente e restaurar (se necessário)
```

---

### Notas finais
- Após qualquer correção, valide: `curl -s http://localhost:5000/api/health` deve retornar 200.
- Em caso de dúvidas, consulte também `VPS_TROUBLESHOOTING.md` e os scripts em `scripts/` (validação e pós-deploy).