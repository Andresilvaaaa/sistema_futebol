root@srv866884:~# cd ~/sistema_futebol && \
echo "🔍 Status:" && \
docker compose -f docker-compose.prod.yml ps && \
echo "" && \
echo "📋 Últimos logs do backend:" && \
docker compose -f docker-compose.prod.yml logs --tail=50 backend && \
echo "" && \
echo "🔍 Procurando erros:" && \
docker compose -f docker-compose.prod.yml logs backend | grep -i "error\|exception\|traceback" | tail -20
🔍 Status:
NAME                       IMAGE                                                   COMMAND                  SERVICE    CREATED          STATUS                          PORTS
sistema_futebol_backend    ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "/app/docker-entrypo…"   backend    13 minutes ago   Restarting (1) 58 seconds ago
sistema_futebol_frontend   ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest   "docker-entrypoint.s…"   frontend   13 minutes ago   Up 13 minutes (healthy)         0.0.0.0:8080->3000/tcp, [::]:8080->3000/tcp
sistema_futebol_postgres   postgres:15-alpine                                      "docker-entrypoint.s…"   postgres   13 minutes ago   Up 13 minutes (healthy)         0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp

📋 Últimos logs do backend:
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Will assume transactional DDL.
sistema_futebol_backend  | ✅ [MIGRATIONS] Database migrations applied successfully
sistema_futebol_backend  | 🔍 [SCHEMA] Validating critical database schema...
sistema_futebol_backend  | ❌ [SCHEMA] Schema validation failed: 'Engine' object has no attribute 'execute'
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: futebol_db
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting initialization sequence...
sistema_futebol_backend  | ⏳ [DB-WAIT] Waiting for PostgreSQL to be ready...
sistema_futebol_backend  | ✅ [DB-WAIT] PostgreSQL is ready (attempt 1/30)
sistema_futebol_backend  | 🔄 [MIGRATIONS] Applying database migrations...
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Will assume transactional DDL.
sistema_futebol_backend  | ✅ [MIGRATIONS] Database migrations applied successfully
sistema_futebol_backend  | 🔍 [SCHEMA] Validating critical database schema...
sistema_futebol_backend  | ❌ [SCHEMA] Schema validation failed: 'Engine' object has no attribute 'execute'
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: futebol_db
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting initialization sequence...
sistema_futebol_backend  | ⏳ [DB-WAIT] Waiting for PostgreSQL to be ready...
sistema_futebol_backend  | ✅ [DB-WAIT] PostgreSQL is ready (attempt 1/30)
sistema_futebol_backend  | 🔄 [MIGRATIONS] Applying database migrations...
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Will assume transactional DDL.
sistema_futebol_backend  | ✅ [MIGRATIONS] Database migrations applied successfully
sistema_futebol_backend  | 🔍 [SCHEMA] Validating critical database schema...
sistema_futebol_backend  | ❌ [SCHEMA] Schema validation failed: 'Engine' object has no attribute 'execute'
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting backend initialization...
sistema_futebol_backend  | 📊 [ENTRYPOINT] Configuration:
sistema_futebol_backend  |   - FLASK_APP: backend.app:app
sistema_futebol_backend  |   - FLASK_ENV: production
sistema_futebol_backend  |   - DB_HOST: postgres:5432
sistema_futebol_backend  |   - DB_NAME: futebol_db
sistema_futebol_backend  | 🚀 [ENTRYPOINT] Starting initialization sequence...
sistema_futebol_backend  | ⏳ [DB-WAIT] Waiting for PostgreSQL to be ready...
sistema_futebol_backend  | ✅ [DB-WAIT] PostgreSQL is ready (attempt 1/30)
sistema_futebol_backend  | 🔄 [MIGRATIONS] Applying database migrations...
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
sistema_futebol_backend  | INFO  [alembic.runtime.migration] Will assume transactional DDL.
sistema_futebol_backend  | ✅ [MIGRATIONS] Database migrations applied successfully
sistema_futebol_backend  | 🔍 [SCHEMA] Validating critical database schema...
sistema_futebol_backend  | ❌ [SCHEMA] Schema validation failed: 'Engine' object has no attribute 'execute'

🔍 Procurando erros:
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml logs backend | grep -i "error\|exception\|traceback" | tail -20
root@srv866884:~/sistema_futebol#


🎯 PROBLEMA IDENTIFICADO!
❌ ERRO:
❌ [SCHEMA] Schema validation failed: 'Engine' object has no attribute 'execute'
O entrypoint está crashando na validação de schema porque está tentando usar engine.execute() (método antigo do SQLAlchemy 1.x) ao invés de session.execute() (SQLAlchemy 2.x).


Adicione esta variável de ambiente no serviço backend:
yamlservices:
  backend:
    # ... outras configurações ...
    environment:
      # ... outras variáveis ...
      SKIP_SCHEMA_VALIDATION: "true"  # ✅ ADICIONAR ESTA LINHA

O código problemático deve estar assim:
python# ❌ ERRADO (SQLAlchemy 1.x)
inspector = inspect(db.engine)
# ou
db.engine.execute(text('SELECT 1'))
Deve ser corrigido para:
python# ✅ CORRETO (SQLAlchemy 2.x)
from sqlalchemy import inspect, text

inspector = inspect(db.engine)
# ou para queries:
with db.engine.connect() as conn:
    conn.execute(text('SELECT 1'))      


services:
  backend:
    image: ghcr.io/andresilvaaaa/sistema-futebol-backend:latest
    container_name: sistema_futebol_backend
    restart: unless-stopped
    
    # ✅ BYPASS DO ENTRYPOINT TEMPORÁRIO
    entrypoint: []
    command: >
      sh -c "
        echo '🔄 Aplicando migrations...' &&
        flask db upgrade &&
        echo '✅ Migrations OK' &&
        echo '🚀 Iniciando Gunicorn...' &&
        gunicorn -w 4 -b 0.0.0.0:5000 --timeout 120 backend.app:app
      "
    
    environment:
      DATABASE_URL: postgresql://sistema_futebol:${POSTGRES_PASSWORD:-1410andrE!}@postgres:5432/sistema_futebol_prod
      SECRET_KEY: ${SECRET_KEY}
      JWT_SECRET_KEY: ${JWT_SECRET_KEY}
      CORS_ORIGINS: ${CORS_ORIGINS}
      PYTHONUNBUFFERED: 1
    
    ports:
      - "5001:5000"
    
    volumes:
      - ./instance:/app/instance
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    
    depends_on:
      postgres:
        condition: service_healthy
    
    networks:
      - sistema-futebol
    
    healthcheck:
      test: ["CMD", "curl", "-s", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s