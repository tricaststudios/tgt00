<?php

namespace App\Nova;

use App\Models\Session;
use App\Nova\Actions\AddBalance;
use App\Nova\Actions\AssignUserRole;
use App\Nova\Actions\BanAccount;
use App\Nova\Actions\DeductBalance;
use App\Nova\Actions\MembershipLevelUpdate;
use App\Nova\Actions\RemoveUserRole;
use App\Nova\Actions\UnbanAccount;
use App\Nova\Lenses\Officers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Laravel\Nova\Fields\Gravatar;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\HasManyThrough;
use Laravel\Nova\Fields\HasOne;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Panel;

class User extends Resource
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
     * @var class-string<\App\Models\User>
     */
    public static $model = \App\Models\User::class;

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
        'id', 'name', 'email',
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
            Gravatar::make()->maxWidth(50),

            Text::make('Name')
                ->sortable()
                ->rules('required', 'max:255'),

            Text::make('Rank', fn () => $this->resource->membershipLevel()->first()?->name ?? 'Basic')->onlyOnIndex(),

            Text::make('Email')
                ->sortable()
                ->rules('required', 'email', 'max:254')
                ->creationRules('unique:users,email')
                ->updateRules('unique:users,email,{{resourceId}}'),

            Text::make('Username')
                ->sortable()
                ->rules('required', 'max:254')
                ->creationRules('unique:users,username')
                ->updateRules('unique:users,username,{{resourceId}}'),

            Password::make('Password')
                ->onlyOnForms()
                ->creationRules('required', Rules\Password::defaults())
                ->updateRules('nullable', Rules\Password::defaults()),

            HasOne::make('Verification', 'verification', UserVerification::class),
            HasMany::make('Withdrawals'),
            HasMany::make('Wallets'),
            HasMany::make('Deposits'),
            HasMany::make('Withdrawal Accounts'),
            HasMany::make('Active Miners'),
            HasManyThrough::make('Transactions'),

            Panel::make('Tracking', [
                Text::make('Ip Address', fn () => Session::latest('last_activity')->firstWhere('user_id', $this->id)?->ip_address),
                Text::make('Device', fn () => Session::latest('last_activity')->firstWhere('user_id', $this->id)?->user_agent)->hideFromIndex(),
            ]),
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
        return [
            new Officers
        ];
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
            (new AddBalance)->canRun(fn () => true),
            (new DeductBalance)->canRun(fn () => true),

            (new AssignUserRole)->canRun(fn () => true),
            (new RemoveUserRole)->canRun(fn () => true),

            (new MembershipLevelUpdate)->canRun(fn () => true),
            (new BanAccount)->canRun(fn () => true),
            (new UnbanAccount)->canRun(fn () => true),
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
        return $query->where('id', '>', 2);
    }
}
