<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Withdrawal extends Model
{
    use HasFactory;

    protected $fillable = [
        'withdrawal_account_id',
        'wallet_id',
        'status',
        'provider_type',
        'provider_name',
        'provider_id',
        'bank_address',
        'swift_code',
        'amount',
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = Str::uuid();
            $model->status = 'pending';
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public function withdrawalAccount()
    {
        return $this->belongsTo(WithdrawalAccount::class);
    }
}
