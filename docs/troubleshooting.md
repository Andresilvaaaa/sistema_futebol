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