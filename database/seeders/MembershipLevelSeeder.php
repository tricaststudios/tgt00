<?php

namespace Database\Seeders;

use App\Models\MembershipLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MembershipLevelSeeder extends Seeder
{
    protected $levels = [
        'vip',
        'general',
        'bronze',
        'silver',
        'gold',
        'platinum',
        'vip-platinum',
        'vvip-platinum',
    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->levels as $key => $name) {
            MembershipLevel::create(compact('name'));
        }
    }
}
