<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSettingRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'max' => 'nullable|numeric',
            'min' => 'nullable|numeric',
            'min_cost' => 'nullable|numeric',
            'max_cost' => 'nullable|numeric',
        ];
    }
}
