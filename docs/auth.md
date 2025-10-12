# Autenticação e Autorização

Fluxo
- Login via `POST /api/auth/login` com `email` e `password`.
- Resposta inclui `access_token` (JWT) e `token_type`.
- Use `Authorization: Bearer <token>` em chamadas protegidas.

Backend
- JWTManager inicializado em `backend/__init__.py`.
- Controlador de auth em `backend/blueprints/auth/controllers.py`.

Frontend
- Armazena token e protege rotas com `components/auth-guard.tsx`.
- Exemplos em `frontend/lib/auth.ts` demonstram integração.

Boas Práticas
- Expirar tokens e renovar quando necessário.
- Evitar armazenar tokens em localStorage sem proteção; preferir cookies HTTPOnly em produção.