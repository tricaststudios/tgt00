<?php

namespace App\Actions\User;

use App\Models\User;
use App\Models\WithdrawalAccount;
use Illuminate\Support\Facades\DB;

class StoreWithdrawalAccount
{
    public function handle(User $user, array $data): WithdrawalAccount
    {
        return DB::transaction(function () use ($user, $data) {
            return $user->withdrawalAccounts()->create($data);
        });
    }
}
