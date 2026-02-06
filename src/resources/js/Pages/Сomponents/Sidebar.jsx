import { Link, router } from '@inertiajs/react';
import { useCart } from '@/Hooks/useCart';
import toast from 'react-hot-toast';

export default function Sidebar({ onClose, auth }) {
    const { items } = useCart(); // ✅ Получаем корзину

    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     console.log('📤 Отправка корзины:', items); // 🔥 Добавьте отладку
    //     router.post('/logout', {
    //         method: 'post',
    //         cart: items,
    //         // forceFormData: true, // ⚠️ Если не передаётся — попробуйте это
    //         onSuccess: () => {
    //             console.log('✅ Отправлено');
    //             localStorage.removeItem('cart');
    //             console.log('🗑 localStorage.cart удалён');
    //             toast.success(`До свидания, ${auth.user.name}!`);
    //         },
    //         onError: (error) => {
    //             console.error('❌ Ошибка:', error);
    //             localStorage.removeItem('cart'); // на всякий случай
    //         },

    //     });
    // };

    // const handleLogout = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Отправляем без редиректа
    //         await router.visit('/logout', {
    //             method: 'post',
    //             data: { cart: items },
    //             preserveState: false,
    //             replace: true,
    //         });

    //         // Теперь можно очистить и показать toast
    //         localStorage.removeItem('cart');
    //         toast.success(`До свидания, ${auth.user.name}!`);

    //         // Ручной редирект
    //         window.location.href = '/';
    //     } catch (error) {
    //         console.error('Ошибка выхода', error);
    //         localStorage.removeItem('cart');
    //     }
    // };

    const handleLogout = (e) => {
        e.preventDefault();
   //     console.log('📤 Отправка корзины:', items);

        // ✅ Главное — удалить до отправки
        localStorage.removeItem('cart');
   //     console.log('🗑 localStorage.cart удалён');

        // Отправляем и переходим
        router.post('/logout', {
            cart: items
        });
    };

  //  console.log(auth?.user?.is_admin);


    return (
        <aside className="w-64 bg-indigo-800 text-white h-full fixed inset-y-0 left-0 z-30 shadow-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold">Middle Market</h2>

                {auth?.user && (
                    <div className="mt-4 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 font-bold">
                            {auth.user.name[0]?.toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-white truncate">
                            {auth.user.name}
                        </span>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="lg:hidden mt-6 text-indigo-200 hover:text-white"
                >
                    Закрыть
                </button>
            </div>

            <nav className="mt-6">
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/"
                            onClick={onClose}
                            className="flex items-center px-6 py-3 text-gray-200 hover:bg-indigo-700 rounded-l-lg transition"
                        >
                            🏠 Главная
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            onClick={onClose}
                            className="flex items-center px-6 py-3 text-gray-200 hover:bg-indigo-700 rounded-l-lg transition"
                        >
                            🛍️ Каталог
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/cart"
                            onClick={onClose}
                            className="flex items-center px-6 py-3 text-gray-200 hover:bg-indigo-700 rounded-l-lg transition"
                        >
                            🛒 Корзина
                        </Link>
                    </li>

                    {auth?.user ? (
                        <li>
                            <form onSubmit={handleLogout}>
                                <button
                                    type="submit"
                                    className="w-full text-left flex items-center px-6 py-3 text-gray-200 hover:bg-red-600 rounded-l-lg rounded-l-lg transition"
                                // onClick={onClose}
                                >
                                    🔴 Выход
                                </button>
                            </form>
                        </li>
                    ) : (
                        <div className="px-2 mt-4 space-y-2">
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="flex items-center px-6 py-3 text-gray-200 bg-green-600 hover:bg-green-700 rounded-l-lg rounded-r-lg transition"
                            >
                                ✅ Войти
                            </Link>
                            <Link
                                href="/register"
                                onClick={onClose}
                                className="flex items-center px-6 py-3 text-gray-200 bg-blue-600 hover:bg-blue-700 rounded-l-lg rounded-r-lg transition"
                            >
                                📝 Зарегистрироваться
                            </Link>
                        </div>
                    )}

                    {/* 🔐 Админ-панель */}
                    {auth?.user?.is_admin && (
                        <>
                            <a
                                href={route('products.index')}
                                className="block px-6 py-3 hover:bg-red-600 font-medium border-t border-gray-700"
                                onClick={onClose}
                            >
                                🛠 Управлять товарами
                            </a>

                            <a
                                href={route('admin.users.index')}
                                className="block px-6 py-3 hover:bg-red-600 font-medium"
                                onClick={onClose}
                            >
                                👥 Управлять правами
                            </a>
                        </>
                    )}
                </ul>
            </nav>
        </aside>
    );
}
