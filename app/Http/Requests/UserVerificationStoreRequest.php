<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserVerificationStoreRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:254'],
            'last_name' => ['required', 'string', 'max:254'],
            'mobile_number' => ['required', 'numeric'],
            'identification_type' => ['required', 'string'],
            'identification_value' => ['required', 'string'],
            'attachments' => ['required', 'array'],
            'attachments.*' => ['image'],
        ];
    }
}
