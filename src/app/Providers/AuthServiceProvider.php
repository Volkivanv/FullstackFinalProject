<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',

        // \App\Models\Product::class => \App\Policies\ProductPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // 🔐 Определяем Gates (права доступа)
        Gate::define('access-admin', function ($user) {
            return $user->isAdmin();
        });

        Gate::define('manage-products', function ($user) {
            return $user->canManageProducts() ?? false;
        });

        Gate::define('assign-roles', function ($user) {
            return $user->canAssignRoles() ?? false;
        });

        // Другие gates при необходимости
    }
}
