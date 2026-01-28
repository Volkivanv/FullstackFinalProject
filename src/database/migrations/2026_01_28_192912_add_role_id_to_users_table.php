<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Шаг 1: добавляем колонку как nullable
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable();
        });

        // Шаг 2: получаем ID роли по умолчанию (например, 'customer')
        $defaultRoleId = DB::table('roles')->where('name', 'customer')->value('id');
        if (!$defaultRoleId) {
            throw new \Exception("Роль 'customer' не найдена. Выполните миграцию ролей.");
        }

        // Шаг 3: обновляем всех пользователей
        DB::statement("UPDATE users SET role_id = $defaultRoleId WHERE role_id IS NULL");

        // Шаг 4: делаем NOT NULL
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable(false)->change();
        });

        // Шаг 5: добавляем внешний ключ
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });
    }
};
