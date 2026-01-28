export default function Review({ review, canDelete, onDelete }) {
    const handleDelete = () => {
        if (confirm('Удалить отзыв?')) {
            axios.delete(route('reviews.destroy', review.id))
                .then(() => onDelete(review.id))
                .catch(err => alert('Ошибка'));
        }
    };

    return (
        <div className="border-b pb-4 mb-4">
            <div className="flex justify-between">
                <strong>{review.user.name}</strong>
                <span>{'⭐'.repeat(review.rating)}</span>
            </div>
            <p className="text-gray-700 mt-1">{review.content}</p>
            {canDelete && (
                <button
                    onClick={handleDelete}
                    className="text-red-600 text-sm mt-2"
                >
                    Удалить
                </button>
            )}
        </div>
    );
}
