# Testes e CI

Backend (pytest)
- Testes em `backend/tests/*`.
- Rode: `pytest` na raiz (com venv ativo).
- Cobertura de modelos, serviços, API e configuração.

Testes Mínimos do Endpoint Agregado
- Execute apenas o teste de fluxo de caixa agregado:
  - `pytest -k cashflow_summary`
- O teste valida:
  - Presença dos headers `X-Trace-Id` e `X-Request-Duration-ms`.
  - Contrato básico de `GET /api/cashflow/summary` (payload por mês, totais e saldo).

Frontend (Vitest + Playwright)
- Unit/integration em `frontend/__tests__` e `frontend/tests`.
- Rode: `pnpm test` e `pnpm test:e2e`.

CI
- Pipeline em `.github/workflows/ci.yml` executa testes automaticamente.

Contratos de API
- Utilize `docs/api/openapi.yaml` para validar contratos.
- Ferramentas como Schemathesis podem ser integradas para testes baseados em OpenAPI.