# API

Especificação
- OpenAPI disponível em `docs/api/openapi.yaml` (endpoints principais: auth, players, monthly-periods).

Autenticação
- `POST /api/auth/login` retorna `access_token` (JWT).
- `POST /api/auth/register` cria novo usuário e retorna token.
- Endpoints protegidos exigem `Authorization: Bearer <token>`.

Exemplos
- Login:
  - `curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"secret"}'`
- Registro:
  - `curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"novo_usuario","email":"novo@example.com","password":"senha123"}'`
- Listar jogadores:
  - `curl http://localhost:5000/api/players -H "Authorization: Bearer <token>"`
- Listar períodos:
  - `curl http://localhost:5000/api/monthly-periods -H "Authorization: Bearer <token>"`

Notas
- O frontend consome `GET /api/players` e `GET /api/monthly-periods` para telas de jogadores e mensais.
- Em produção, ajuste a URL base conforme o ambiente.