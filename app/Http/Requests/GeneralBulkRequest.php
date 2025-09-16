<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GeneralBulkRequest extends FormRequest {
    public function rules() {
        return [
            'ids' => ['required', 'array', 'min:1'],
        ];
    }
}
