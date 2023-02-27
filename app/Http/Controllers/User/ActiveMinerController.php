<?php

namespace App\Http\Controllers\User;

use App\Actions\User\StoreActiveMiner;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActiveMinerStoreRequest;
use App\Models\ActiveMiner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ActiveMinerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return inertia()->render('User/Miners', [
            'collection' => $request->user()->activeMiners()->with('miner')->paginate(100)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ActiveMinerStoreRequest $request, StoreActiveMiner $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        return back();
    }
}
