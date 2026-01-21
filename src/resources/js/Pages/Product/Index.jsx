import { Link } from '@inertiajs/react';
import App from '@/Layouts/App';

export default function Index({ products, auth }) {
    return (
        <App auth={auth}>

            <main className="max-w-screen-lg mx-auto p-6">
                <h1 className="title">Products</h1>
                <div className="flex justify-end mb-4">
                    <Link href="/products/create" className="primary-btn">
                        Add Product
                    </Link>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </App>
    );
}
