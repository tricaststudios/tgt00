<?php

namespace App\Jobs;

use App\Actions\ActiveMiners\EndMining as EndMiningAction;
use App\Models\ActiveMiner;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class EndMining implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public ActiveMiner $miner)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        (new EndMiningAction)->handle($this->miner);
    }
}
