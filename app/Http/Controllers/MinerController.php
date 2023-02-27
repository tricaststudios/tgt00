<?php

namespace App\Http\Controllers;

use App\Models\Miner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class MinerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return inertia()->render('Miners/Index', [
            'collection' => Miner::where('is_active', true)->paginate(100)
        ]);
    }
}
