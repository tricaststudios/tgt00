<?php

namespace App\Actions\Wallet;

use App\Models\Withdrawal as Model;
use App\Models\User;
use App\Models\WithdrawalAccount;
use Illuminate\Support\Facades\DB;

class Withdraw
{
    public function handle(User $user, array $data): Model
    {
        $account = WithdrawalAccount::find($data['account_id']);

        return DB::transaction(fn () => $user->withdrawals()->create([
            'withdrawal_account_id' => $data['account_id'],
            'wallet_id' => $user->wallet()->id,
            'provider_type' => $account->provider_type,
            'provider_name' => $account->provider_name,
            'provider_id' => $account->provider_id,
            'bank_address' => $account->bank_address,
            'swift_code' => $account->swift_code,
            'amount' => $data['amount'] * 1000000
        ]));
    }
}
