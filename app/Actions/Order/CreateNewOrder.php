<?php

namespace App\Actions\Order;

use App\Actions\Wallet\DeductBalance;
use App\Jobs\EndOrder;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateNewOrder
{
    public function handle(User $user, array $data)
    {
        return DB::transaction(function () use ($user, $data) {
            $order = $user->orders()->create(array_merge($data, [
                'amount' => $amount = $data['amount'] * 1000000
            ]));

            (new DeductBalance)->handle($user->wallet(), $amount, 'order', [
                'lang_code' => 'transaction.orders.store',
                'lang_params' => [
                    'amount' => $data['amount'],
                    'buy_amount' => $data['buy_amount'],
                    'type' => $data['type'],
                    'interval' => $data['interval'],
                    'win_percentage' => $data['win_percentage'],
                ]
            ]);

            EndOrder::dispatch($order)->delay($order->created_at->addSeconds($data['interval']));
        });
    }
}
