<?php

namespace App\Nova;

use App\Nova\Actions\MarkWithdrawalAsApproved;
use App\Nova\Actions\MarkWithdrawalAsDeclined;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Badge;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Withdrawal extends Resource
{
    /**
     * The logical group associated with the resource.
     *
     * @var string
     */
    public static $group = 'Financing';

    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Withdrawal>
     */
    public static $model = \App\Models\Withdrawal::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'uuid';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'uuid',
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
            ID::make()->sortable(),
            BelongsTo::make('User'),
            BelongsTo::make('Wallet')->hideFromIndex(),
            BelongsTo::make('Account', 'withdrawalAccount', WithdrawalAccount::class),
            Badge::make('Status')->map([
                'pending' => 'warning',
                'approved' => 'success',
                'declined' => 'danger'
            ]),
            Text::make('Provider Type')->hideFromIndex(),
            Text::make('Provider Name'),
            Text::make('Provider ID')->hideFromIndex(),
            Text::make('Bank Address')->hideFromIndex(),
            Text::make('Swift Code')->hideFromIndex(),
            Text::make('Amount', fn () => number_format($this->amount / 1000000, 4) . ' USDT'),
            Text::make('Remarks')->hideFromIndex(),
            DateTime::make('Request Date', 'created_at')
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
        return [];
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
        return [
            (new MarkWithdrawalAsApproved)->canRun(fn () => true),
            (new MarkWithdrawalAsDeclined)->canRun(fn () => true),
        ];
    }
}
