<?php

namespace App\Nova;

use App\Nova\Actions\MarkDepositAsApproved;
use App\Nova\Actions\MarkDepositAsDeclined;
use App\Nova\Filters\Status;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Badge;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Http\Requests\NovaRequest;

class Deposit extends Resource
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
     * @var class-string<\App\Models\Deposit>
     */
    public static $model = \App\Models\Deposit::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'user.username';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'user.username',
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
            BelongsTo::make('User'),
            Text::make('TX #', 'uuid'),
            Badge::make('Status')->map([
                'pending' => 'warning',
                'approved' => 'success',
                'declined' => 'danger'
            ]),
            Text::make('Wallet Address'),
            Text::make('Amount', fn () => number_format($this->amount / 1000000, 4) . ' USDT'),
            Textarea::make('Remarks'),
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
            new Status
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
        return [
            (new MarkDepositAsApproved)->canRun(fn() => true),
            (new MarkDepositAsDeclined)->canRun(fn() => true),
        ];
    }
}
