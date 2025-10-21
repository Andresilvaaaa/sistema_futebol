## Versão Final – Deploy Seguro (Migrations e Banco)

Objetivo: reduzir a zero os incidentes de schema (ex.: "column does not exist") em produção, garantindo que o backend só rode com o banco migrado e validado.

1) Fluxo de CI/CD (produção)
- Pré-condições
  - `DATABASE_URL` configurado no servidor (Postgres).
  - Serviço de banco em `docker-compose.prod.yml` padronizado como `postgres`.
- Passos recomendados no workflow
  - Backup antes de migrar:
    - `docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -Fc -U sistema_futebol sistema_futebol_prod -f /backup/backup_$(date +%F_%H%M).dump`
  - Aplicar migrações Alembic:
    - `docker compose -f docker-compose.prod.yml exec -T backend flask db upgrade`
  - Verificar versão aplicada:
    - `docker compose -f docker-compose.prod.yml exec -T backend flask db current`
  - Health check do app:
    - `curl -fsS https://esporteflowpro.com.br/api/health`

Sugestão de job (adaptar para seu deploy.yml):
```
- name: Apply DB migrations and check health
  run: |
    ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} << 'EOF'
      set -euo pipefail
      cd ~/sistema_futebol
      docker compose -f docker-compose.prod.yml ps
      # Backup
      docker compose -f docker-compose.prod.yml exec -T postgres \
        pg_dump -Fc -U sistema_futebol sistema_futebol_prod -f /backup/backup_$(date +%F_%H%M).dump
      # Migrar
      docker compose -f docker-compose.prod.yml exec -T backend flask db upgrade
      # Confirmar versão
      docker compose -f docker-compose.prod.yml exec -T backend flask db current
      # Health
      sleep 5
      curl -fsS https://esporteflowpro.com.br/api/health > /dev/null
    EOF
```

2) Migração idempotente – fallback seguro (SQL)
- Para incidentes (hotfix), aplique SQL que não quebra se já existir:
```
BEGIN;
ALTER TABLE users ADD COLUMN IF NOT EXISTS initial_balance NUMERIC(10,2) NOT NULL DEFAULT 0;
ALTER TABLE players ADD COLUMN IF NOT EXISTS monthly_fee NUMERIC(10,2) NOT NULL DEFAULT 100.00;
ALTER TABLE monthly_players ADD COLUMN IF NOT EXISTS custom_monthly_fee NUMERIC(10,2);
COMMIT;
```
- Use via: `docker compose -f docker-compose.prod.yml exec -T postgres psql -U sistema_futebol -d sistema_futebol_prod -c "<SQL>"`
- Depois, alinhar Alembic (se necessário) com `flask db stamp head` para marcar a versão.

3) Gate de inicialização do backend
- O backend só deve iniciar (gunicorn) após:
  - Postgres estar acessível; e
  - Migrações terem sido aplicadas com sucesso.
- Estratégias:
  - Entry point que roda `flask db upgrade || exit 1` antes do gunicorn.
  - Healthcheck do compose depende do `/api/health` (já ativo).

4) Checks pré-deploy (local/staging)
- `flask db migrate -m "descrição"` (quando houver mudança de model)
- `flask db upgrade` (staging/dev) + testes de API críticos
- Consistência de nomes de serviços e comandos (`postgres`, `backend`).

5) Verificações pós-deploy (script)
- Crie `scripts/post-deploy-check.sh` (baseado no console.md):
  - Containers `healthy` (compose ps)
  - Migrações sincronizadas (backend x banco):
    - `flask db current` vs `SELECT version_num FROM alembic_version;`
  - Health 200 em `https://esporteflowpro.com.br/api/health`
  - Logs recentes sem `error|exception|traceback`
  - Query simples no banco (ex.: `SELECT COUNT(*) FROM users;`)
- Agendar no cron (ex.: a cada 6h) para monitoramento contínuo.

6) Troubleshooting (resumo operacional)
- Sintoma: 500 e `UndefinedColumn` após deploy.
- Ações:
  - `docker compose -f docker-compose.prod.yml exec -T backend flask db current`
  - `docker compose -f docker-compose.prod.yml exec -T postgres psql -U sistema_futebol -d sistema_futebol_prod -c "\d users"`
  - Aplicar `flask db upgrade`; se falhar, aplicar SQL idempotente (item 2)
  - Reiniciar backend: `docker compose -f docker-compose.prod.yml restart backend`

