import { useCart } from '@/Hooks/useCart';
import { Link } from '@inertiajs/react';

export default function ProductLine({ product }) {
    const { addToCart } = useCart();

    return (
        <tr key={product.id}>
            <td>
                <Link href={`/products/${product.id}`} className="text-link">
                    {product.name}
                </Link>
            </td>
            <td>{product.type}</td>
            <td>${product.price}</td>
            <td>
                <div className="flex space-x-2">
                    <Link
                        href={`/products/${product.id}/edit`}
                        className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                    >
                        Edit
                    </Link>
                    <Link
                        href={`/products/${product.id}`}
                        className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200"
                    >
                        View
                    </Link>
                    <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        🛒 Добавить
                    </button>
                </div>
            </td>
        </tr>
    )

};

