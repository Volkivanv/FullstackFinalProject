<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'content',
        'rating',
        'product_id',
        'user_id',
    ];

    protected $with = ['user:id,name']; // загружаем имя пользователя

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
