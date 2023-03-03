<?php

namespace App\Http\Controllers;

use App\Models\Market;
use Illuminate\Support\Facades\Http;
use Inertia\Response;

class MarketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $markets = Market::where('is_active', true)->get();

        $nurl = 'https://api.binance.com/api/v3/ticker?symbols=' . $markets->pluck('symbol')->values()->map(fn ($symbol) => strtoupper($symbol) . 'USDT');

        $response = Http::get($nurl)->collect();

        $markets->map(fn ($market) => $market->stats = $response->firstWhere('symbol', strtoupper($market->symbol) . 'USDT'));

        return inertia()->render('Markets/Index', [
            'collection' => fn () => $markets
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Market $market): Response
    {
        return inertia()->render('Markets/Show', compact('market'));
    }
}
