<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Deposit extends Model
{
    use HasFactory;

    protected $fillable = [
        'deposit_account_id',
        'wallet_id',
        'wallet_address',
        'status',
        'amount',
        'metadata',
        'remarks',

        'paid_at',
    ];

    protected $dates = [
        'paid_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'metadata' => Json::class,
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

    public function depositAccount()
    {
        return $this->belongsTo(DepositAccount::class);
    }
}
