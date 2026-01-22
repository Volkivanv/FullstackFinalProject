<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;


class WelcomeController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('Welcome', [
            'products' => Product::orderBy('created_at', 'desc')->take(10)->get(),
        ]);
    }
}
