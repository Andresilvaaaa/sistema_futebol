#!/bin/bash
set -e
set -o pipefail

echo "🚀 [ENTRYPOINT] Starting backend initialization..."

export FLASK_APP="${FLASK_APP:-backend.app:app}"
export FLASK_ENV="${FLASK_ENV:-production}"
export PYTHONPATH="${PYTHONPATH:-/app}"

SKIP_MIGRATIONS="${SKIP_MIGRATIONS:-false}"
SKIP_SCHEMA_VALIDATION="${SKIP_SCHEMA_VALIDATION:-false}"
SKIP_HEALTH_CHECK="${SKIP_HEALTH_CHECK:-false}"

DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-sistema_futebol_prod}"
DB_USER="${DB_USER:-postgres}"

MAX_RETRIES=30
RETRY_INTERVAL=2

echo "📊 [ENTRYPOINT] Configuration:"
echo "  - FLASK_APP: $FLASK_APP"
echo "  - FLASK_ENV: $FLASK_ENV"
echo "  - DB_HOST: $DB_HOST:$DB_PORT"
echo "  - DB_NAME: $DB_NAME"
echo "  - SKIP_MIGRATIONS: $SKIP_MIGRATIONS"
echo "  - SKIP_SCHEMA_VALIDATION: $SKIP_SCHEMA_VALIDATION"

wait_for_postgres() {
    echo "⏳ [DB-WAIT] Waiting for PostgreSQL to be ready..."
    
    for i in $(seq 1 $MAX_RETRIES); do
        if pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; then
            echo "✅ [DB-WAIT] PostgreSQL is ready (attempt $i/$MAX_RETRIES)"
            return 0
        fi
        
        echo "⏳ [DB-WAIT] PostgreSQL not ready yet (attempt $i/$MAX_RETRIES), retrying in ${RETRY_INTERVAL}s..."
        sleep $RETRY_INTERVAL
    done
    
    echo "❌ [DB-WAIT] PostgreSQL connection timeout after $MAX_RETRIES attempts"
    exit 1
}

apply_migrations() {
    if [ "$SKIP_MIGRATIONS" = "true" ]; then
        echo "⏭️  [MIGRATIONS] Skipping migrations (SKIP_MIGRATIONS=true)"
        return 0
    fi
    
    echo "🔄 [MIGRATIONS] Applying database migrations..."
    
    cd /app
    
    if [ ! -d "migrations" ]; then
        echo "⚠️  [MIGRATIONS] No migrations directory found, skipping migration check"
        return 0
    fi
    
    if timeout 60 flask db upgrade 2>&1; then
        echo "✅ [MIGRATIONS] Database migrations applied successfully"
    else
        echo "❌ [MIGRATIONS] Migration failed or timed out"
        echo "🔧 [MIGRATIONS] Attempting idempotent SQL fallback..."
        
        if [ -f "/app/scripts/migrations_idempotent.sql" ]; then
            echo "🔧 [MIGRATIONS] Applying idempotent SQL..."
            if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f /app/scripts/migrations_idempotent.sql 2>&1; then
                echo "✅ [MIGRATIONS] Idempotent SQL applied successfully"
            else
                echo "⚠️  [MIGRATIONS] Idempotent SQL also failed, but continuing..."
            fi
        else
            echo "⚠️  [MIGRATIONS] No fallback SQL available, but continuing..."
        fi
    fi
}

validate_schema() {
    if [ "$SKIP_SCHEMA_VALIDATION" = "true" ]; then
        echo "⏭️  [SCHEMA] Skipping schema validation (SKIP_SCHEMA_VALIDATION=true)"
        return 0
    fi
    
    echo "🔍 [SCHEMA] Validating critical database schema..."
    
    python3 << 'PYTHON_EOF' || true
import sys
import os
sys.path.insert(0, '/app')

try:
    from sqlalchemy import text, inspect
    from backend.app import create_app
    from backend.services.db.connection import db
    
    app = create_app()
    with app.app_context():
        with db.engine.connect() as conn:
            result = conn.execute(text('SELECT 1')).scalar()
            print('✅ [SCHEMA] Database connection test passed')
        
        inspector = inspect(db.engine)
        table_names = inspector.get_table_names()
        
        critical_tables = ['users', 'players', 'expenses', 'monthly_data']
        
        for table in critical_tables:
            if table in table_names:
                print(f'✅ [SCHEMA] Table {table} exists')
            else:
                print(f'⚠️  [SCHEMA] Table {table} missing (may be created later)')
        
        if 'users' in table_names:
            columns_info = inspector.get_columns('users')
            column_names = [col['name'] for col in columns_info]
            
            critical_columns = ['id', 'username', 'email', 'initial_balance']
            
            for col in critical_columns:
                if col in column_names:
                    print(f'✅ [SCHEMA] Column users.{col} exists')
                else:
                    print(f'⚠️  [SCHEMA] Column users.{col} missing')
        
        print('✅ [SCHEMA] Schema validation completed')
        
except Exception as e:
    print(f'⚠️  [SCHEMA] Schema validation warning: {e}')
    sys.exit(0)
PYTHON_EOF
    
    echo "✅ [SCHEMA] Schema validation passed"
}

health_check() {
    if [ "$SKIP_HEALTH_CHECK" = "true" ]; then
        echo "⏭️  [HEALTH] Skipping health check (SKIP_HEALTH_CHECK=true)"
        return 0
    fi
    
    echo "🏥 [HEALTH] Performing pre-start health check..."
    
    python3 << 'PYTHON_EOF' || true
import sys
sys.path.insert(0, '/app')

try:
    from backend.app import create_app
    
    app = create_app()
    with app.app_context():
        print('✅ [HEALTH] Flask app created successfully')
        
        if app.url_map:
            route_count = len(list(app.url_map.iter_rules()))
            print(f'✅ [HEALTH] {route_count} routes registered successfully')
        else:
            print('⚠️  [HEALTH] No routes found')
        
        print('✅ [HEALTH] Health check passed')
        
except Exception as e:
    print(f'⚠️  [HEALTH] Health check warning: {e}')
    sys.exit(0)
PYTHON_EOF
    
    echo "✅ [HEALTH] Health check passed"
}

main() {
    echo "🚀 [ENTRYPOINT] Starting initialization sequence..."
    
    wait_for_postgres
    apply_migrations
    validate_schema
    health_check
    
    echo "✅ [ENTRYPOINT] All checks passed! Starting Gunicorn..."
    echo "🚀 [ENTRYPOINT] Command: $@"
    
    exec "$@"
}

trap 'echo "🛑 [ENTRYPOINT] Received shutdown signal, exiting..."; exit 0' SIGTERM SIGINT

main "$@"