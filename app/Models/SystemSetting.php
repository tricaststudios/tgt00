<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Nova\Actions\Actionable;

class SystemSetting extends Model
{
    use HasFactory, Actionable;

    public static function booted()
    {
        static::saving(function ($model) {
            if (auth()->check()) $model->user_id = auth()->id();
        });
    }
}
