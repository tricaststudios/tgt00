<?php

namespace App\Actions\User;

use App\Actions\Wallet\DeductBalance;
use App\Jobs\EndMining;
use App\Models\Miner;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class StoreActiveMiner
{
    public function handle(User $user, array $data)
    {
        $miner = Miner::find($data['miner_id']);

        DB::transaction(function () use ($user, $data, $miner) {
            $miner = $user->activeMiners()->create([
                'miner_id' => $miner->id,
                'amount' => $amount = ($data['amount'] * 1000000),
                'profit' => ((($miner->daily_rate / 100) * $data['amount']) * $miner->lock_days) * 1000000,
                'ends_at' => $endsAt = now()->addDays($miner->lock_days),
            ]);

            EndMining::dispatch($miner)->delay(now()->addDays($endsAt));

            (new DeductBalance)->handle($user->wallet(), $amount, 'mining', [
                'lang_code' => 'transaction.investment.store',
                'lang_params' => ['miner' => $miner->uuid]
            ]);
        });
    }
}
