<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('products', \App\Http\Controllers\ProductController::class);
    Route::get('/cart', fn() => inertia('Cart'))->name('cart.index');
    Route::get('/about', fn() => inertia('About'))->name('about.index');
});


Route::get('/', WelcomeController::class)->name('home');

Route::post('/api/cart/save', function (Request $request) {
    if (Auth::check()) {
        $cart = $request->input('cart');

        if (is_array($cart)) {
            Auth::user()->update(['cart' => $cart]);
            return response()->json(['success' => true]);
        }
    }

    return response()->json(['success' => false], 401);
})->middleware('auth')->withoutCsrfProtection(); // ⚠️ Без CSRF — иначе не пройдёт



require __DIR__ . '/auth.php';
