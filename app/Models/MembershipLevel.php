<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class MembershipLevel extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->name = $name = Str::of($model->name)->replace('-', ' ')->title()->toString();
            $model->slug = Str::slug($name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->name);
        });
    }
}