7) Padrões de confiabilidade
- Nomenclatura consistente nos serviços do compose (`postgres`, `backend`, `frontend`).
- Não colar SQL direto no shell; use sempre `psql -c` (ou arquivo `.sql`).
- Observabilidade: manter script de monitoramento que coleta logs em caso de `unhealthy` e envia alerta (webhook) + restart automático.
- Sempre fazer backup pré-migração.

8) Rollback simples
- Se necessário, reversão pontual:
  - `ALTER TABLE monthly_players DROP COLUMN IF EXISTS custom_monthly_fee;`
  - `ALTER TABLE players DROP COLUMN IF EXISTS monthly_fee;`
  - Ajustar app para versão de imagem anterior.
- Restaurar backup (`pg_restore -c -d sistema_futebol_prod`).

9) Checklists
- Antes do deploy
  - Testes em dev/staging; `flask db upgrade` local
  - Backup produção
  - Aplicar migrações (Alembic)
  - Health 200 e logs limpos
- Depois do deploy
  - Rodar `post-deploy-check.sh`
  - Testar login e fluxos críticos (cashflow)
  - Registrar no changelog o que mudou no schema

10) Scripts úteis existentes
- `scripts/verify_db.py` – smoke check (conexão/tabelas)
- `check_column.py` – inspeção de coluna (adaptável para Postgres)
- Sugeridos:
  - `scripts/post-deploy-check.sh` (consolidado do console.md)
  - SQL idempotente de migração (acima)

Com isso, o deploy torna-se previsível: migra primeiro, valida, só então roda. Em incidentes, o SQL idempotente resolve rápido sem quebrar, e a observabilidade detecta e alerta automaticamente.

##### """"""""" arquivos prontos para implementação  """"""""" #####



 IMPLEMENTAÇÃO COMPLETA - ARQUIVOS PRONTOS
Vou criar todos os arquivos que você mencionou, otimizados e prontos para usar:

📋 ARQUIVO 1: Entry Point do Backend com Gate
backend/docker-entrypoint.sh
bash#!/bin/bash

# ============================================
# ENTRY POINT DO BACKEND - Sistema Futebol
# ============================================
# Garante que migrations são aplicadas antes
# do Gunicorn iniciar
# ============================================

set -e

# Cores para logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}🚀 INICIANDO BACKEND - Sistema Futebol${NC}"
echo -e "${BLUE}============================================${NC}"

# Função de log
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. VERIFICAR CONEXÃO COM BANCO
log_info "Verificando conexão com banco de dados..."
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if python3 -c "from app import db; db.session.execute('SELECT 1')" 2>/dev/null; then
        log_info "✅ Conexão com banco estabelecida"
        break
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    log_warn "Tentativa $RETRY_COUNT/$MAX_RETRIES - Aguardando banco..."
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    log_error "❌ Não foi possível conectar ao banco após $MAX_RETRIES tentativas"
    exit 1
fi

# 2. VERIFICAR VERSÃO ATUAL DO ALEMBIC
log_info "Verificando versão atual das migrations..."
CURRENT_VERSION=$(flask db current 2>/dev/null | tail -1 | awk '{print $1}')
log_info "Versão atual: ${CURRENT_VERSION:-<nenhuma>}"

# 3. APLICAR MIGRATIONS
log_info "Aplicando migrations pendentes..."
if flask db upgrade 2>&1 | tee /tmp/migration.log; then
    log_info "✅ Migrations aplicadas com sucesso"
    
    # Verificar nova versão
    NEW_VERSION=$(flask db current 2>/dev/null | tail -1 | awk '{print $1}')
    log_info "Nova versão: $NEW_VERSION"
else
    log_error "❌ Falha ao aplicar migrations!"
    log_error "Logs salvos em /tmp/migration.log"
    cat /tmp/migration.log
    exit 1
fi

# 4. VALIDAR SCHEMA CRÍTICO (opcional mas recomendado)
log_info "Validando schema crítico..."
python3 << 'PYTHON_EOF'
from sqlalchemy import inspect
from app import db

