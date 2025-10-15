# Getting Started

Este guia ajuda a preparar o ambiente de desenvolvimento e executar backend e frontend.

Pré-requisitos
- Python 3.10+ e `pip`
- Node.js 18+ e `pnpm`
- PowerShell (Windows) ou shell compatível

Backend (Flask)
- Crie e ative o ambiente virtual:
  - `python -m venv venv`
  - `./venv/Scripts/Activate.ps1`
- Instale dependências:
  - `pip install -r backend/requirements.txt`
- Configure variáveis:
  - `backend/.env` baseado em `backend/.env.example`
  - `FLASK_APP=backend/app.py`, `FLASK_ENV=development` (pode usar `.flaskenv` na raiz ou `backend/.flaskenv`)
- Migrações de banco:
  - `python -m flask db upgrade`
- Execute o servidor:
  - `python -m flask run --host 0.0.0.0 --port 5000`

Frontend (Next.js)
- Instale dependências:
  - `cd frontend && pnpm install`
- Execute o dev server:
  - `pnpm dev`
- O proxy para `/api` está configurado em `frontend/next.config.mjs` (aponta para o backend).

Banco de Desenvolvimento
- SQLite: arquivo em `instance/futebol_dev.db`
- O backend habilita `PRAGMA foreign_keys=ON` automaticamente ao iniciar.

Rotas Principais
- Login: `POST /api/auth/login`
- Jogadores: `GET /api/players` (autenticado)
- Períodos Mensais: `GET /api/monthly-periods` (autenticado)
- Fluxo de Caixa (agregado): `GET /api/cashflow/summary` (autenticado)

Feature Flags (Frontend)
- `NEXT_PUBLIC_USE_AGGREGATED_CF=true` ativa o consumo do endpoint agregado com fallback automático.
- Defina em `frontend/.env.local` ou variáveis do ambiente de build/deploy.

Observabilidade
- Todos os endpoints retornam `X-Trace-Id` e `X-Request-Duration-ms`.
- Correlacione requisições pelo `X-Trace-Id` nos logs do backend.

Comandos Úteis
- `python -m flask db current` (revisão Alembic atual)
- `python -m flask db history -v` (histórico de migrações)
- `python -m flask db migrate -m "mensagem"` (criar nova migração)