Для запуска
# Интернет-магазин "Middle Market"

## Стек
- Laravel 12
- React + Inertia
- PostgreSQL
- Docker
- Vite

## Функции
- Каталог товаров
- Фильтрация по категории, цене, рейтингу
- Отзывы пользователей
- Авторизация (Breeze + Inertia)

## Запуск
```bash
git clone ...
cp src/.env.example src/.env
docker-compose up -d
docker-compose run --rm artisan migrate --seed
# RUN chmod 777 -R storage/
# RUN chmod 777 -R database/