import { Link } from '@inertiajs/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


export default function Welcome({ auth, products }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Боковая панель */}
            <Sidebar userName={auth.user?.name} />

            {/* Основное содержимое */}
            <div className="flex-1 md:ml-64">
                <Header auth={auth} />

                <main className="p-6">
                    {/* Заголовок */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Добро пожаловать в <span className="text-indigo-600">Middle Market</span>
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Лучшие товары по доступным ценам
                        </p>
                    </div>

                    {/* Популярные товары */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Популярные товары</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.slice(0, 6).map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                        <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="text-lg font-bold text-indigo-600">
                                                {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
                                            </span>
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                                            >
                                                Подробнее
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Кнопка в каталог */}
                    <div className="mt-10 text-center">
                        <Link
                            href="/products"
                            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
