<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DepositStoreRequest extends FormRequest
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
            'wallet_address' => ['required', 'string'],
            'amount' => ['required', 'numeric'],
            'deposit_account_id' => ['required', 'numeric', 'exists:deposit_accounts,id']
        ];
    }
}
