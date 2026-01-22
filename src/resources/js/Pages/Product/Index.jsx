import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import ProductLine from '../Сomponents/ProductLine';


export default function Index({ products, auth }) {
    return (
        <AppLayout auth={auth}>
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
                        <ProductLine key={product.id} product={product} />
                    ))}
                </tbody>
            </table>
        </AppLayout>
    );
}
