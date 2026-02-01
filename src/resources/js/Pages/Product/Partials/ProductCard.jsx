import { useCart } from '@/Hooks/useCart';
import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    return (
        <Link
            href={route('products.show', product.id)}
            className="block group"
            onClick={(e) => {
                // Если клик по кнопке — не переходить
                if (e.target.closest('.add-to-cart-btn')) {
                    e.preventDefault();
                }
            }}
        >
            <div className="bg-white overflow-hidden shadow rounded-lg flex flex-col h-full transition-all duration-300 transform
                      hover:shadow-xl hover:scale-105 hover:rounded-xl">

                {/* Изображение */}
                <div className="relative overflow-hidden">
                    <img
                        // src={`/storage/${product.image}`}
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.target.src = '/img/default-product.png';
                        }}
                    />
                </div>

                {/* Контент */}
                <div className="p-6 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{product.type}</p>
                    <p className="text-gray-700 mt-2 line-clamp-2">{product.description}</p>
                    <p className="text-lg font-bold text-indigo-600 mt-4">{product.price} ₽</p>
                </div>

                {/* Кнопка — без перехода */}
                <div className="p-6 border-t bg-gray-50">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // 🔥 Останавливаем всплытие — чтобы не сработал Link
                            addToCart(product);
                        }}
                        className="add-to-cart-btn w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        В корзину
                    </button>
                </div>
            </div>
        </Link>
    );
}
