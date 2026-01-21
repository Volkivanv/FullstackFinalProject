import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import Header from '../components/Header';
import App from '@/Layouts/App';

export default function Edit({ product, auth }) {
    const [form, setForm] = useState({
        name: product.name,
        type: product.type,
        description: product.description,
        price: product.price,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/products/${product.id}`, form, {
            onError: (validationErrors) => {
                setErrors(validationErrors);
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            Inertia.delete(`/products/${product.id}`);
        }
    };

    return (
            <App auth={auth}>
            <main className="max-w-screen-lg mx-auto p-6">
                <h1 className="title">Edit Product</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block mb-1">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.type && <div className="error">{errors.type}</div>}
                    </div>

                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.price && <div className="error">{errors.price}</div>}
                    </div>

                    <div className="flex space-x-4">
                        <button type="submit" className="primary-btn">
                            Update Product
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <Link href="/products" className="text-link">
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
            </App>

    );
}
