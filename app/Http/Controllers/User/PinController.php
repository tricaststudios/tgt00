<?php

namespace App\Http\Controllers\User;

use App\Actions\Security\UpdatePin;
use App\Http\Controllers\Controller;
use App\Http\Requests\PinStoreRequest;
use App\Http\Requests\PinUpdateRequest;
use Illuminate\Http\RedirectResponse;

class PinController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(PinStoreRequest $request, UpdatePin $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        session()->flash('success', 'Successfully created new pin!');

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PinUpdateRequest $request, UpdatePin $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        session()->flash('success', 'Successfully updated pin!');

        return back();
    }
}
