<?php

namespace App\Actions\Security;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UpdatePin
{
    public function handle(User $user, array $data)
    {
        return DB::transaction(fn () => $user->fill(['pin' => Hash::make($data['pin'])])->save());
    }
}
