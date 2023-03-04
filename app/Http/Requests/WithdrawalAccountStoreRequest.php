<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class WithdrawalAccountStoreRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:254'],
            'provider_type' => ['required', 'max:254', 'in:crypto-wallet,bank'],
            'provider_name' => ['required', 'string', 'max:254'],
            'provider_id' => ['required', 'string', 'max:254'],
            'bank_address' => ['required_if:provider_type,bank', 'nullable', 'string', 'max:254'],
            'swift_code' => ['required_if:provider_type,bank', 'nullable', 'string', 'max:254'],
        ];
    }


    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (
                $this->user()->withdrawalAccounts()->where('provider_type', 'bank')->count() >= 1
                && $this->provider_type === 'bank'
            ) $validator->errors()->add('provider_type', 'Cannot add more bank withdrawal accounts');

            if (
                $this->provider_type === 'crypto-wallet'
                && !in_array($this->provider_name, ['btc', 'eth', 'usdt'])
            ) $validator->errors()->add('provider_name', 'You can only create BTC, ETH, USDT withdrawal account at the moment.');

            if (
                $this->provider_type === 'crypto-wallet'
                && $this->user()->withdrawalAccounts()->where('provider_name', $this->provider_name)->count() >= 1
            ) $validator->errors()->add('provider_name', "You can't create more than one {$this->provider_name} withdrawal account.");
        });
    }
}
