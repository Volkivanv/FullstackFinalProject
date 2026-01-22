import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Show({ product, auth }) {
    return (
        <AppLayout auth={auth}>
            <h1 className="title">{product.name}</h1>
            <dl className="space-y-4">
                <div>
                    <dt className="font-semibold">Type</dt>
                    <dd>{product.type}</dd>
                </div>
                <div>
                    <dt className="font-semibold">Price</dt>
                    <dd>${product.price}</dd>
                </div>
                <div>
                    <dt className="font-semibold">Description</dt>
                    <dd className="whitespace-pre-line">{product.description}</dd>
                </div>
            </dl>
            <div className="mt-6 flex space-x-4">
                <Link href={`/products/${product.id}/edit`} className="primary-btn">
                    Edit
                </Link>
                <Link href="/products" className="text-link">Back</Link>
            </div>

        </AppLayout>
    );
}
