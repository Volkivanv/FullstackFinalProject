import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Edit({ product, auth }) {
    const [form, setForm] = useState({
        name: product.name,
        type: product.type,
        description: product.description,
        price: product.price,
        image: null, // ✅ Будет файл
    });

    const [preview, setPreview] = useState(product.image_url); // ✅ URL текущего изображения
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' && files.length > 0) {
            const file = files[0];
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file)); // Показываем превью
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', form.name);
        data.append('type', form.type);
        data.append('description', form.description);
        data.append('price', form.price);
        if (form.image) {
            data.append('image', form.image);
        }

        // Отправляем как multipart/form-data
        Inertia.put(`/products/${product.id}`, data, {
            forceFormData: true, // ✅ Обязательно для файлов
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
        <AppLayout auth={auth}>
            <h1 className="title">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Превью изображения */}
                <div className="mb-4">
                    <label className="block mb-1">Current Image</label>
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                    />
                </div>

                {/* Загрузка нового изображения */}
                <div>
                    <label className="block mb-1">Upload New Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.image && <div className="error">{errors.image}</div>}
                </div>

                {/* Остальные поля */}
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
        </AppLayout>
    );
}
