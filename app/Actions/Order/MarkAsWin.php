<?php

namespace App\Actions\Order;

use App\Actions\Wallet\AddBalance;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class MarkAsWin
{
    public function handle(Order $order, array $data): Order
    {
        return DB::transaction(function () use ($order, $data) {
            $order->update(array_merge($data, [
                'status' => 'win'
            ]));

            $winAmount = $order->amount + (($order->win_percentage / 100) * $order->amount);

            (new AddBalance)->handle($order->user->wallet(), $winAmount, 'order', [
                'lang_code' => 'transaction.order.win',
                'lang_params' => [
                    'sell_amount' => $data['sell_amount']
                ]
            ]);

            return $order->fresh();
        });
    }
}
