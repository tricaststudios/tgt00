<?php

namespace App\Actions\Wallet;

use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class AddBalance
{
    public function handle(Wallet $wallet, int $amount, string $type, $metadata = []): Transaction
    {
        return DB::transaction(function () use ($wallet, $amount, $type, $metadata) {
            $metadata['prev_balance'] = $wallet->balance;
            $metadata['new_balance'] = $wallet->balance + $amount;

            $transaction = $wallet->transactions()->create(compact('amount', 'type', 'metadata'));

            $wallet->increment('balance', $amount);

            return $transaction;
        });
    }
}
