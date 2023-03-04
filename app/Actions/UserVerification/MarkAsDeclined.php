<?php

namespace App\Actions\UserVerification;

use App\Models\UserVerification;

class MarkAsDeclined
{
    public function handle(UserVerification $verification, string $remarks)
    {
        return $verification->update(['status' => 'declined', 'remarks' => $remarks]);
    }
}
