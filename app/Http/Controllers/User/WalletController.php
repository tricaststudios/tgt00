<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Response;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return inertia()->render('User/Wallet', [
            'wallets' => $request->user()->wallets,
            'collection' => $request->user()->transactions()->paginate(20)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Wallet $wallet): Response
    {
        //
    }
}
