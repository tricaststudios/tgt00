<?php

namespace App\Http\Controllers\User;

use App\Actions\User\StoreWithdrawalAccount;
use App\Http\Controllers\Controller;
use App\Http\Requests\WithdrawalAccountStoreRequest;
use App\Models\WithdrawalAddress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class WithdrawalAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return inertia()->render('User/WithdrawalAccounts', [
            'collection' => $request->user()->withdrawalAccounts()->paginate(10)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WithdrawalAccountStoreRequest $request, StoreWithdrawalAccount $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        session()->flash('success', 'Created new withdrawal address.');

        return back();
    }
}
