<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

// ✅ Один маршрут / через контроллер
Route::get('/', WelcomeController::class)->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ✅ Ресурсный маршрут для продуктов
    Route::resource('products', ProductController::class);

    Route::get('/cart', fn() => inertia('Cart'))->name('cart.index');
    Route::get('/about', fn() => inertia('About'))->name('about.index');
});

// ✅ API: сохранение корзины при закрытии вкладки
Route::post('/api/cart/save', function (Request $request) {
    if (Auth::check()) {
        $cart = $request->input('cart');

        if (is_array($cart)) {
            Auth::user()->update(['cart' => $cart]);
            return response()->json(['success' => true]);
        }
    }

    return response()->json(['success' => false], 401);
})->middleware('auth');

// Загрузка маршрутов аутентификации
require __DIR__ . '/auth.php';
