<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'rating' => 'required|integer|between:1,5',
        ]);

        $review = Review::updateOrCreate(
            ['user_id' => auth()->id(), 'product_id' => $productId],
            [
                'content' => $request->content,
                'rating' => $request->rating,
            ]
        );

        return back()->with('success', 'Отзыв добавлен!');
    }

    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);
        $review->delete();

        return back()->with('success', 'Отзыв удалён');
    }
}
