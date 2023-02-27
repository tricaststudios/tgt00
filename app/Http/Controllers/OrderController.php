<?php

namespace App\Http\Controllers;

use App\Models\Order;
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
            'collection' => $request->user()->orders()->latest()->paginate(20),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        return back();
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Order $order): Response
    // {
    //     //
    // }
}
