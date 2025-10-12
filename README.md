# Sistema de Futebol

Este repositório contém o backend Flask e o frontend Next.js para gestão esportiva. A documentação consolidada agora está disponível em `docs/`.

## Documentação

- `docs/README.md`: índice central da documentação. Apresenta visão geral do projeto, como navegar pelos tópicos e links rápidos para as seções mais importantes.
- `docs/getting-started.md`: guia de início rápido com pré-requisitos, configuração de `.env`, como executar `python -m flask run` no backend e `npm run dev` no frontend, aplicação de migrações (`python -m flask db ...`) e dicas de debug em desenvolvimento.
- `docs/architecture.md`: visão arquitetural do sistema cobrindo o backend Flask (estrutura, blueprints, serviços, testes), frontend Next.js 15 (App Router, proxy `/api`), autenticação JWT, fluxo de dados e integração entre camadas.
- `docs/api.md`: visão geral da API, convenções de endpoints, códigos de resposta e erros, além de exemplos práticos. Complementado por `docs/api/openapi.yaml`, que traz a especificação OpenAPI com rotas como `/api/auth/login`, `/api/players` e `/api/monthly-periods`, esquemas de payload e segurança Bearer JWT.
- `docs/database.md`: documentação do banco relacional (tabelas, chaves e FKs), fluxo de migrações com Alembic/Flask-Migrate, comandos `python -m flask db init/migrate/upgrade`, limpeza de tabelas `_alembic_tmp_*` e procedimento de reset seguro do SQLite de desenvolvimento.
- `docs/auth.md`: detalhes do fluxo de login e autenticação JWT, headers (`Authorization: Bearer <token>`), expiração e refresh, proteção de rotas no backend e consumo do token no frontend (`frontend/lib/auth.ts`).
- `docs/testing.md`: orientação para testes automatizados no backend (pytest) e frontend (Vitest/Playwright), uso de fixtures e mocks, testes de API, cobertura e boas práticas.
- `docs/deployment.md`: guia de deployment com variáveis de ambiente obrigatórias, build e execução em produção, Docker/Compose, validações pós-deploy, logging e monitoramento.
- `docs/troubleshooting.md`: resolução de problemas comuns (CORS, proxy no Next, erros de migração, bloqueios do SQLite), checklists de diagnóstico e comandos úteis.
- `docs/contributing.md`: diretrizes de contribuição, estilo de código, convenções de branch/commit, abertura de PRs e processo de revisão.

## Migrações

- Use a pasta `migrations/` na raiz do projeto para Alembic/Flask-Migrate.
- A pasta `backend/migrations` é legado e não deve ser usada.
- Rode `python -m flask db init`, `python -m flask db migrate`, `python -m flask db upgrade` no diretório raiz.
- Se encontrar tabelas `_alembic_tmp_*` no SQLite, execute `python scripts/cleanup_alembic_tmp.py`.