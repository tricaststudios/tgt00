<?php

namespace App\Http\Controllers\User;

use App\Actions\Wallet\Deposit as WalletDepositAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\DepositStoreRequest;
use App\Models\Deposit;
use App\Models\DepositAccount;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class DepositController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $account = DepositAccount::where('is_active', true)->latest()->first();

        $account->media = $account->getMedia('account');

        return inertia()->render('User/Deposits', [
            'collection' => auth()->user()->deposits()->latest()->paginate(10),
            'account' => $account,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DepositStoreRequest $request, WalletDepositAction $action): RedirectResponse
    {
        $deposit = $action->handle($request->user(), $request->validated());

        session()->flash('succes', 'Succesfully requested deposit.');

        return back();
    }
}
