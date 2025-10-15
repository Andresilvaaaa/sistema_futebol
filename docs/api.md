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

Endpoint Agregado de Fluxo de Caixa
- `GET /api/cashflow/summary` (autenticado)
- Query params opcionais: `year`, `month`
- Headers de observabilidade: `X-Trace-Id`, `X-Request-Duration-ms`
- Exemplo:
  - `curl "http://localhost:5000/api/cashflow/summary" -H "Authorization: Bearer <token>"`
- Resposta (exemplo simplificado):
  - `[
      {
        "period": { "year": 2024, "month": 1 },
        "monthly": { "expected": 250.0, "received": 200.0 },
        "expenses": { "total": 50.0 },
        "summary": { "net": 150.0 }
      }
    ]`
Observação
- Este endpoint pode ser ativado no frontend por flag `NEXT_PUBLIC_USE_AGGREGATED_CF=true` com fallback para o método anterior.