<?php

namespace App\Actions\Order;

use App\Models\Order;
use App\Models\SystemSetting;

class MarkAsLose
{
    public function handle(Order $order): Order
    {
        return tap($order)->update([
            'status' => 'lose',
            'sell_amount' => $order->getRandomSellAmount('lose')
        ]);
    }
}
