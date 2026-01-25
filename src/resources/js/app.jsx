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
        } else {
            console.log('Not user!!!');
        }

        // ✅ Добавляем: сохранение при закрытии вкладки
        if (user) {
            const handleBeforeUnload = () => {
                const cart = localStorage.getItem('cart');
                if (cart) {
                    try {
                        const cartData = JSON.parse(cart);

                        // Используем navigator.sendBeacon или fetch
                        if (navigator.sendBeacon) {
                            // sendBeacon — надёжнее, работает даже после закрытия
                            const blob = new Blob([JSON.stringify({ cart: cartData })], {
                                type: 'application/json',
                            });
                            navigator.sendBeacon('/api/cart/save', blob);
                        } else {
                            // Fallback на fetch с keepalive
                            fetch('/api/cart/save', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    // Не отправляем XSRF — без CSRF protection
                                },
                                body: JSON.stringify({ cart: cartData }),
                                keepalive: true, // 🔥 Критически важно
                            });
                        }
                    } catch (e) {
                        console.error('❌ Не удалось отправить корзину при закрытии', e);
                    }
                }
            };

            // Добавляем обработчик
            window.addEventListener('beforeunload', handleBeforeUnload);

            // Очищаем при unmount (на случай HMR)
            // return () => {
            //     window.removeEventListener('beforeunload', handleBeforeUnload);
            // };
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
        // ✅ Если нужно — очистка (но редко нужна)
        return () => {
            if (user) {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            }
            root.unmount();
        };
    },
    progress: {
        color: '#4B5563',
    },
});
