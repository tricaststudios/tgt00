<?php

namespace App\Http\Controllers\User;

use App\Actions\User\UpdateWalletAddress;
use App\Http\Controllers\Controller;
use App\Http\Requests\WalletAddressStoreRequest;
use Illuminate\Http\RedirectResponse;

class WalletAddressController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(WalletAddressStoreRequest $request, UpdateWalletAddress $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        return back();
    }
}
