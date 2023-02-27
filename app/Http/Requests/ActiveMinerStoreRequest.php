<?php

namespace App\Http\Requests;

use App\Models\Miner;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ActiveMinerStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'miner_id' => ['required', 'numeric', 'exists:miners,id'],
            'amount' => ['required', 'numeric']
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $miner = Miner::find($this->miner_id);

            if ($this->amount < $miner->min_amount) {
                $validator->errors()->add('amount', "Min. amount of {$miner->min_amount}.00 USDT");
            }

            if ($this->amount > $miner->max_amount) {
                $validator->errors()->add('amount', "Max. amount of {$miner->max_amount}.00 USDT");
            }

            if (($this->user()->wallet()->balance) - ($this->amount * 1000000) < 0) {
                $validator->errors()->add('amount', 'Insufficient balance.');
            }
        });
    }
}
