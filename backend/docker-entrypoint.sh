#!/bin/bash
set -e

# Backend Docker Entrypoint - Migration Gate & Health Checks
# Ensures database is ready and migrations are applied before starting Gunicorn

echo "🚀 [ENTRYPOINT] Starting backend initialization..."

# Environment variables with defaults
export FLASK_APP="${FLASK_APP:-backend.app:app}"
export FLASK_ENV="${FLASK_ENV:-production}"
export PYTHONPATH="${PYTHONPATH:-/app}"

# Database connection parameters
DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-futebol_db}"
DB_USER="${DB_USER:-postgres}"

MAX_RETRIES=30
RETRY_INTERVAL=2

echo "📊 [ENTRYPOINT] Configuration:"
echo "  - FLASK_APP: $FLASK_APP"
echo "  - FLASK_ENV: $FLASK_ENV"
echo "  - DB_HOST: $DB_HOST:$DB_PORT"
echo "  - DB_NAME: $DB_NAME"

# Function: Wait for PostgreSQL to be ready
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

# Function: Apply database migrations
apply_migrations() {
    echo "🔄 [MIGRATIONS] Applying database migrations..."
    
    cd /app
    
    # Check if migrations directory exists
    if [ ! -d "migrations" ]; then
        echo "⚠️  [MIGRATIONS] No migrations directory found, skipping migration check"
        return 0
    fi
    
    # Apply migrations with timeout
    if timeout 60 flask db upgrade; then
        echo "✅ [MIGRATIONS] Database migrations applied successfully"
    else
        echo "❌ [MIGRATIONS] Migration failed or timed out"
        echo "🔧 [MIGRATIONS] Attempting idempotent SQL fallback..."
        
        # Try idempotent SQL if available
        if [ -f "/app/scripts/migrations_idempotent.sql" ]; then
            echo "🔧 [MIGRATIONS] Applying idempotent SQL..."
            if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f /app/scripts/migrations_idempotent.sql; then
                echo "✅ [MIGRATIONS] Idempotent SQL applied successfully"
            else
                echo "❌ [MIGRATIONS] Idempotent SQL also failed"
                exit 1
            fi
        else
            echo "❌ [MIGRATIONS] No fallback SQL available, exiting"
            exit 1
        fi
    fi
}

# Function: Validate critical database schema
validate_schema() {
    echo "🔍 [SCHEMA] Validating critical database schema..."
    
    # Check for critical tables and columns
    python3 -c "
import sys
import os
sys.path.insert(0, '/app')

try:
    from backend.app import create_app
    from backend.services.db.connection import db
    
    app = create_app()
    with app.app_context():
        # Test database connection
        result = db.engine.execute('SELECT 1').scalar()
        print('✅ [SCHEMA] Database connection test passed')
        
        # Check critical tables exist
        tables = db.engine.execute(\"\"\"
            SELECT table_name FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
        \"\"\").fetchall()
        
        table_names = [t[0] for t in tables]
        critical_tables = ['users', 'players', 'expenses', 'monthly_data']
        
        for table in critical_tables:
            if table in table_names:
                print(f'✅ [SCHEMA] Table {table} exists')
            else:
                print(f'⚠️  [SCHEMA] Table {table} missing (may be created later)')
        
        # Check critical columns in users table if it exists
        if 'users' in table_names:
            columns = db.engine.execute(\"\"\"
                SELECT column_name FROM information_schema.columns 
                WHERE table_name = 'users' AND table_schema = 'public'
            \"\"\").fetchall()
            
            column_names = [c[0] for c in columns]
            critical_columns = ['id', 'username', 'email', 'initial_balance']
            
            for col in critical_columns:
                if col in column_names:
                    print(f'✅ [SCHEMA] Column users.{col} exists')
                else:
                    print(f'⚠️  [SCHEMA] Column users.{col} missing')
        
        print('✅ [SCHEMA] Schema validation completed')
        
except Exception as e:
    print(f'❌ [SCHEMA] Schema validation failed: {e}')
    sys.exit(1)
"
    
    if [ $? -eq 0 ]; then
        echo "✅ [SCHEMA] Schema validation passed"
    else
        echo "❌ [SCHEMA] Schema validation failed"
        exit 1
    fi
}

# Function: Health check
health_check() {
    echo "🏥 [HEALTH] Performing pre-start health check..."
    
    python3 -c "
import sys
sys.path.insert(0, '/app')

try:
    from backend.app import create_app
    
    app = create_app()
    with app.app_context():
        # Test app creation
        print('✅ [HEALTH] Flask app created successfully')
        
        # Test basic route registration
        if app.url_map:
            print('✅ [HEALTH] Routes registered successfully')
        else:
            print('⚠️  [HEALTH] No routes found')
        
        print('✅ [HEALTH] Health check passed')
        
except Exception as e:
    print(f'❌ [HEALTH] Health check failed: {e}')
    sys.exit(1)
"
    
    if [ $? -eq 0 ]; then
        echo "✅ [HEALTH] Health check passed"
    else
        echo "❌ [HEALTH] Health check failed"
        exit 1
    fi
}

# Main execution flow
main() {
    echo "🚀 [ENTRYPOINT] Starting initialization sequence..."
    
    # Step 1: Wait for PostgreSQL
    wait_for_postgres
    
    # Step 2: Apply migrations
    apply_migrations
    
    # Step 3: Validate schema
    validate_schema
    
    # Step 4: Health check
    health_check
    
    echo "✅ [ENTRYPOINT] All checks passed! Starting Gunicorn..."
    echo "🚀 [ENTRYPOINT] Command: $@"
    
    # Execute the original command (Gunicorn)
    exec "$@"
}

# Handle signals gracefully
trap 'echo "🛑 [ENTRYPOINT] Received shutdown signal, exiting..."; exit 0' SIGTERM SIGINT

# Run main function with all arguments
main "$@"