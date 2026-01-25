FROM php:8.4-fpm-alpine

WORKDIR /var/www/laravel

# Установка системных зависимостей
RUN apk update && apk add --no-cache \
    icu-dev \
    libpq-dev \
    postgresql-client \
    $PHPIZE_DEPS \
    g++ \
    make \
    autoconf \
    linux-headers \
    nano

# Установка расширения intl
RUN docker-php-ext-configure intl && \
    docker-php-ext-install intl

# Установка расширений PostgreSQL
RUN docker-php-ext-install pdo_pgsql pgsql

# Явное включение расширений (на всякий случай)
RUN echo "extension=pdo_pgsql" > /usr/local/etc/php/conf.d/docker-php-ext-pdo_pgsql.ini
RUN echo "extension=pgsql" > /usr/local/etc/php/conf.d/docker-php-ext-pgsql.ini

# Установка Xdebug
RUN pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    pecl clear-cache

# Создаём конфиг Xdebug
RUN mkdir -p /usr/local/etc/php/conf.d && \
    { \
        echo "xdebug.mode=develop,debug"; \
        echo "xdebug.start_with_request=yes"; \
        echo "xdebug.client_host=host.docker.internal"; \
        echo "xdebug.discover_client_host=false"; \
        echo "xdebug.show_error_trace=1"; \
        echo "xdebug.log_level=0"; \
    } > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Копируем скрипт запуска
COPY php/start.sh /start.sh
RUN chmod +x /start.sh

# Очистка временных файлов
RUN apk del g++ make autoconf $PHPIZE_DEPS && \
    rm -rf /var/cache/apk/* /tmp/pear

# Запускаем скрипт
CMD ["/start.sh"]