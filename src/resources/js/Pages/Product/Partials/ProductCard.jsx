import { useCart } from '@/Hooks/useCart';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
            <div className="p-6 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.type}</p>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-indigo-600 mt-4">{product.price} ₽</p>
            </div>
            <div className="p-6 border-t">
                <button
                    onClick={() => addToCart(product)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    В корзину
                </button>
            </div>
        </div>
    );
}