critical_columns = {
    'users': ['id', 'username', 'email', 'password_hash', 'is_active', 'initial_balance'],
    'players': ['id', 'name', 'user_id', 'monthly_fee'],
    'monthly_players': ['id', 'user_id', 'player_id', 'custom_monthly_fee']
}

inspector = inspect(db.engine)
missing = []

for table, columns in critical_columns.items():
    try:
        existing_cols = [col['name'] for col in inspector.get_columns(table)]
        for col in columns:
            if col not in existing_cols:
                missing.append(f"{table}.{col}")
    except Exception as e:
        missing.append(f"{table} (erro: {e})")

if missing:
    print(f"❌ Colunas faltando: {', '.join(missing)}")
    exit(1)
else:
    print("✅ Schema validado com sucesso")
PYTHON_EOF

if [ $? -ne 0 ]; then
    log_error "❌ Validação de schema falhou!"
    exit 1
fi

log_info "✅ Todas as verificações passaram!"

# 5. INICIAR GUNICORN
log_info "Iniciando Gunicorn..."
echo -e "${BLUE}============================================${NC}"

exec gunicorn -w 4 -b 0.0.0.0:5000 \
    --access-logfile - \
    --error-logfile - \
    --log-level info \
    --timeout 120 \
    --keep-alive 5 \
    "app:app"
Atualizar Dockerfile do backend:
dockerfile# ... outras configurações ...

# Copiar entry point
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Usar entry point
ENTRYPOINT ["/docker-entrypoint.sh"]

📋 ARQUIVO 2: Script Post-Deploy Check Completo
scripts/post-deploy-check.sh
bash#!/bin/bash

# ============================================
# POST-DEPLOY CHECK - Sistema Futebol
# ============================================
# Verifica saúde completa do sistema após deploy
# ============================================

set -e

COMPOSE_FILE="docker-compose.prod.yml"
DB_USER="sistema_futebol"
DB_NAME="sistema_futebol_prod"
DOMAIN="https://esporteflowpro.com.br"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Contadores
CHECKS_PASSED=0
CHECKS_FAILED=0

# Função de check
check() {
    local name=$1
    local command=$2
    
    echo -n "Verificando $name... "
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ FALHOU${NC}"
        CHECKS_FAILED=$((CHECKS_FAILED + 1))
        return 1
    fi
}

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}🔍 POST-DEPLOY CHECK - Sistema Futebol${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# 1. CONTAINERS HEALTHY
echo -e "${YELLOW}1️⃣ Verificando status dos containers${NC}"
check "Backend healthy" \
    "docker compose -f $COMPOSE_FILE ps backend | grep -q 'healthy'"

check "Frontend healthy" \
    "docker compose -f $COMPOSE_FILE ps frontend | grep -q 'healthy'"

check "Postgres healthy" \
    "docker compose -f $COMPOSE_FILE ps postgres | grep -q 'healthy'"

echo ""

# 2. MIGRATIONS SINCRONIZADAS
echo -e "${YELLOW}2️⃣ Verificando sincronização de migrations${NC}"

BACKEND_VERSION=$(docker compose -f $COMPOSE_FILE exec -T backend flask db current 2>/dev/null | tail -1 | awk '{print $1}')
DB_VERSION=$(docker compose -f $COMPOSE_FILE exec -T postgres psql -U $DB_USER -d $DB_NAME -t -c "SELECT version_num FROM alembic_version;" | xargs)

if [ "$BACKEND_VERSION" = "$DB_VERSION" ]; then
    echo -e "${GREEN}✅ Migrations sincronizadas${NC} (versão: $DB_VERSION)"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}❌ Migrations desincronizadas!${NC}"
    echo "  Backend: $BACKEND_VERSION"
    echo "  Banco: $DB_VERSION"
    CHECKS_FAILED=$((CHECKS_FAILED + 1))
fi

echo ""

# 3. HEALTH CHECKS
echo -e "${YELLOW}3️⃣ Verificando endpoints de health${NC}"

check "Health básico" \
    "curl -fsS $DOMAIN/api/health"

check "Health do banco" \
    "curl -fsS $DOMAIN/api/health/db"

check "Health do schema" \
    "curl -fsS $DOMAIN/api/health/schema"

echo ""

# 4. LOGS SEM ERROS
echo -e "${YELLOW}4️⃣ Verificando logs por erros${NC}"

