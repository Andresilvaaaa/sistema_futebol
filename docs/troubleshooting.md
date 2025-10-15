# Troubleshooting

Login retorna 404
- Verifique a rota correta: `POST /api/auth/login` (prefixo `/api`).
- Confirme que o servidor está rodando e que o proxy está apontando para o backend.

Coluna ausente em tabelas
- Problema: `monthly_players.custom_monthly_fee` ou `players.monthly_fee` ausentes.
- Solução:
  - Rodar `python -m flask db upgrade`.
  - Se persistir, verificar scripts em `scripts/validate_db_minimal.py` e `scripts/verify_db.py`.
  - Em último caso, resetar DB de dev e aplicar migrações novamente.

Alembic fora de sincronismo
- Use `python -m flask db stamp head` para sincronizar sem alterar schema.
- Confirme estado com `python -m flask db current`.

Erros de FKs com SQLite
- Garanta `PRAGMA foreign_keys=ON` (habilitado no backend automaticamente).

Endpoint Agregado `/api/cashflow/summary`
- 404/401: verifique JWT (`Authorization: Bearer <token>`) e rota correta.
- Latência alta:
  - Em dev: use headers `X-Request-Duration-ms` para medir.
  - Em staging/produção (PostgreSQL): rode `EXPLAIN ANALYZE` nas duas agregações (MonthlyPeriod e Expense por `user_id, year, month`).
  - Se aparecer `Seq Scan` em tabelas grandes, crie índices concorrentes:
    - `CREATE INDEX CONCURRENTLY idx_expenses_user_year_month ON expenses (user_id, year, month);`
    - `CREATE INDEX CONCURRENTLY idx_monthly_periods_user_year_month ON monthly_periods (user_id, year, month);`
- Rollback rápido:
  - Frontend: desligue `NEXT_PUBLIC_USE_AGGREGATED_CF` para retomar o método anterior.
  - Backend: desative `Flask-Compress` se suspeitar interferência na medição (apenas para diagnóstico).
- Headers de observabilidade:
  - `X-Trace-Id`: corrige correlação de logs; copie o valor e procure nos logs.
  - `X-Request-Duration-ms`: tempo de processamento da requisição no servidor.

Diagnóstico de Migrações
- Alembic fora de sincronismo: `python -m flask db stamp head`, depois `python -m flask db upgrade`.
- Valide versão atual: `python -m flask db current`.
- Criação de índice concorrente via Alembic:
  - Use `op.get_context().autocommit_block()` + `op.create_index(..., postgresql_concurrently=True)`.
- Monitorar andamento: `SELECT * FROM pg_stat_progress_create_index;`.