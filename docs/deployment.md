# Deployment

Docker Compose
- Veja `docker-compose.yml` para orquestração de serviços.
- Ajuste variáveis de ambiente no backend (`backend/.env`).

Migrações em Produção
- Execute `python -m flask db upgrade` apontando para o banco de produção.
- Faça backup antes de alterações críticas.

Logs e Monitoramento
- Logs do backend em `backend/logs/`.
- Configure níveis de log via `backend/config/*`.