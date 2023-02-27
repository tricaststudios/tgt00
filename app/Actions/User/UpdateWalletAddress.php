<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UpdateWalletAddress
{
    public function handle(User $user, array $data): User
    {
        return DB::transaction(fn () => tap($user)->update(['wallet_address' => $data['wallet_address']]));
    }
}
