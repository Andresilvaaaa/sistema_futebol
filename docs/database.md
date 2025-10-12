# Banco de Dados e Migrações

Banco de Desenvolvimento
- SQLite em `instance/futebol_dev.db`.
- `PRAGMA foreign_keys=ON` é habilitado pelo backend.

Diretório Canônico de Migrações
- Utilize `migrations/` na raiz como fonte oficial de Alembic.
- Evite criar novas migrações em `backend/migrations/` (legado), prefira sempre `migrations/`.

Fluxo Alembic
- Revisão atual: `python -m flask db current`
- Histórico: `python -m flask db history -v`
- Criar migração: `python -m flask db migrate -m "mensagem"`
- Aplicar: `python -m flask db upgrade`
- Sincronizar sem alterar schema (stamp): `python -m flask db stamp head`

Ambiente
- Sempre defina:
  - `FLASK_APP=backend/app.py`
  - `FLASK_ENV=development`
- Em PowerShell: `setx FLASK_APP backend/app.py` (persistente) ou use `python -m flask` com variáveis temporárias.

SQLite e Limitações
- `ALTER TABLE` é limitado; mudanças complexas podem exigir recriação de tabela.
- Para reset em dev:
  - Pare o servidor.
  - Faça backup do arquivo.
  - Remova `instance/futebol_dev.db` e rode `python -m flask db upgrade` novamente.

Checks Úteis
- Scripts em `scripts/validate_db_minimal.py` e `scripts/verify_db.py` ajudam a verificar colunas críticas.