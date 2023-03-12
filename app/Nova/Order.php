<?php

namespace App\Nova;

use App\Nova\Actions\MarkOrderAsLose;
use App\Nova\Actions\MarkOrderAsWin;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Badge;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Currency;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Order extends Resource
{
    /**
     * The logical group associated with the resource.
     *
     * @var string
     */
    public static $group = 'Market Management';

    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Order>
     */
    public static $model = \App\Models\Order::class;

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
            BelongsTo::make('User'),
            Badge::make('Status')->map([
                'pending' => 'warning',
                'win' => 'success',
                'lose' => 'danger'
            ]),
            Badge::make('Type')->map([
                'high' => 'success',
                'low' => 'danger',
            ])->label(function ($value) {
                return $value === 'high' ? 'UP' : 'FALL';
            }),
            Text::make('Interval', fn () => $this->interval . 's'),
            Text::make('Scale', fn () => $this->win_percentage . '%'),
            Text::make('Amount', fn () => number_format($this->amount / 1000000, 4) . ' USDT'),
            Currency::make('Buy Amount'),
            Currency::make('Sell Amount'),
            DateTime::make('Order Date', 'created_at'),
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
            (new MarkOrderAsWin)->canRun(fn() => true),
            (new MarkOrderAsLose)->canRun(fn() => true),
        ];
    }

    /**
     * Build an "index" query for the given resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function indexQuery(NovaRequest $request, $query)
    {
        if ($request->user()->hasRole('super-admin'))
            return $query;

        if ($request->user()->hasRole('admin'))
            return $query->where('user_id', '>', 1);

        return $query->where('user_id', '>', 2);
    }
}
