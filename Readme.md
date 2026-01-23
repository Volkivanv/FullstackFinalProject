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
- Фильтрация, поиск
- Отзывы (для защиты — можно добавить)
- Авторизация
- Корзина на `localStorage`
- Адаптивный интерфейс

## Запуск
```bash
git clone https://github.com/Volkivanv/FullstackFinalProject.git
cd middle
cp src/.env.example src/.env
docker-compose up -d
docker-compose run --rm artisan migrate --seed
docker-compose run --rm composer install
docker-compose run --rm vite npm install
docker-compose run --rm vite npm run build


# RUN chmod 777 -R storage/
# RUN chmod 777 -R database/