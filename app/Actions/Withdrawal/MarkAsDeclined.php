<?php

namespace App\Actions\Withdrawal;

use App\Models\Withdrawal;

class MarkAsDeclined
{
    public function handle(Withdrawal $withdrawal, $remarks)
    {
        $withdrawal->update(['status' => 'declined', 'remarks' => $remarks]);

        return $withdrawal->fresh();
    }
}
