<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Review;

class ProductController extends Controller
{
    public function index()
    {
        // $products = Product::all();
        // return inertia('Product/Index', compact('products'));
        $query = Product::query();

        // 🔍 Поиск по названию и описанию
        if (request('search')) {
            $search = request('search');
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        // 🧩 Фильтр по типу
        if (request('type')) {
            $query->where('type', request('type'));
        }

        // 💰 Фильтр по цене (от)
        if (request('price_from')) {
            $query->where('price', '>=', request('price_from'));
        }

        // 💰 Фильтр по цене (до)
        if (request('price_to')) {
            $query->where('price', '<=', request('price_to'));
        }

        $products = $query->paginate(12)->withQueryString();

        return inertia(
            'Product/Index',
            [
                'products' => $products,
                'filters' => request()->only(
                    ['search', 'type', 'price_from', 'price_to']
                ),
            ]
        );
    }

    public function create()
    {
        return inertia('Product/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        Product::create($validated);

        return redirect()->route('products.index');
    }


    public function show(Product $product)
    {
        $product->loadCount('reviews');
        $reviews = $product->reviews()->with('user:id,name')->paginate(5);

        return inertia('Product/Show', [
            'product' => $product->append('average_rating'),
            'reviews' => $reviews,
            'canAddReview' => auth()->check() &&
                !$product->reviews()->where('user_id', auth()->id())->exists(),
        ]);
    }

    public function edit(Product $product)
    {
        return inertia('Product/Edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product->update($validated);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
