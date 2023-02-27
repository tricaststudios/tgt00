<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SecurityController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia()->render('User/Security',[
            'hasPin' => (bool) $request->user()->pin
        ]);
    }
}
