<?php

namespace App\Http\Controllers\User;

use App\Actions\Order\CreateNewOrder;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderStoreRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return inertia()->render('User/Orders', [
            'collection' => $request->user()->orders()->with('market')->latest()->paginate(20),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderStoreRequest $request, CreateNewOrder $action): RedirectResponse
    {
        $action->handle($request->user(), $request->validated());

        return back();
    }
}
