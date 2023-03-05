<?php

namespace App\Nova\Actions;

use App\Actions\Order\MarkAsWin as MarkOrderAsWinAction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Http\Requests\NovaRequest;

class MarkOrderAsWin extends Action
{
    use InteractsWithQueue, Queueable;

    /**
     * Perform the action on the given models.
     *
     * @param  \Laravel\Nova\Fields\ActionFields  $fields
     * @param  \Illuminate\Support\Collection  $models
     * @return mixed
     */
    public function handle(ActionFields $fields, Collection $models)
    {
        $action = new MarkOrderAsWinAction;

        DB::transaction(fn () => $models->reject(fn ($model) => $model->status !== 'pending')->each(fn ($model) => $action->handle($model, [
            'sell_amount' => $fields->sell_amount
        ])));
    }

    /**
     * Get the fields available on the action.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            Number::make('Sell Amount')->rules('required', 'numeric')
                ->step('0.01'),
        ];
    }
}
