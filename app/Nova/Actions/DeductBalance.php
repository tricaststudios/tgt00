<?php

namespace App\Nova\Actions;

use App\Actions\Wallet\DeductBalance as WalletDeductBalance;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Http\Requests\NovaRequest;
use MaxMind\Exception\InsufficientFundsException;

class DeductBalance extends Action
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
        $action = new WalletDeductBalance;


        DB::transaction(function () use ($models, $fields, $action) {
            $models->each(function ($model) use ($fields, $action) {
                throw_if($model->wallet()->balance - ($fields->amount * 1000000) < 0, new Exception('Insufficient funds.'));
                $action->handle($model->wallet(), $fields->amount * 1000000, 'admin-deduction', [
                    'lang_code' => 'transaction.wallet.admin.deduct-balance',
                    'lang_params' => [
                        'amount' => $fields->amount,
                        'performed_by' => auth()->id()
                    ]
                ]);
            });
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
