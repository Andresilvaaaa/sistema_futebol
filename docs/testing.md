# Testes e CI

Backend (pytest)
- Testes em `backend/tests/*`.
- Rode: `pytest` na raiz (com venv ativo).
- Cobertura de modelos, serviços, API e configuração.

Frontend (Vitest + Playwright)
- Unit/integration em `frontend/__tests__` e `frontend/tests`.
- Rode: `pnpm test` e `pnpm test:e2e`.

CI
- Pipeline em `.github/workflows/ci.yml` executa testes automaticamente.

Contratos de API
- Utilize `docs/api/openapi.yaml` para validar contratos.
- Ferramentas como Schemathesis podem ser integradas para testes baseados em OpenAPI.