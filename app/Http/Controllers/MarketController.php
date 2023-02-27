<?php

namespace App\Http\Controllers;

use App\Models\Market;
use Inertia\Response;

class MarketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return inertia()->render('Markets/Index', [
            'collection' => Market::where('is_active', true)->get()
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
