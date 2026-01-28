#!/bin/sh
set -e

APP_PATH="/var/www/laravel"
STORAGE_PATH="$APP_PATH/storage"
DATABASE_PATH="$APP_PATH/database"
BOOTSTRAP_PATH="$APP_PATH/bootstrap"
FRAMEWORK_PATH="$STORAGE_PATH/framework"



mkdir -p "$FRAMEWORK_PATH/cache"
mkdir -p "$FRAMEWORK_PATH/sessions"
mkdir -p "$FRAMEWORK_PATH/views"
mkdir -p "$FRAMEWORK_PATH/testing"
mkdir -p "$STORAGE_PATH/logs"


chmod -R 775 "$STORAGE_PATH"
chmod -R 775 "$DATABASE_PATH"
chmod -R 775 "$BOOTSTRAP_PATH"
chown -R www-data:www-data "$STORAGE_PATH" 2>/dev/null || true


exec php-fpm