<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            SystemSettingSeeder::class,
            MembershipLevelSeeder::class,
            MarketSeeder::class,
            RoleSeeder::class,
            AdminSeeder::class
        ]);

        if (app('env') != 'production') {
            $this->call(DummySeeder::class);
        }
    }
}
