<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Validator;

class WithdrawalStoreRequest extends FormRequest
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
            'pin' => ['required', 'string'],
            'account_id' => ['required', 'exists:withdrawal_accounts,id'],
            'amount' => ['required', 'numeric']
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (!Hash::check($this->pin, $this->user()->pin)) {
                $validator->errors()->add('pin', 'Withdrawal pin did not match with our records!');
            }

            if ($this->user()->wallet()->balance - ($this->amount * 1000000) < 0) {
                $validator->errors()->add('amount', 'Insufficient balance.');
            }
        });
    }
}
