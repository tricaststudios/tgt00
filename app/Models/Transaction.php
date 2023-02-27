<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'wallet_id',

        'uuid',
        'type',
        'amount',
        'metadata',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'metadata' => Json::class,
    ];

    protected $appends = [
        'description'
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = Str::uuid();
            $model->user_id = Wallet::find($model->wallet_id)->user_id;
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

    /**
     * Get the user's first name.
     */
    protected function description(): Attribute
    {
        return Attribute::make(
            get: fn () => __($this->metadata['lang_code'], $this->metadata['lang_params']),
        );
    }

    /**
     * Get the user's first name.
     */
    protected function type(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => __(Str::of($value)->replace('-', ' ')->title()->toString()),
        );
    }
}
