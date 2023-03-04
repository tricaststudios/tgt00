<?php

namespace App\Actions\Deposit;

use App\Actions\Wallet\AddBalance;
use App\Models\Deposit;
use Illuminate\Support\Facades\DB;

class MarkAsApproved
{
    public function handle(Deposit $deposit): Deposit
    {
        return DB::transaction(function () use ($deposit) {
            (new AddBalance)->handle($deposit->wallet, $deposit->amount, 'deposit', [
                'lang_code' => 'transaction.wallet.cashin',
                'lang_params' => [
                    'amount' => $deposit->amount / 1000000,
                    'approved_by' => auth()->id()
                ]
            ]);

            return tap($deposit)->update(['status' => 'approved', 'approved_at' => now()]);
        });
    }
}
