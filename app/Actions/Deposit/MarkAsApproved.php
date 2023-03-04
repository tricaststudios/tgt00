<?php

namespace App\Actions\Deposit;

use App\Models\User;
use App\Models\Deposit;

class MarkAsApproved
{
    public function handle(Deposit $deposit)
    {
        return $deposit->update(['status' => 'approved', 'approved_at' => now()]);
    }
}
