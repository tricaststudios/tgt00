<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class RoleSeeder extends Seeder
{
    protected $roles = [
        'super-admin',
        'admin',
        'officer',
        'owner',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->roles as $key => $value) {
            Artisan::call('permission:create-role ' . $value);
        }
    }
}
