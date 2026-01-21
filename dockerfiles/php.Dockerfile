FROM php:8.4-fpm-alpine

WORKDIR /var/www/laravel

# 1. Установка системных зависимостей
RUN apk update && apk add --no-cache \
    icu-dev \
    libpq-dev \
    postgresql-client \
    $PHPIZE_DEPS \
    g++ make autoconf \
    linux-headers \          
    # <-- ОБЯЗАТЕЛЬНО для Xdebug
    nano\
    nodejs \            
    # <-- Установка Node.js
    npm                  
# <-- Установка npm

# 2. Проверка наличия ICU (для intl)
RUN find /usr -name "*icu*" -type f -printf "ICU lib found: %h\n" || echo "ICU not found!"

# 3. Установка расширения intl
RUN docker-php-ext-configure intl && \
    docker-php-ext-install intl


# 4. Установка расширений Postgre
# ВАЖНО: libpq-dev должен быть установлен ДО этого шага!
RUN docker-php-ext-install pdo_pgsql pgsql

# Явное включение расширений в php.ini
RUN echo "extension=pdo_pgsql.so" >> /usr/local/etc/php/conf.d/docker-php-ext-pdo_pgsql.ini
RUN echo "extension=pgsql.so" >> /usr/local/etc/php/conf.d/docker-php-ext-pgsql.ini



# 5. Установка Xdebug (опционально)
RUN pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    pecl clear-cache

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Очистка временных файлов
RUN apk del $PHPIZE_DEPS g++ make autoconf && \
    rm -rf /var/cache/apk/* /tmp/pear/


# 7. Права доступа
# RUN chown -R www-data:www-data /var/www/laravel/storage
# RUN chmod -R 775 /var/www/laravel/storage


CMD ["php-fpm"]