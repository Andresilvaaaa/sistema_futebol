# Deployment

Docker Compose
- Veja `docker-compose.yml` para orquestração de serviços.
- Ajuste variáveis de ambiente no backend (`backend/.env`).

Migrações em Produção
- Execute `python -m flask db upgrade` apontando para o banco de produção.
- Faça backup antes de alterações críticas.

Índices Concorrentes (PostgreSQL)
- Use criação concorrente para evitar bloqueios de escrita:
  - Em Alembic: `op.create_index("idx_expenses_user_year_month", "expenses", ["user_id", "year", "month"], unique=False, postgresql_concurrently=True)` dentro de `op.get_context().autocommit_block()`.
- Evite índices únicos concorrentes se houver risco de duplicidades.
- Monitore com `SELECT * FROM pg_stat_progress_create_index;`.
- Valide o plano de execução com `EXPLAIN ANALYZE` após deploy.

Rollback Rápido
- Frontend: desligar `NEXT_PUBLIC_USE_AGGREGATED_CF` para voltar ao fluxo anterior.
- Backend: se necessário, desativar `Flask-Compress` no arquivo de configuração do ambiente.
- Compare latências pelos headers `X-Request-Duration-ms` antes/depois.

Logs e Monitoramento
- Logs do backend em `backend/logs/`.
- Configure níveis de log via `backend/config/*`.