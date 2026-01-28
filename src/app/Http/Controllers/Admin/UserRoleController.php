<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    //
    public function index()
    {
        Gate::authorize('access-admin');

        $users = User::with('role')->select('id', 'name', 'email', 'role_id')->get();
        $roles = Role::orderBy('name')->get(); // все роли

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user)
    {
      //  Gate::authorize('access-admin');

        $request->validate([
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        if ($user->id === auth()->id()) {
            return back()->withErrors(['role' => 'Нельзя изменить свою роль.']);
        }

        $user->update(['role_id' => $request->role_id]);

        return redirect()->route('admin.users.index')->with('success', "Роль пользователя «{$user->name}» обновлена.");
    }
}
