<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Market;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MarketTickerController extends Controller
{
    public function __invoke(Market $market, Request $request)
    {
        $nurl = 'https://api.binance.com/api/v3/klines?symbol=' . Str::upper($market->symbol . 'USDT') . "&interval={$request->interval}&limit={$request->limit}";

        $response = Http::get($nurl);

        return response()->json(
            $response->collect()->toArray()
        );
    }
}
