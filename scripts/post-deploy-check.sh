#!/bin/bash
set -e

# Post-Deploy Verification Script
# Comprehensive checks after deployment to ensure system health

echo "🔍 [POST-DEPLOY] Starting post-deployment verification..."

# Configuration
BACKEND_URL="${BACKEND_URL:-http://localhost:5000}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3000}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-futebol_db}"
DB_USER="${DB_USER:-postgres}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
CHECKS_PASSED=0
CHECKS_FAILED=0
CHECKS_WARNING=0

# Helper functions
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((CHECKS_PASSED++))
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    ((CHECKS_FAILED++))
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((CHECKS_WARNING++))
}

log_info() {
    echo -e "ℹ️  $1"
}

# Check 1: Container Health Status
check_container_health() {
    log_info "[1/8] Checking container health status..."
    
    # Check if docker-compose is available
    if ! command -v docker-compose &> /dev/null; then
        log_error "docker-compose not found"
        return 1
    fi
    
    # Check backend container
    if docker-compose ps backend | grep -q "healthy\|Up"; then
        log_success "Backend container is healthy"
    else
        log_error "Backend container is not healthy"
    fi
    
    # Check frontend container
    if docker-compose ps frontend | grep -q "healthy\|Up"; then
        log_success "Frontend container is healthy"
    else
        log_error "Frontend container is not healthy"
    fi
    
    # Check postgres container
    if docker-compose ps postgres | grep -q "healthy\|Up"; then
        log_success "PostgreSQL container is healthy"
    else
        log_error "PostgreSQL container is not healthy"
    fi
}

