<?php

namespace App\Console\Commands;

use App\Actions\Settings\CreateNewSetting;
use Illuminate\Console\Command;

class SettingStoreCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'settings:make {key}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create system settings';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        (new CreateNewSetting)->handle(['key' => $this->argument('key')]);
    }
}
