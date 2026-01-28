import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function AddReviewForm({ productId }) {
    const [form, setForm] = useState({
        content: '',
        rating: 5,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/products/${productId}/reviews`, form);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Оставить отзыв</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Оценка
                </label>
                <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{'⭐'.repeat(num)} ({num})</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Отзыв
                </label>
                <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows="4"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                Отправить отзыв
            </button>
        </form>
    );
}
