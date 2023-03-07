<?php

namespace App\Actions\Settings;

use App\Models\SystemSetting;
use Illuminate\Support\Facades\DB;

class CreateNewSetting
{
    public function handle(array $data)
    {
        return DB::transaction(fn () => SystemSetting::create($data));
    }
}
