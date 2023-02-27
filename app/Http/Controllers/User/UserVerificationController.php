<?php

namespace App\Http\Controllers\User;

use App\Actions\User\StoreVerification;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserVerificationStoreRequest;
use App\Models\UserVerification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class UserVerificationController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(UserVerificationStoreRequest $request, StoreVerification $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        session()->flash('success', "succesfully requested account verification");

        return back();
    }
}
