<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Miner extends Model
{
    use HasFactory;

    protected $fillable = [
        'status'
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });

        static::saving(function ($model) {
            $model->slug = Str::slug($model->name);
        });
    }

    public function activeMiners()
    {
        return $this->hasMany(ActiveMiner::class);
    }
}
