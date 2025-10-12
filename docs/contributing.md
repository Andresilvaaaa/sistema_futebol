# Contribuição

Fluxo de Trabalho
- Crie branches por feature/bugfix.
- Escreva testes para novas funcionalidades.
- Atualize documentação relevante (`docs/*`).

Commits
- Mensagens claras e descritivas.
- Inclua referência a issues quando aplicável.

Migrações
- Sempre gere migrações Alembic para mudanças de schema.
- Revise e teste migrações com `python -m flask db upgrade` em um banco de dev.