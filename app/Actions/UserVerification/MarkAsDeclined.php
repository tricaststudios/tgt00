<?php

namespace App\Actions\UserVerification;

use App\Models\Deposit;

class MarkAsDeclined
{
    public function handle(Deposit $deposit, $remarks)
    {
        return $deposit->update(['status' => 'declined', 'remarks' => $remarks]);
    }
}
