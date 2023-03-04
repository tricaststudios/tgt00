<?php

namespace App\Nova\Actions;

use App\Actions\Wallet\AddBalance as WalletAddBalance;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Http\Requests\NovaRequest;

class AddBalance extends Action
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
        $action = new WalletAddBalance;

        DB::transaction(function () use ($models, $fields, $action) {
            $models->each(fn ($model) => $action->handle($model->wallet(), $fields->amount * 1000000, 'admin-transfer', [
                'lang_code' => 'transaction.wallet.admin.add-balance',
                'lang_params' => [
                    'amount' => $fields->amount,
                    'performed_by' => auth()->id()
                ]
            ]));
        });
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
            Number::make('Amount')->rules('required', 'numeric'),
        ];
    }
}
