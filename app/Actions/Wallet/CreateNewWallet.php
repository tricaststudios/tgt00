<?php

namespace App\Actions\Wallet;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class CreateNewWallet
{
    public function handle(User $user, $type = 'main', $name = null): Wallet
    {
        return DB::transaction(function () use ($user, $type, $name) {
            return $user->wallets()->create(compact('name', 'type'));
        });
    }
}
