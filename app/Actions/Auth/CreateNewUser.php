<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Stevebauman\Location\Facades\Location;

class CreateNewUser
{
    public function handle(array $data, string $ip = null): User
    {
        $country = Location::get($ip);

        return DB::transaction(fn () => User::create(array_merge($data, [
            'password' => Hash::make($data['password']),
            'country' => !$country ? null : $country->countryName
        ])));
    }
}
