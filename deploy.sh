#!/bin/bash

# Smart Calendar Deployment Script
set -e

echo "🚀 Starting Smart Calendar Deployment..."

# Configuration
APP_DIR="/var/www/smart-calendar"
BACKUP_DIR="/var/backups/smart-calendar"
DATE=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    error "Please run as root"
fi

# Backup existing installation
backup() {
    log "Creating backup..."
    mkdir -p $BACKUP_DIR
    tar -czf $BACKUP_DIR/backup_$DATE.tar.gz -C $APP_DIR . 2>/dev/null || warn "No existing installation to backup"
}

# Deploy new version
deploy() {
    log "Deploying new version..."
    
    # Create directory if it doesn't exist
    mkdir -p $APP_DIR
    
    # Copy files (assuming current directory contains the new version)
    cp -r . $APP_DIR/
    
    # Set permissions
    chown -R www-data:www-data $APP_DIR
    chmod -R 755 $APP_DIR
    chmod -R 644 $APP_DIR/*.php
    chmod 600 $APP_DIR/.env
    
    # Remove development files
    rm -f $APP_DIR/.gitignore
    rm -f $APP_DIR/README.md
    rm -f $APP_DIR/deploy.sh
}

# Database migration
migrate_database() {
    log "Running database migrations..."
    
    # Check if database exists
    if ! mysql -e "USE smart_calendar" 2>/dev/null; then
        log "Creating database..."
        mysql -e "CREATE DATABASE IF NOT EXISTS smart_calendar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    fi
    
    # Import schema
    if [ -f "database/smart_calendar.sql" ]; then
        mysql smart_calendar < database/smart_calendar.sql
        log "Database schema imported"
    fi
}

# Configuration setup
setup_config() {
    log "Setting up configuration..."
    
    if [ ! -f "$APP_DIR/.env" ]; then
        cp $APP_DIR/.env.example $APP_DIR/.env
        warn "Please configure .env file before starting the application"
    fi
}

# Service restart
restart_services() {
    log "Restarting services..."
    
    # Restart PHP-FPM
    systemctl restart php8.1-fpm 2>/dev/null || warn "PHP-FPM restart failed"
    
    # Restart Nginx
    systemctl reload nginx 2>/dev/null || systemctl restart nginx 2>/dev/null || warn "Nginx restart failed"
    
    # Restart Redis if used
    systemctl restart redis-server 2>/dev/null || warn "Redis restart failed"
}

# Health check
health_check() {
    log "Performing health check..."
    
    # Wait a moment for services to start
    sleep 5
    
    # Check if application responds
    if curl -f http://localhost/ > /dev/null 2>&1; then
        log "✅ Application is running successfully"
    else
        error "❌ Application health check failed"
    fi
}
#Photo uploads
mkdir -p uploads/profile_photos
chmod 755 uploads
chmod 755 uploads/profile_photos
# Cleanup old backups
cleanup_backups() {
    log "Cleaning up old backups..."
    find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +30 -delete
}

# Main deployment process
main() {
    log "Starting deployment process..."
    
    backup
    deploy
    migrate_database
    setup_config
    restart_services
    health_check
    cleanup_backups
    
    log "🎉 Deployment completed successfully!"
    log "📝 Application URL: http://your-domain.com"
    log "🔧 Don't forget to configure your .env file"
}

# Run main function
main "$@"