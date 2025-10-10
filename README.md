# Sistema de Futebol

## Migrations

- Use a pasta `migrations/` na raiz do projeto para Alembic/Flask-Migrate.
- A pasta `backend/migrations` é legado e não deve ser usada.
- Rode `flask db init`, `flask db migrate`, `flask db upgrade` no diretório raiz.
- Se encontrar tabelas `_alembic_tmp_*` no SQLite, execute `python scripts/cleanup_alembic_tmp.py`.