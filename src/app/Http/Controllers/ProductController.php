<?php

namespace App\Http\Controllers;



use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Отобразить список товаров.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Создать новый товар.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    /**
     * Отобразить конкретный товар.
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        return response()->json($product);
    }

    /**
     * Обновить товар.
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    /**
     * Удалить товар.
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Товар удалён']);
    }
}
