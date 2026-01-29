<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SavingMinimalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'saving_reference' => $this->saving_reference,
            'amount_saved' => $this->amount_saved,
            'total' => $this->total,
            'balance' => $this->balance,
            'status' => $this->status,
            'user' =>new UserResource($this->user),
            'order' =>new OrderMinimalResource($this->order),
            'created_at' => $this->created_at,
        ];
    }
}
