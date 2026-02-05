import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ product, reviews, canAddReview, auth }) {
    const [localReviews, setLocalReviews] = useState(reviews.data);

    const handleDelete = (reviewId) => {
        if (confirm('Вы уверены, что хотите удалить отзыв?')) {
            router.delete(route('reviews.destroy', reviewId), {
                onSuccess: () => {
                    setLocalReviews((prev) => prev.filter(r => r.id !== reviewId));
                },
            });
        }
    };

    const handleAddReview = (newReview) => {
        setLocalReviews((prev) => [newReview, ...prev]);
    };

    return (
        <AppLayout auth={auth}>
            <div className="py-12">
                {/* Основной блок товара */}
                <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Левая часть — изображение */}
                        <div className="flex justify-center">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-64 md:h-80 object-cover rounded-lg border"
                                onError={(e) => {
                                    e.target.src = '/img/default-product.png'; // Заглушка
                                }}
                            />
                        </div>

                        {/* Правая часть — информация */}
                        <div>
                            {/* Заголовок товара */}
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                            {/* Рейтинг */}
                            <div className="mt-4">
                                <p className="text-lg text-gray-700">
                                    Рейтинг: <strong>⭐ {product.average_rating || 0}</strong>
                                    {' '}
                                    <span className="text-sm text-gray-500">
                                        ({reviews.total} отзыв{reviews.total === 1 ? '' : 'ов'})
                                    </span>
                                </p>
                            </div>

                            {/* Детали товара */}
                            <dl className="space-y-6 mt-8">
                                <div>
                                    <dt className="font-semibold text-gray-700">Тип</dt>
                                    <dd className="text-gray-900">{product.type}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-gray-700">Цена</dt>
                                    <dd className="text-xl font-bold text-indigo-600">${product.price}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-gray-700">Описание</dt>
                                    <dd className="whitespace-pre-line text-gray-900">{product.description}</dd>
                                </div>
                            </dl>

                            {/* Кнопки */}
                            <div className="mt-8 flex space-x-4">
                                {auth?.user?.is_admin && (
                                    <Link
                                        href={`/products/${product.id}/edit`}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Редактировать
                                    </Link>
                                )}
                                <Link
                                    href="/products"
                                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                >
                                    Назад
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Отзывы */}
                <div className="max-w-5xl mx-auto mt-12 bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Отзывы</h2>

                    {/* Список отзывов */}
                    {localReviews.length > 0 ? (
                        <ul className="space-y-6">
                            {localReviews.map((review) => (
                                <li key={review.id} className="border-b pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <strong className="text-gray-900">{review.user.name}</strong>
                                            <div className="text-sm text-gray-500">
                                                {'⭐'.repeat(review.rating)}
                                            </div>
                                        </div>
                                        {review.can_delete && (
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(review.id)}
                                                className="text-red-600 text-sm hover:text-red-800"
                                            >
                                                Удалить
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-700 mt-2">{review.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Пока нет отзывов.</p>
                    )}

                    {/* Пагинация */}
                    {reviews.links && reviews.links.length > 3 && (
                        <div className="flex justify-center mt-6 space-x-1">
                            {reviews.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 text-sm rounded ${link.active
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Форма добавления отзыва */}
                    {canAddReview && (
                        <AddReviewForm productId={product.id} onAdd={handleAddReview} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

// Вложенный компонент формы
function AddReviewForm({ productId, onAdd }) {
    const [form, setForm] = useState({
        content: '',
        rating: 5,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/products/${productId}/reviews`, form, {
            onSuccess: (page) => {
                const newReview = {
                    ...form,
                    user: { name: page.props.auth.user.name },
                    id: Date.now(), // временный ID до перезагрузки
                };
                onAdd(newReview);
                setForm({ content: '', rating: 5 });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Оставить отзыв</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Оценка
                </label>
                <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                Отправить отзыв
            </button>
        </form>
    );
}
