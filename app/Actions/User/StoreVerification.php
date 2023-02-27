<?php

namespace App\Actions\User;

use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Support\Facades\DB;

class StoreVerification
{
    public function handle(User $user, array $data): UserVerification
    {
        return DB::transaction(function () use ($user, $data) {
            $verification = $user->verification()->updateOrCreate([
                'user_id' => $user->id
            ], [
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'mobile_number' => $data['mobile_number'],
                'identification_type' => $data['identification_type'],
                'identification_value' => $data['identification_value'],
            ]);

            $verification->clearMediaCollection('attachments');

            foreach ($data['attachments'] as $key => $file) {
                $verification->addMedia($file)->toMediaCollection('attachments');
            }

            return $verification;
        });
    }
}
