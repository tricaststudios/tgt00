<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ActiveMiner extends Model
{
    use HasFactory;

    protected $fillable = [
        'miner_id',
        'amount',
        'profit',
        'ends_at'
    ];

    protected $casts = [
        'ends_at' => 'datetime',
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function miner()
    {
        return $this->belongsTo(Miner::class);
    }
}
