# Autenticação e Autorização

Fluxo
- Login via `POST /api/auth/login` com `username` e `password`.
- Resposta inclui `access_token` (JWT) e `token_type`.
- Use `Authorization: Bearer <token>` em chamadas protegidas.

Backend
- JWTManager inicializado em `backend/__init__.py`.
- Controlador de auth em `backend/blueprints/auth/controllers.py`.

Frontend
- Armazena token e protege rotas com `components/auth-guard.tsx`.
- Exemplos em `frontend/lib/auth.ts` demonstram integração.

Endpoints
- `POST /api/auth/login`: autentica um usuário e retorna token JWT.
- `POST /api/auth/register`: registra um novo usuário e retorna token JWT.

Exemplos
Login
```json
{
  "username": "usuario",
  "password": "senha123"
}
```

Registro
```json
{
  "username": "novo_usuario",
  "email": "novo@example.com",
  "password": "senha123"
}
```

Boas Práticas
- Expirar tokens e renovar quando necessário.
- Evitar armazenar tokens em localStorage sem proteção; preferir cookies HTTPOnly em produção.