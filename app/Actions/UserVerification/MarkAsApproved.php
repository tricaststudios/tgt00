<?php

namespace App\Actions\UserVerification;

use App\Models\User;
use App\Models\UserVerification;

class MarkAsApproved
{
    public function handle(UserVerification $user)
    {
        return $user->update(['status', 'approved', 'approved_at' => now()]);
    }
}
