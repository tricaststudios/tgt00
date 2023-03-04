<?php

namespace App\Nova\Actions;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Http\Requests\NovaRequest;
use App\Actions\UserVerification\MarkAsApproved as ModelAction;
use App\Actions\Wallet\AddBalance;
use Illuminate\Support\Facades\DB;

class MarkDepositAsApproved extends Action
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
        $approveAction = new ModelAction;
        $addBalanceAction = new AddBalance;

        DB::transaction(function () use ($approveAction, $models, $addBalanceAction) {
            $models->each(function ($model) use ($approveAction, $addBalanceAction) {
                $approveAction->handle($model);

                $addBalanceAction->handle($model->user->wallet(), $model->amount, 'cashin', [
                    'lang_code' => 'transaction.wallet.cashin',
                    'lang_params' => [
                        'amount' => $model->amount,
                        'approved_by' => auth()->id()
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
        return [];
    }
}
