<?php

namespace App\Actions\Auth;

use App\Models\User;

class UnbanUser
{
    public function handle(User $user): User
    {
        $user->banned_at = null;

        $user->save();

        return $user;
    }
}
