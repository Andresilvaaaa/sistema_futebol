# Documentação do Projeto

Índice
- Visão Geral: `architecture.md`
- Guia Inicial: `getting-started.md`
- API: `api.md` e `api/openapi.yaml`
- Banco de Dados: `database.md`
- Autenticação: `auth.md`
- Testes: `testing.md`
- Deployment: `deployment.md`
- Troubleshooting: `troubleshooting.md`
- Contribuição: `contributing.md`

Novidades
- Endpoint agregado de fluxo de caixa: `GET /api/cashflow/summary` com headers de observabilidade (`X-Trace-Id`, `X-Request-Duration-ms`).
- Flag no frontend `NEXT_PUBLIC_USE_AGGREGATED_CF` para habilitar consumo com fallback.
- Diretrizes de migração de índices concorrentes em produção (PostgreSQL) em `deployment.md` e dicas em `troubleshooting.md`.