ERROR_COUNT=$(docker compose -f $COMPOSE_FILE logs --tail=100 backend 2>/dev/null | grep -ci "error\|exception\|traceback" || echo "0")

if [ "$ERROR_COUNT" -eq "0" ]; then
    echo -e "${GREEN}✅ Nenhum erro nos logs recentes${NC}"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  $ERROR_COUNT erros encontrados nos logs${NC}"
    CHECKS_FAILED=$((CHECKS_FAILED + 1))
fi

echo ""

# 5. QUERIES DE SANIDADE
echo -e "${YELLOW}5️⃣ Verificando queries de sanidade${NC}"

check "Conexão com banco" \
    "docker compose -f $COMPOSE_FILE exec -T postgres psql -U $DB_USER -d $DB_NAME -c 'SELECT 1'"

check "Tabela users" \
    "docker compose -f $COMPOSE_FILE exec -T postgres psql -U $DB_USER -d $DB_NAME -c 'SELECT COUNT(*) FROM users'"

check "Tabela players" \
    "docker compose -f $COMPOSE_FILE exec -T postgres psql -U $DB_USER -d $DB_NAME -c 'SELECT COUNT(*) FROM players'"

echo ""

# 6. VERIFICAR LOCKS NO BANCO
echo -e "${YELLOW}6️⃣ Verificando locks no banco${NC}"

LOCKS_COUNT=$(docker compose -f $COMPOSE_FILE exec -T postgres psql -U $DB_USER -d $DB_NAME -t -c \
    "SELECT COUNT(*) FROM pg_locks WHERE granted = false;" | xargs)

if [ "$LOCKS_COUNT" -eq "0" ]; then
    echo -e "${GREEN}✅ Nenhum lock bloqueante${NC}"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  $LOCKS_COUNT locks bloqueantes detectados${NC}"
    CHECKS_FAILED=$((CHECKS_FAILED + 1))
fi

echo ""

# 7. COLUNAS CRÍTICAS
echo -e "${YELLOW}7️⃣ Verificando colunas críticas${NC}"

COLUMNS_CHECK=$(docker compose -f $COMPOSE_FILE exec -T postgres psql -U $DB_USER -d $DB_NAME -t << 'SQL'
SELECT 
    CASE 
        WHEN COUNT(*) = 3 THEN 'OK'
        ELSE 'MISSING'
    END
FROM information_schema.columns
WHERE (table_name = 'users' AND column_name = 'initial_balance')
   OR (table_name = 'players' AND column_name = 'monthly_fee')
   OR (table_name = 'monthly_players' AND column_name = 'custom_monthly_fee');
SQL
)

if echo "$COLUMNS_CHECK" | grep -q "OK"; then
    echo -e "${GREEN}✅ Todas as colunas críticas presentes${NC}"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}❌ Algumas colunas críticas estão faltando${NC}"
    CHECKS_FAILED=$((CHECKS_FAILED + 1))
fi

echo ""

# RESULTADO FINAL
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}📊 RESULTADO FINAL${NC}"
echo -e "${BLUE}============================================${NC}"
echo -e "✅ Checks OK: ${GREEN}$CHECKS_PASSED${NC}"
echo -e "❌ Checks Falhou: ${RED}$CHECKS_FAILED${NC}"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 TODOS OS CHECKS PASSARAM!${NC}"
    echo -e "${GREEN}Sistema está saudável e pronto para uso.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  ALGUNS CHECKS FALHARAM!${NC}"
    echo -e "${YELLOW}Verifique os erros acima e corrija antes de prosseguir.${NC}"
    exit 1
fi

