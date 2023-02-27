<?php

namespace App\Http\Controllers\User;

use App\Actions\Wallet\Withdraw;
use App\Http\Controllers\Controller;
use App\Http\Requests\WithdrawalStoreRequest;
use App\Models\Withdrawal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class WithdrawalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return inertia()->render('User/Withdrawals', [
            'accounts' => $request->user()->withdrawalAccounts,
            'collection' => $request->user()->withdrawals()->with('withdrawalAccount')->paginate(20)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WithdrawalStoreRequest $request, Withdraw $action): RedirectResponse
    {
        $withdrawal = $action->handle($request->user(), $request->validated());

        return back();
    }
}
