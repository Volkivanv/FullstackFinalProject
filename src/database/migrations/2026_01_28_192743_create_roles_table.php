<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // admin, employee, customer, guest
            $table->string('display_name');  // "Администратор", "Сотрудник"
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Вставим базовые роли
        DB::table('roles')->insert([
            ['name' => 'admin', 'display_name' => 'Администратор', 'description' => 'Полный доступ'],
            ['name' => 'employee', 'display_name' => 'Сотрудник', 'description' => 'Может управлять товарами'],
            ['name' => 'customer', 'display_name' => 'Клиент', 'description' => 'Покупает товары'],
            ['name' => 'guest', 'display_name' => 'Гость', 'description' => 'Неавторизованный пользователь'],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
