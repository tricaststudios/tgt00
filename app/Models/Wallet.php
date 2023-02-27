<?php

namespace App\Models;

use App\Actions\Wallet\Withdraw;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Wallet extends Model
{
    use HasFactory;

    const TYPES = [
        'main',
    ];

    protected $fillable = [
        'name',
        'type'
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $name = $model->name ?? Str::of($model->type)->replace('-', ' ')->toString();

            $model->name = Str::title($name);
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    protected function formattedBalance(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->balance / 1000000
        );
    }

    public function withdrawals()
    {
        return $this->hasMany(Withdrawal::class);
    }

    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn (int $value) => $value - $this->withdrawals()->where('status', 'pending')->sum('amount')
        );
    }
}
