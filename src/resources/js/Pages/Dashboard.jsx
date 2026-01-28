import { useCart } from '@/Hooks/useCart';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard({ auth }) {
    const { items } = useCart(); // ✅ Получаем корзину

    const handleLogout = (e) => {
        e.preventDefault();
        console.log(items);
        router.post('/logout', {

            data: { cart: items },  // ✅ Отправляем корзину
            onFinish: () => {
                //  localStorage.removeItem('cart'); // Опционально
            }
        });
    };

    useEffect(() => {
        if (auth?.user) {
            toast.success(`Добро пожаловать, ${auth.user.name}!`);
        }
    }, [auth]);


    return (
        <AppLayout auth={auth}>
            <Head title="Личный кабинет" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-indigo-600 px-6 py-4 text-white">
                            <h2 className="text-2xl font-bold">Личный кабинет</h2>
                            <p className="text-indigo-100">Добро пожаловать, {auth.user?.name || 'Пользователь'}!</p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Информация о профиле</h3>
                                <div className="mt-3 bg-gray-50 rounded-lg p-4">
                                    <p><strong>Email:</strong> {auth.user?.email}</p>
                                    <p><strong>Роль:</strong> {auth.user?.role_id}</p>
                                    <p><strong>Аккаунт создан:</strong> {new Date(auth.user?.created_at || '').toLocaleDateString('ru-RU')}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/products"
                                    className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg text-center hover:bg-indigo-700 transition"
                                >
                                    Перейти в каталог
                                </a>
                                <form
                                    onSubmit={handleLogout}
                                    className="flex-1"
                                >
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                                    >
                                        Выйти из аккаунта
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
