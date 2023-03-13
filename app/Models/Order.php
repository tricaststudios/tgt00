<?php

namespace App\Models;

use App\Jobs\EndOrder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'market_id',
        'status',
        'type',
        'interval',
        'win_percentage',
        'buy_amount',
        'sell_amount',
        'amount'
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = Str::uuid();
            $model->status = 'pending';
        });

        static::created(function ($model) {
            EndOrder::dispatch($model)->delay($model->created_at->addSeconds($model->interval));
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function market()
    {
        return $this->belongsTo(Market::class);
    }

    public function getRandomSellAmount(string $status): string
    {
        $padding = SystemSetting::firstWhere('key', 'order_sell_amount_padding')?->value ?? 100;

        $buyAmount = $this->buy_amount;

        $dataAmount = explode('.', $buyAmount);
        $prefix = (int)$dataAmount[0];
        $suffix = $dataAmount[1];

        $newAmount = 0;

        if ($status === 'win')
            $newAmount =  $this->type == 'high' ? rand($prefix + 1, $prefix + $padding) : rand($prefix - 1, $prefix - $padding);

        if ($status === 'lose')
            $newAmount =  $this->type == 'high' ? rand($prefix - 1, $prefix - $padding) : rand($prefix + 1, $prefix + $padding);

        return (string)$newAmount . '.' . (string) rand(1000, 9999);
    }
}
