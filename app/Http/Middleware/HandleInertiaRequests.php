<?php

namespace App\Http\Middleware;

use App\Models\SystemSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user()?->load(['roles' => fn ($q) => $q->select('name')]),
                'wallet' => $request->user()?->wallet()
            ],
            'env' => [
                'api_url' => config('app.url') . '/api'
            ],
            'binance' => [
                'api_key' => env('BINANCE_API_KEY')
            ],
            'settings' => SystemSetting::whereNotIn('key', [
                'order_win_percentage'
            ])->get()->pluck('value', 'key')->toArray(),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
