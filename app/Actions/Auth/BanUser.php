<?php

namespace App\Actions\Auth;

use App\Models\User;

class BanUser
{
    public function handle(User $user): User
    {
        $user->banned_at = now();

        $user->save();

        return $user;
    }
}