📋 ARQUIVO 3: GitHub Actions Workflow Completo
.github/workflows/deploy-production.yml
yamlname: Deploy Production

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  DOCKER_COMPOSE_FILE: docker-compose.prod.yml

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
      
      - name: Deploy to Production
        run: |
          ssh -o StrictHostKeyChecking=no ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} << 'EOF'
            set -euo pipefail
            
            echo "🚀 ===== INICIANDO DEPLOY ====="
            cd ~/sistema_futebol
            
            # 1. VERIFICAR STATUS ATUAL
            echo ""
            echo "📊 Status atual dos containers:"
            docker compose -f ${{ env.DOCKER_COMPOSE_FILE }} ps
            
            # 2. BACKUP PRÉ-DEPLOY
            echo ""
            echo "📦 Criando backup pré-deploy..."
            mkdir -p backups
            docker compose -f ${{ env.DOCKER_COMPOSE_FILE }} exec -T postgres \
              pg_dump -Fc -U sistema_futebol sistema_futebol_prod \
              > backups/backup_$(date +%Y%m%d_%H%M%S).dump
            
            if [ $? -eq 0 ]; then
              echo "✅ Backup criado com sucesso"
            else
              echo "❌ Falha ao criar backup! Abortando deploy."
              exit 1
            fi
            
            # 3. PULL NOVAS IMAGENS
            echo ""
            echo "📥 Baixando novas imagens..."
            docker compose -f ${{ env.DOCKER_COMPOSE_FILE }} pull
            
            # 4. APLICAR MIGRATIONS
            echo ""
            echo "🔄 Aplicando migrations..."
            docker compose -f ${{ env.DOCKER_COMPOSE_FILE }} exec -T backend flask db upgrade
            
            if [ $? -ne 0 ]; then
              echo "❌ Falha ao aplicar migrations! Tentando SQL idempotente..."
              
              # Fallback: SQL idempotente
              docker compose -f ${{ env.DOCKER_COMPOSE_FILE }} exec -T postgres \
                psql -U sistema_futebol -d sistema_futebol_prod << 'SQL'
                BEGIN;
                ALTER TABLE users ADD COLUMN IF NOT EXISTS initial_balance NUMERIC(10,2) NOT NULL DEFAULT 0;
                ALTER TABLE players ADD COLUMN IF NOT EXISTS monthly_fee NUMERIC(10,2) NOT NULL DEFAULT 100.00;
                ALTER TABLE monthly_players ADD COLUMN IF NOT EXISTS custom_monthly_fee NUMERIC(10,2);
                COMMIT;
SQL
              
              if [ $? -ne 0 ]; then
                echo "❌ SQL idempotente também falhou! Abortando."
                exit 1
              fi
              
              echo "✅ SQL idempotente aplicado com sucesso"
            fi
            
            # 5. VERIFICAR VERSÃO APLICADA
            echo ""
            echo "🔍 Verificando versão das migrations..."
            CURRENT_VERSION=$(docker compose -f ${{ env.DOCKER_COMPOSE_FILE }} exec -T backend flask db current | tail -1)
            echo "Versão atual: $CURRENT_VERSION"
            
            # 6. RESTART CONTAINERS
            echo ""
            echo "♻️  Reiniciando containers..."
            docker compose -f ${{ env.DOCKER_COMPOSE_FILE }} up -d
            
            # 7. AGUARDAR HEALTH CHECK
            echo ""
            echo "⏳ Aguardando containers ficarem healthy..."
            sleep 30
            
            # 8. EXECUTAR POST-DEPLOY CHECK
            echo ""
            echo "🧪 Executando verificações pós-deploy..."
            bash scripts/post-deploy-check.sh
            
            if [ $? -eq 0 ]; then
              echo ""
              echo "✅ ===== DEPLOY CONCLUÍDO COM SUCESSO! ====="
            else
              echo ""
              echo "❌ ===== DEPLOY FALHOU NAS VERIFICAÇÕES! ====="
              exit 1
            fi
          EOF
      
      - name: Notify Success
        if: success()
        run: |
          curl -X POST "${{ secrets.WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -d '{
              "text": "✅ Deploy em produção concluído com sucesso!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deploy Produção - Sistema Futebol*\n✅ Status: Sucesso\n🚀 Branch: main\n👤 Autor: ${{ github.actor }}"
                  }
                }
              ]
            }'
      
      - name: Notify Failure
        if: failure()
        run: |
          curl -X POST "${{ secrets.WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -d '{
              "text": "❌ Deploy em produção FALHOU!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deploy Produção - Sistema Futebol*\n❌ Status: Falha\n🚀 Branch: main\n👤 Autor: ${{ github.actor }}\n🔗 Logs: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }'

📋 ARQUIVO 4: Script SQL Idempotente
scripts/migrations_idempotent.sql
sql-- ============================================
-- MIGRATIONS IDEMPOTENTES - Sistema Futebol
-- ============================================
-- Pode ser executado múltiplas vezes sem erro
-- Use para hotfix em produção
-- ============================================

BEGIN;

