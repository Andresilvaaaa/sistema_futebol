#!/bin/bash

# Simple Health Check Script for Cron/Scheduled Monitoring
# Checks critical services and restarts if needed

# Configuration
BACKEND_URL="${BACKEND_URL:-http://localhost:5000}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
LOG_FILE="${LOG_FILE:-/var/log/futebol-health.log}"
MAX_RESTART_ATTEMPTS=3
RESTART_COOLDOWN=300  # 5 minutes

# Logging function
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if service is healthy
check_service_health() {
    local service_name=$1
    local health_url=$2
    
    if curl -f -s --max-time 10 "$health_url" > /dev/null 2>&1; then
        return 0  # Healthy
    else
        return 1  # Unhealthy
    fi
}

# Restart service with cooldown check
restart_service() {
    local service_name=$1
    local restart_file="/tmp/.${service_name}_restart_count"
    local cooldown_file="/tmp/.${service_name}_last_restart"
    
    # Check cooldown
    if [ -f "$cooldown_file" ]; then
        local last_restart=$(cat "$cooldown_file")
        local current_time=$(date +%s)
        local time_diff=$((current_time - last_restart))
        
        if [ $time_diff -lt $RESTART_COOLDOWN ]; then
            log_message "⏳ Service $service_name in restart cooldown (${time_diff}s/${RESTART_COOLDOWN}s)"
            return 1
        fi
    fi
    
    # Check restart attempts
    local restart_count=0
    if [ -f "$restart_file" ]; then
        restart_count=$(cat "$restart_file")
    fi
    
    if [ $restart_count -ge $MAX_RESTART_ATTEMPTS ]; then
        log_message "🚨 Service $service_name exceeded max restart attempts ($restart_count/$MAX_RESTART_ATTEMPTS)"
        return 1
    fi
    
    # Perform restart
    log_message "🔄 Restarting service: $service_name (attempt $((restart_count + 1))/$MAX_RESTART_ATTEMPTS)"
    
    if docker-compose -f "$COMPOSE_FILE" restart "$service_name"; then
        log_message "✅ Service $service_name restarted successfully"
        
        # Update restart tracking
        echo $((restart_count + 1)) > "$restart_file"
        echo $(date +%s) > "$cooldown_file"
        
        # Wait for service to come up
        sleep 30
        
        return 0
    else
        log_message "❌ Failed to restart service: $service_name"
        return 1
    fi
}

# Reset restart counters (call this after successful health checks)
reset_restart_counters() {
    rm -f /tmp/.*_restart_count /tmp/.*_last_restart 2>/dev/null
}

# Main health check
main() {
    log_message "🏥 Starting health check..."
    
    local services_healthy=true
    
    # Check backend health
    if check_service_health "backend" "$BACKEND_URL/api/health"; then
        log_message "✅ Backend service healthy"
    else
        log_message "❌ Backend service unhealthy"
        services_healthy=false
        
        if restart_service "backend"; then
            # Recheck after restart
            sleep 10
            if check_service_health "backend" "$BACKEND_URL/api/health"; then
                log_message "✅ Backend service recovered after restart"
                services_healthy=true
            else
                log_message "❌ Backend service still unhealthy after restart"
            fi
        fi
    fi
    
    # Check database connectivity
    if docker-compose -f "$COMPOSE_FILE" exec -T postgres pg_isready > /dev/null 2>&1; then
        log_message "✅ Database service healthy"
    else
        log_message "❌ Database service unhealthy"
        services_healthy=false
        
        if restart_service "postgres"; then
            sleep 15  # Database needs more time to start
            if docker-compose -f "$COMPOSE_FILE" exec -T postgres pg_isready > /dev/null 2>&1; then
                log_message "✅ Database service recovered after restart"
                services_healthy=true
            else
                log_message "❌ Database service still unhealthy after restart"
            fi
        fi
    fi
    
    # If all services are healthy, reset restart counters
    if [ "$services_healthy" = true ]; then
        reset_restart_counters
        log_message "🎉 All services healthy - reset restart counters"
    fi
    
    log_message "🏥 Health check completed"
}

# Execute main function
main "$@"