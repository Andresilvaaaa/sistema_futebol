# Arquitetura

Camadas e Fluxo
- Frontend (Next.js): UI, navegação, comunicação com API via fetch (`frontend/lib/api.ts`).
- Proxy `/api`: configurado em `frontend/next.config.mjs` para encaminhar chamadas ao backend.
- Backend (Flask): `create_app` em `backend/__init__.py` inicializa a app, JWT e blueprints.
- Blueprints: `backend/blueprints/auth` (autenticação) e `backend/blueprints/api` (recursos principais).
- Serviços: lógica de domínio em `backend/services/*` (auth, db, utils).
- Banco: SQLite em `instance/futebol_dev.db`, modelos em `backend/services/db/models.py`.

Principais Modelos
- `Player`, `MonthlyPeriod`, `MonthlyPlayer`, `Expense` com FKs e cascatas conforme testes (`backend/tests/test_models.py`).
- Colunas relevantes: `players.monthly_fee`, `monthly_players.custom_monthly_fee`.

Autenticação
- JWT inicializado em `backend/__init__.py`.
- Login em `backend/blueprints/auth/controllers.py`: `POST /api/auth/login`.
- Frontend guarda token e protege rotas com `auth-guard.tsx`.

Inicialização e Configuração
- `get_config` em `backend/config/__init__.py` seleciona ambiente.
- `.env` e `.flaskenv` controlam variáveis em dev/prod.

Observações de Migração
- Uso de Alembic com diretório canônico `migrations/` na raiz.
- Scripts adicionais existem em `backend/migrations/`, preferir padronizar por `migrations/` raiz.

Observabilidade
- `X-Trace-Id`: gerado em `before_request` e anexado aos headers em `after_request`.
- `X-Request-Duration-ms`: métrica de duração da requisição medida no backend.
- `Flask-Compress`: habilitado na inicialização para reduzir payloads; pode ser desativado para diagnóstico.