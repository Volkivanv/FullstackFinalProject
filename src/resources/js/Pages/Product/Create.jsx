import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import Header from '../Сomponents/Header';
import App from '@/Layouts/App';
import AppLayout from '@/Layouts/AppLayout';

export default function Create({auth}) {
    const [form, setForm] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/products', form, {
            onError: (validationErrors) => {
                setErrors(validationErrors);
            },
            onSuccess: () => {
                setErrors({});
            },
        });
    };

    return (

            <AppLayout auth={auth}>

                <h1 className="title">Add New Product</h1>

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
                            Save Product
                        </button>
                        <Link href="/products" className="text-link">
                            Cancel
                        </Link>
                    </div>
                </form>

            </AppLayout>

    );
}