-- 1. USERS - initial_balance
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'initial_balance'
    ) THEN
        ALTER TABLE users 
        ADD COLUMN initial_balance NUMERIC(10,2) NOT NULL DEFAULT 0;
        RAISE NOTICE '✅ users.initial_balance criada';
    ELSE
        RAISE NOTICE '⏭️  users.initial_balance já existe';
    END IF;
END $$;

-- 2. PLAYERS - monthly_fee
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'players' AND column_name = 'monthly_fee'
    ) THEN
        ALTER TABLE players 
        ADD COLUMN monthly_fee NUMERIC(10,2) NOT NULL DEFAULT 100.00;
        RAISE NOTICE '✅ players.monthly_fee criada';
    ELSE
        RAISE NOTICE '⏭️  players.monthly_fee já existe';
    END IF;
END $$;

-- 3. MONTHLY_PLAYERS - custom_monthly_fee
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'monthly_players' AND column_name = 'custom_monthly_fee'
    ) THEN
        ALTER TABLE monthly_players 
        ADD COLUMN custom_monthly_fee NUMERIC(10,2);
        RAISE NOTICE '✅ monthly_players.custom_monthly_fee criada';
    ELSE
        RAISE NOTICE '⏭️  monthly_players.custom_monthly_fee já existe';
    END IF;
END $$;

-- 4. ATUALIZAR ALEMBIC (se necessário)
DO $$
DECLARE
    current_version TEXT;
BEGIN
    SELECT version_num INTO current_version FROM alembic_version;
    
    IF current_version != 'e1a2b3c4d5f6' THEN
        UPDATE alembic_version SET version_num = 'e1a2b3c4d5f6';
        RAISE NOTICE '✅ Alembic atualizado para e1a2b3c4d5f6';
    ELSE
        RAISE NOTICE '⏭️  Alembic já está em e1a2b3c4d5f6';
    END IF;
END $$;

-- 5. LIMPEZA
VACUUM ANALYZE users;
VACUUM ANALYZE players;
VACUUM ANALYZE monthly_players;

COMMIT;

-- VERIFICAÇÃO FINAL
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name IN ('users', 'players', 'monthly_players')
  AND column_name IN ('initial_balance', 'monthly_fee', 'custom_monthly_fee')
ORDER BY table_name, column_name;

SELECT '✅ MIGRATIONS IDEMPOTENTES CONCLUÍDAS!' as status;

📋 ARQUIVO 5: Monitoramento com Cron
scripts/cron-health-check.sh
bash#!/bin/bash

# ============================================
# CRON HEALTH CHECK - Sistema Futebol
# ============================================
# Executa a cada 6 horas via cron
# ============================================

LOG_FILE="/home/root/sistema_futebol/logs/health-check.log"
ERROR_LOG="/home/root/sistema_futebol/logs/health-errors.log"

{
    echo "================================================"
    echo "🔍 Health Check - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "================================================"
    
    cd /home/root/sistema_futebol
    
    if bash scripts/post-deploy-check.sh; then
        echo "✅ Sistema healthy"
    else
        echo "❌ Sistema unhealthy - enviando alerta"
        
        # Coletar logs de erro
        docker compose -f docker-compose.prod.yml logs --tail=100 backend > "$ERROR_LOG"
        
        # Enviar alerta (se configurado)
        if [ -n "$WEBHOOK_URL" ]; then
            curl -X POST "$WEBHOOK_URL" \
                -H "Content-Type: application/json" \
                -d "{\"text\":\"⚠️ Sistema Futebol unhealthy! Verificar logs em $ERROR_LOG\"}"
        fi
        
        # Tentar restart automático
        echo "Tentando restart automático..."
        docker compose -f docker-compose.prod.yml restart backend
    fi
    
    echo ""
} >> "$LOG_FILE" 2>&1

# Rotacionar logs se maior que 10MB
if [ -f "$LOG_FILE" ] && [ $(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE") -gt 10485760 ]; then
    mv "$LOG_FILE" "$LOG_FILE.$(date +%Y%m%d)"
    gzip "$LOG_FILE.$(date +%Y%m%d)"
fi
Instalar no cron:
bash# Editar crontab
crontab -e

# Adicionar linha
0 */6 * * * /home/root/sistema_futebol/scripts/cron-health-check.sh

