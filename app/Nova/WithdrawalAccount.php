<?php

namespace App\Nova;

use Alexwenzel\DependencyContainer\DependencyContainer;
use App\Nova\Filters\ProviderType;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Stack;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class WithdrawalAccount extends Resource
{
    /**
     * The logical group associated with the resource.
     *
     * @var string
     */
    public static $group = 'User Management';

    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\WithdrawalAccount>
     */
    public static $model = \App\Models\WithdrawalAccount::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'name',
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            BelongsTo::make('User')->searchable(),
            Text::make('Name'),
            Select::make('Provider Type')->options([
                'crypto-wallet' => 'Crypto Wallet',
                'bank' => "Bank"
            ]),

            Stack::make('Details', $this->provider_type === 'bank' ?  [
                Text::make('Bank Name', 'provider_name'),
                Text::make('Bank Number', 'provider_id'),
                Text::make('Bank Address'),
                Text::make('Swift Code'),
            ] : [
                Text::make('Cryptocurrency', 'provider_name'),
                Text::make('Crypto Wallet Address', 'provider_id'),
            ])->onlyOnIndex(),

            DependencyContainer::make([
                Text::make('Bank Name', 'provider_name'),
                Text::make('Bank Number', 'provider_id'),
                Text::make('Bank Address'),
                Text::make('Swift Code'),
            ])->dependsOn('provider_type', 'bank'),

            DependencyContainer::make([
                Select::make('Select Cryptocurrency', 'provider_name')->options([
                    'btc' => 'Bitcoin',
                    'eth' => 'Ethereum',
                    'usdt' => 'Tether (USDT)',
                ]),
                Text::make('Crypto Wallet Address', 'provider_id'),
            ])->dependsOn('provider_type', 'crypto-wallet'),

        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function cards(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function filters(NovaRequest $request)
    {
        return [
            new ProviderType
        ];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function lenses(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function actions(NovaRequest $request)
    {
        return [];
    }
}
