import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        );

        if (!page.layout) {
            page.layout = (page) => <AppLayout>{page.children}</AppLayout>;
        }

        return page;
    },
    setup({ el, App, props }) {
        const user = props.initialPage.props.auth?.user;

        // 🔹 Только при ПЕРВОМ входе: если localStorage пуст — подгружаем из БД
        if (user) {
            const savedCart = localStorage.getItem('cart');
            console.log('💾 savedCart:', savedCart);
            const isCartEmpty = !savedCart || savedCart === '[]' || savedCart === 'null';

            // 🔹 ВАЖНО: делаем это ТОЛЬКО один раз — при первом входе
            // Не при каждом переходе!
            if (isCartEmpty) {
                // Только если в БД есть корзина
                if (user.cart && Array.isArray(user.cart) && user.cart.length > 0) {
                    console.log('☁️ user.cart:', user.cart);
                    localStorage.setItem('cart', JSON.stringify(user.cart));
                    console.log('📦 Корзина загружена из БД');
                }
            } else {
                console.log('📦 Корзина из localStorage сохранена', JSON.parse(savedCart));
            }
        }

        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
