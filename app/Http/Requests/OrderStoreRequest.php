<?php

namespace App\Http\Requests;

use App\Models\Market;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class OrderStoreRequest extends FormRequest
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
            'market_id' => ['required', 'exists:markets,id'],
            'amount' => ['required', 'numeric'],
            'interval' => ['required', 'numeric'],
            'win_percentage' => ['required', 'numeric'],
            'type' => ['required', Rule::in(['high', 'low'])],
            'buy_amount' => ['required', 'numeric'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $market = Market::find($this->market_id);

            if ($this->amount < $market->min_amount)
                $validator->errors()->add('amount', 'Invalid amount cannot select below ' . number_format($market->min_amount) . ' USDT');

            if ($this->amount > $market->max_amount)
                $validator->errors()->add('amount', 'Invalid amount cannot select higher than ' . number_format($market->max_amount) . ' USDT');

            if ($this->user()->wallet()->balance - ($this->amount * 1000000) < 0)
                $validator->errors()->add('amount', 'Insufficient balance.');
        });
    }
}
