<?php

namespace App\Actions\Deposit;

use App\Actions\Wallet\AddBalance;
use App\Models\Deposit;

class MarkAsDeclined
{
    public function handle(Deposit $deposit, $remarks)
    {
        $deposit->update(['status' => 'declined', 'remarks' => $remarks]);

        return $deposit->fresh();
    }
}
