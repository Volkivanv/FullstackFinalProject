<?php

namespace App\Providers;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;




class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share('productTypes', fn() => Product::pluck('type')->unique()->sort()->values());

        Inertia::share('auth.user', function () {

            $user = Auth::user();

            if ($user) {
                return array_merge($user->toArray(), [
                    'cart' => $user->cart ?? [],
                    'role_name' => $user->role?->name,
                    'can_manage_products' => $user->canManageProducts(),
                    'can_assign_roles' => $user->canAssignRoles(),
                ]);
            }

            return null;
        });
    }
}
