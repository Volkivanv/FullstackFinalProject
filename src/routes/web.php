<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::resource('products', ProductController::class);



Route::get('/', function () {
    return inertia('Home', [
        'data' => [
            'user' => [
                'name' => 'Ivan',
                'lastname' => 'Volkov',
            ]
        ]
    ]);
});

Route::get('/about', function () {
    return inertia('About', [
        'data' => [
            'user' => [
                'name' => 'Ivan',
                'lastname' => 'Volkov',
            ]
        ]
    ]);
});

Route::get('/cart', function () {
    return inertia('Cart', [
        'data' => [
            'user' => [
                'name' => 'Ivan',
                'lastname' => 'Volkov',
            ]
        ]
    ]);
});
