import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Cart() {
    // Здесь позже будет состояние корзины (из Inertia или localStorage)
    const cartItems = [] // Пример: [{ id: 1, name: 'Товар', price: 990, quantity: 1 }]

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AppLayout>
            <Head title="Корзина" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Ваша корзина</h1>

                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-600 text-lg">Ваша корзина пуста</p>
                            <a
                                href="/products"
                                className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Перейти в каталог
                            </a>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Товар</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Цена</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Кол-во</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Сумма</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {item.price} ₽
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                                                {item.price * item.quantity} ₽
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                                <span className="text-lg font-semibold">Итого: {total} ₽</span>
                                <button
                                    disabled
                                    className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-70"
                                >
                                    Оформить заказ
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
