<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Показать форму входа.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Обработка входа пользователя.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        // Подгружаем корзину из БД
        $cart = $user->cart ?? [];

        return redirect()
            ->intended(route('dashboard', absolute: false))
            ->with('cart', $cart); // Передаём в сессию, чтобы использовать при инициализации
    }

    /**
     * Выход из аккаунта.
     * Сохраняет корзину из frontend-запроса в БД.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $cart = $request->input('cart');

        if ($cart !== null && Auth::check() && is_array($cart)) {
            $user = Auth::user();
            $user->update(['cart' => $cart]);
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
