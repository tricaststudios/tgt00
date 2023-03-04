<?php

namespace App\Actions\Withdrawal;

use App\Actions\Wallet\AddBalance;
use App\Actions\Wallet\DeductBalance;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\DB;

class MarkAsApproved
{
    public function handle(Withdrawal $withdrawal): Withdrawal
    {
        return DB::transaction(function () use ($withdrawal) {
            (new DeductBalance)->handle($withdrawal->wallet, $withdrawal->amount, 'withdraw', [
                'lang_code' => 'transaction.wallet.cashout',
                'lang_params' => [
                    'amount' => $withdrawal->amount / 1000000,
                    'approved_by' => auth()->id()
                ]
            ]);

            return tap($withdrawal)->update(['status' => 'approved', 'approved_at' => now()]);
        });
    }
}
