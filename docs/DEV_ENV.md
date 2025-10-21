# Ambiente de Desenvolvimento

Este guia padroniza o fluxo de desenvolvimento local para o frontend (Next.js) e o backend (Flask).

## Pré-requisitos
- Backend: Python 3.10+, `pip`, virtualenv
- Frontend: Node 18+, `pnpm`
- Banco local: SQLite (dev) ou PostgreSQL (Docker) opcional

## Backend (Flask)
- Instalar deps: `python -m venv venv && venv\Scripts\activate && pip install -r backend/requirements.txt`
- Variáveis (já padrão via `.flaskenv`):
  - `FLASK_APP=app.py`
  - `FLASK_ENV=development`
  - `FLASK_RUN_PORT=5000`
- Banco (dev): SQLite automático em `backend/instance/futebol_dev.db`
- Migrations: `flask db upgrade` (mantém esquema alinhado ao prod)
- Rodar: `flask run -p 5000`
- Health: `http://localhost:5000/api/health`

Observações:
- Configure `JWT_SECRET_KEY` em ambiente local para login funcionar.
- Para PostgreSQL local, use `DATABASE_URL=postgresql://user:pass@localhost:5432/dbname`.

## Frontend (Next.js)
- Instalar deps: `pnpm install` na pasta `frontend`
- Ambiente: `frontend/.env.local`
  - `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
  - `PORT=3000`
- Rodar: `pnpm dev` (acessa `http://localhost:3000`)

## Fluxo de trabalho
1. Subir backend (`flask run`) em `http://localhost:5000`
2. Subir frontend (`pnpm dev`) em `http://localhost:3000`
3. Verificar `/api/health` e UI
4. Autenticação: registre ou faça login para obter JWT (via `/api/auth/login`) e usar rotas protegidas

## Dicas e problemas comuns
- Nunca use o `DATABASE_URL` de produção em dev.
- Execute `flask db upgrade` na raiz do projeto (onde está `app.py`).
- Se `flask db` falhar, confirme `FLASK_APP=app.py` e virtualenv ativo.
- CORS já configurado para `http://localhost:3000`.

## Docker PostgreSQL (opcional)
`docker run --name pg-dev -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16`
Depois: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres` e `flask db upgrade`.