<?php

namespace Database\Seeders;

use App\Actions\Wallet\AddBalance;
use App\Actions\Wallet\DeductBalance;
use App\Models\Deposit;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dummy = User::factory()
            // ->has(Deposit::factory()->count(40), 'deposits')
            ->create(['name' => 'dummy', 'email' => 'dummy@tgt.com', 'username' => 'dummy']);

        (new AddBalance)->handle($dummy->wallet(), $amount = 100000000, 'test-add', [
            'lang_code' => 'testing.wallet.add',
            'lang_params' => compact('amount')
        ]);
    }
}
