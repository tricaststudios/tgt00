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
        if ($order->status !== 'pending')
            return;

        return DB::transaction(function () use ($order) {
            $odds = SystemSetting::firstWhere('key', 'order_win_percentage')?->value ?? 10;

            Lottery::odds($odds, 100)
                ->winner(fn () => (new MarkAsWin)->handle($order, ['sell_amount' => $order->getRandomSellAmount('win')]))
                ->loser(fn () => (new MarkAsLose)->handle($order, ['sell_amount' => $order->getRandomSellAmount('lose')]))
                ->choose();
        });
    }
}
