<?php

namespace App\Actions\Order;

use App\Actions\Wallet\AddBalance;
use App\Models\Order;
use App\Models\SystemSetting;
use Illuminate\Support\Facades\DB;

class MarkAsWin
{
    public function handle(Order $order): Order
    {
        return DB::transaction(function () use ($order) {
            $sellAmount = $order->getRandomSellAmount('win');

            $order->update(['status' => 'win', 'sell_amount' => $sellAmount]);

            $winAmount = $order->amount + (($order->win_percentage / 100) * $order->amount);

            (new AddBalance)->handle($order->user->wallet(), $winAmount, 'order', [
                'lang_code' => 'transaction.order.win',
                'lang_params' => [
                    'sell_amount' => $sellAmount,
                    'order_uuid' => $order->uuid
                ]
            ]);

            return $order->fresh();
        });
    }
}
