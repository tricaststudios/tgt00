<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WithdrawalAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'provider_id',
        'provider_name',
        'provider_type',
        'bank_address',
        'swift_code',
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->provider_id = Str::lower($model->provider_id);
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function withdrawal()
    {
        return $this->belongsTo(Withdrawal::class);
    }
}
