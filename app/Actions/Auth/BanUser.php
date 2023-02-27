<?php

use App\Models\User;

class BanUser
{
    public function handle(User $user)
    {
        $user->banned_at = now();
        $user->save();
    }
}