# Check 2: Migration Synchronization
check_migration_sync() {
    log_info "[2/8] Checking migration synchronization..."
    
    # Get current migration from Alembic
    ALEMBIC_VERSION=$(docker-compose exec -T backend flask db current 2>/dev/null | grep -o '[a-f0-9]\{12\}' | head -1)
    
    if [ -n "$ALEMBIC_VERSION" ]; then
        log_success "Current Alembic version: $ALEMBIC_VERSION"
        
        # Check if this version exists in migrations folder
        if ls migrations/versions/*${ALEMBIC_VERSION}*.py &> /dev/null; then
            log_success "Migration file exists for current version"
        else
            log_warning "Migration file not found for current version"
        fi
    else
        log_error "Could not retrieve current Alembic version"
    fi
}

# Check 3: Health Endpoints
check_health_endpoints() {
    log_info "[3/8] Checking health endpoints..."
    
    # Backend health check
    if curl -f -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
        BACKEND_RESPONSE=$(curl -s "$BACKEND_URL/api/health")
        if echo "$BACKEND_RESPONSE" | grep -q "healthy\|ok\|success"; then
            log_success "Backend health endpoint responding correctly"
        else
            log_warning "Backend health endpoint responding but status unclear: $BACKEND_RESPONSE"
        fi
    else
        log_error "Backend health endpoint not responding at $BACKEND_URL/api/health"
    fi
    
    # Frontend health check (basic connectivity)
    if curl -f -s "$FRONTEND_URL" > /dev/null 2>&1; then
        log_success "Frontend is accessible at $FRONTEND_URL"
    else
        log_error "Frontend not accessible at $FRONTEND_URL"
    fi
}

# Check 4: Log Analysis
check_logs_for_errors() {
    log_info "[4/8] Analyzing recent logs for errors..."
    
    # Check backend logs for errors in last 50 lines
    BACKEND_ERRORS=$(docker-compose logs --tail=50 backend 2>/dev/null | grep -i "error\|exception\|traceback\|failed" | wc -l)
    
    if [ "$BACKEND_ERRORS" -eq 0 ]; then
        log_success "No recent errors in backend logs"
    elif [ "$BACKEND_ERRORS" -le 2 ]; then
        log_warning "Found $BACKEND_ERRORS recent error(s) in backend logs"
    else
        log_error "Found $BACKEND_ERRORS recent errors in backend logs"
    fi
    
    # Check postgres logs for errors
    POSTGRES_ERRORS=$(docker-compose logs --tail=50 postgres 2>/dev/null | grep -i "error\|fatal\|panic" | wc -l)
    
    if [ "$POSTGRES_ERRORS" -eq 0 ]; then
        log_success "No recent errors in PostgreSQL logs"
    else
        log_warning "Found $POSTGRES_ERRORS recent error(s) in PostgreSQL logs"
    fi
}

# Check 5: Database Connectivity and Basic Queries
check_database_queries() {
    log_info "[5/8] Testing database connectivity and basic queries..."
    
    # Test basic connection
    if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
        log_success "Database connection successful"
    else
        log_error "Database connection failed"
        return 1
    fi
    
    # Test critical tables exist
    TABLES_COUNT=$(PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" 2>/dev/null | xargs)
    
    if [ "$TABLES_COUNT" -gt 0 ]; then
        log_success "Found $TABLES_COUNT tables in database"
    else
        log_error "No tables found in database"
    fi
    
    # Test users table specifically (if exists)
    if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT COUNT(*) FROM users;" > /dev/null 2>&1; then
        USERS_COUNT=$(PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null | xargs)
        log_success "Users table accessible with $USERS_COUNT records"
    else
        log_warning "Users table not accessible or doesn't exist"
    fi
}

# Check 6: Database Locks and Performance
check_database_locks() {
    log_info "[6/8] Checking for database locks and performance issues..."
    
    # Check for long-running queries
    LONG_QUERIES=$(PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active' AND query_start < NOW() - INTERVAL '5 minutes';" 2>/dev/null | xargs)
    
    if [ "$LONG_QUERIES" -eq 0 ]; then
        log_success "No long-running queries detected"
    else
        log_warning "Found $LONG_QUERIES long-running queries (>5 min)"
    fi
    
    # Check for locks
    LOCKS_COUNT=$(PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM pg_locks WHERE NOT granted;" 2>/dev/null | xargs)
    
    if [ "$LOCKS_COUNT" -eq 0 ]; then
        log_success "No blocking database locks detected"
    else
        log_warning "Found $LOCKS_COUNT ungranted locks"
    fi
}

# Check 7: Critical Columns Verification
check_critical_columns() {
    log_info "[7/8] Verifying critical database columns..."
    
    # Check if users.initial_balance exists (the column that caused the original issue)
    if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT initial_balance FROM users LIMIT 1;" > /dev/null 2>&1; then
        log_success "Critical column 'users.initial_balance' exists and accessible"
    else
        log_error "Critical column 'users.initial_balance' missing or inaccessible"
    fi
    
    # Check other critical columns
    CRITICAL_COLUMNS=("users.monthly_fee" "users.custom_monthly_fee")
    
    for col in "${CRITICAL_COLUMNS[@]}"; do
        TABLE=$(echo $col | cut -d'.' -f1)
        COLUMN=$(echo $col | cut -d'.' -f2)
        
        if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT $COLUMN FROM $TABLE LIMIT 1;" > /dev/null 2>&1; then
            log_success "Column '$col' exists and accessible"
        else
            log_warning "Column '$col' missing or inaccessible"
        fi
    done
}

# Check 8: API Functionality Test
check_api_functionality() {
    log_info "[8/8] Testing basic API functionality..."
    
    # Test API root endpoint
    if curl -f -s "$BACKEND_URL/api/" > /dev/null 2>&1; then
        log_success "API root endpoint accessible"
    else
        log_warning "API root endpoint not accessible"
    fi
    
    # Test auth endpoints (should return method not allowed or similar, not 500)
    AUTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/auth/login" 2>/dev/null)
    
    if [ "$AUTH_STATUS" = "405" ] || [ "$AUTH_STATUS" = "400" ] || [ "$AUTH_STATUS" = "422" ]; then
        log_success "Auth endpoint responding correctly (status: $AUTH_STATUS)"
    elif [ "$AUTH_STATUS" = "500" ]; then
        log_error "Auth endpoint returning 500 error"
    else
        log_warning "Auth endpoint status unclear: $AUTH_STATUS"
    fi
}

# Generate summary report
generate_summary() {
    echo ""
    echo "📊 [SUMMARY] Post-deployment verification results:"
    echo "  ✅ Checks passed: $CHECKS_PASSED"
    echo "  ⚠️  Warnings: $CHECKS_WARNING"
    echo "  ❌ Checks failed: $CHECKS_FAILED"
    echo ""
    
    if [ "$CHECKS_FAILED" -eq 0 ]; then
        if [ "$CHECKS_WARNING" -eq 0 ]; then
            echo -e "${GREEN}🎉 All checks passed! Deployment is healthy.${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠️  Deployment completed with warnings. Review above.${NC}"
            return 0
        fi
    else
        echo -e "${RED}❌ Deployment has issues. $CHECKS_FAILED critical checks failed.${NC}"
        return 1
    fi
}

# Main execution
main() {
    echo "🚀 Starting post-deployment verification..."
    echo "Backend URL: $BACKEND_URL"
    echo "Frontend URL: $FRONTEND_URL"
    echo "Database: $DB_HOST:$DB_PORT/$DB_NAME"
    echo ""
    
    # Run all checks
    check_container_health
    check_migration_sync
    check_health_endpoints
    check_logs_for_errors
    check_database_queries
    check_database_locks
    check_critical_columns
    check_api_functionality
    
    # Generate summary
    generate_summary
}

# Execute main function
main "$@"