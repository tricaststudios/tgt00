<?php

namespace Database\Seeders;

use App\Models\SystemSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SystemSetting::create(['key' => 'order_win_percentage']);
        SystemSetting::create(['key' => 'order_sell_amount_padding']);
        SystemSetting::create(['key' => 'telegram_url', 'value' => 'https://t.me/hzcustomersupport']);
    }
}
