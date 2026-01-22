import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { useCart } from '@/Hooks/useCart';

export default function Cart() {
    const { items, total, totalItems, updateQuantity, removeFromCart } = useCart();

    if (items.length === 0) {
        return (
            <AppLayout>
                <Head title="Корзина" />
                <div className="py-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Корзина пуста</h2>
                        <p className="text-gray-600 mt-2">Добавьте товары из каталога</p>
                        <Link
                            href="/products"
                            className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Корзина" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Ваша корзина ({totalItems} шт.)</h1>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Товар</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Цена</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Кол-во</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Сумма</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действие</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {item.price} ₽
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                className="w-16 px-2 py-1 border rounded text-center"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                                            {item.price * item.quantity} ₽
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                            <span className="text-lg font-semibold">Итого: {total} ₽</span>
                            <button
                                // Здесь можно добавить оформление заказа
                                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-70"
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
