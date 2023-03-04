<?php

namespace App\Actions\Wallet;

use App\Models\Deposit as Model;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class Deposit
{
    public function handle(User $user, array $data): Model
    {
        return DB::transaction(fn () => $user->deposits()->create([
            'deposit_account_id' => $data['deposit_account_id'],
            'wallet_id' => $user->wallet()->id,
            'wallet_address' => $data['wallet_address'],
            'amount' => $data['amount'] * 1000000
        ]));
    }
}
