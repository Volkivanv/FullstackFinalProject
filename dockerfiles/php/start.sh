#!/bin/sh
set -e

APP_PATH="/var/www/laravel"
STORAGE_PATH="$APP_PATH/storage"
DATABASE_PATH="$APP_PATH/database"
BOOTSTRAP_PATH="$APP_PATH/bootstrap"
FRAMEWORK_PATH="$STORAGE_PATH/framework"

echo "🔧 Проверка и настройка storage..."

# Создаём нужные подпапки
mkdir -p "$FRAMEWORK_PATH/cache"
mkdir -p "$FRAMEWORK_PATH/sessions"
mkdir -p "$FRAMEWORK_PATH/views"
mkdir -p "$FRAMEWORK_PATH/testing"
mkdir -p "$STORAGE_PATH/logs"

# Устанавливаем права
chmod -R 777 "$STORAGE_PATH"
chmod -R 777 "$DATABASE_PATH"
chmod -R 777 "$BOOTSTRAP_PATH"
chown -R www-data:www-data "$STORAGE_PATH"

# Проверка
if [ ! -d "$FRAMEWORK_PATH/views" ]; then
    echo "❌ Папка views не создана!"
    exit 1
fi

echo "✅ Папки storage проверены и готовы к работе"

# Запускаем PHP-FPM
exec php-fpm