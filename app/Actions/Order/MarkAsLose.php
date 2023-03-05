<?php

namespace App\Actions\Order;

use App\Models\Order;

class MarkAsLose
{
    public function handle(Order $order, array $data): Order
    {
        return tap($order)->update(array_merge($data, [
            'status' => 'lose'
        ]));
    }
}
