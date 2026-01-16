<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return inertia('Home', [
        'name' => 'Ivan',
    ]);
});

Route::get('/about', function () {
    return inertia('About');
});

Route::get('/cart', function () {
    return inertia('Cart');
});
