import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import toast, { ToastBar, Toaster } from 'react-hot-toast'; // ✅ Импортируем

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

            if (isCartEmpty) {
                if (user.cart && Array.isArray(user.cart) && user.cart.length > 0) {
                    console.log('☁️ user.cart:', user.cart);
                    localStorage.setItem('cart', JSON.stringify(user.cart));
                    console.log('📦 Корзина загружена из БД');
                }
            } else {
                console.log('📦 Корзина из localStorage сохранена', JSON.parse(savedCart));
            }
        }

        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                {/* ✅ Toast-уведомления появятся в правом верхнем углу */}
                <Toaster
                    position="top-right"
                    gutter={8}
                    toastOptions={{
                        duration: 5000,
                        style: {
                            fontSize: '14px',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        },
                        success: {
                            style: { background: '#4ade80', color: 'white' },
                            icon: '✅',
                        },
                        error: {
                            style: { background: '#f87171', color: 'white' },
                            icon: '❌',
                        },
                        loading: {
                            style: { background: '#3b82f6', color: 'white' },
                            icon: '🕐',
                        },
                    }}
                />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
