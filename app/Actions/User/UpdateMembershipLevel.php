<?php

namespace App\Actions\User;

use App\Models\MembershipLevel;
use App\Models\User;

class UpdateMembershipLevel
{
    public function handle(User $user, int $level)
    {
        return $user->membershipLevel()->sync($level);
    }
}
