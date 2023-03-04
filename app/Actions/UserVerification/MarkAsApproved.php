<?php

namespace App\Actions\UserVerification;

use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Support\Facades\DB;

class MarkAsApproved
{
    public function handle(UserVerification $verification)
    {
        return DB::transaction(function () use ($verification) {
            $verification->update(['status' => 'approved', 'approved_at' => now()]);
        });
    }
}
