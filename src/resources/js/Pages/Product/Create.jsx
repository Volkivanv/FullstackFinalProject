import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Create({ auth }) {
    const [form, setForm] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
        image: null, // ✅ Хранит файл
    });

    const [preview, setPreview] = useState(null); // ✅ Превью изображения
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

        Inertia.post('/products', data, {
            forceFormData: true, // ✅ Обязательно для файлов
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
                {/* Превью изображения */}
                {preview ? (
                    <div className="mb-4">
                        <label className="block mb-1">Image Preview</label>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded border"
                        />
                    </div>
                ) : (
                    <div className="mb-4">
                        <label className="block mb-1">Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.image && <div className="error">{errors.image}</div>}
                    </div>
                )}

                {/* Или отдельное поле */}
                {!preview && (
                    <div className="mb-4">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.image && <div className="error">{errors.image}</div>}
                    </div>
                )}

                {/* Название */}
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

                {/* Тип */}
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

                {/* Описание */}
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

                {/* Цена */}
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

                {/* Кнопки */}
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
