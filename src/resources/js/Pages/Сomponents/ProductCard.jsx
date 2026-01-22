import { useCart } from '@/Hooks/useCart';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                        {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        🛒 Добавить
                    </button>
                </div>
            </div>
        </div>
    );
}
