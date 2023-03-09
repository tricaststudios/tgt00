<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Miner extends Resource
{
    /**
     * The logical group associated with the resource.
     *
     * @var string
     */
    public static $group = 'Mining';

    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Miner>
     */
    public static $model = \App\Models\Miner::class;

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
            ID::make()->sortable(),
            Text::make('Name'),
            Number::make('Min Amount (in USDT)', 'min_amount')->rules('required', 'numeric', 'lte:max_amount'),
            Number::make('Max Amount (in USDT)', 'max_amount')->rules('required', 'numeric', 'gte:min_amount'),
            Number::make('Lock Days')->rules('required', 'numeric', 'min:1'),
            Number::make('Daily Rate (eg: 10 = 10%)', 'daily_rate')->step(0.01)->rules('required', 'numeric'),
            Boolean::make('Is Active')->rules('sometimes', 'boolean'),
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
        return [];
    }

    /**
     * Return the location to redirect the user after update.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @param \App\Nova\Resource $resource
     * @return string
     */
    public static function redirectAfterUpdate(NovaRequest $request, $resource)
    {
        return '/resources/' . static::uriKey();
    }

    /**
     * Return the location to redirect the user after create.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @param \App\Nova\Resource $resource
     * @return string
     */
    public static function redirectAfterCreate(NovaRequest $request, $resource)
    {
        return '/resources/' . static::uriKey();
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
