<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superadmin = User::create([
            'name' => 'Superadmin',
            'username' => 'superadmin',
            'email' => 'superadmin@admin.com',
            'password' => bcrypt(env('SUPER_ADMIN_PASSWORD', 'password')),
        ]);

        $superadmin->assignRole('super-admin');

        $admin = User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt(env('ADMIN_PASSWORD', 'password')),
        ]);

        $admin->assignRole('admin');

        $admin = User::create([
            'name' => 'Owner TGT',
            'username' => 'tgt11',
            'email' => 'owner@tgt.com',
            'password' => bcrypt('password'),
        ]);

        $admin->assignRole('owner');
    }
}
