<?php

namespace App\Actions\ActiveMiners;

use App\Actions\Wallet\AddBalance;
use App\Models\ActiveMiner;
use Illuminate\Support\Facades\DB;

class EndLifeCycle
{
    public function handle(ActiveMiner $miner)
    {
        return DB::transaction(function () use ($miner) {
            $miner->update(['status' => 'completed']);

            (new AddBalance)->handle($miner->user->wallet(), $miner->profit + $miner->amount, 'mining', [
                'lang_code' => 'transaction.investment.finished',
                'lang_params' => [
                    'profit' => $miner->profit,
                    'miner' => $miner->miner->name
                ]
            ]);
        });
    }
}
