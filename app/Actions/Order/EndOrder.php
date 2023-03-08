<?php

namespace App\Actions\Order;

use App\Models\Order;
use App\Models\SystemSetting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Lottery;

class EndOrder
{
    public function handle(Order $order)
    {
        return DB::transaction(function () use ($order) {
            $odds = SystemSetting::firstWhere('key', 'order_win_percentage')?->value ?? 10;

            $padding = SystemSetting::firstWhere('key', 'order_sell_amount_padding')?->value ?? 100;

            Lottery::odds($odds, 100)
                ->winner(fn () => (new MarkAsWin)
                    ->handle($order, [
                        'sell_amount' => $order->type == 'high'
                            ? rand($order->buy_amount + 1, $order->buy_amount + $padding)
                            : rand($order->buy_amount - 1, $order->buy_amount - $padding)
                    ]))
                ->loser(fn () => (new MarkAsLose)->handle($order, [
                    'sell_amount' => $order->type == 'high'
                        ? rand($order->buy_amount - 1, $order->buy_amount - $padding)
                        : rand($order->buy_amount + 1, $order->buy_amount + $padding)
                ]))
                ->choose();
        });
    }
}
