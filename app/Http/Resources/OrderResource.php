<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user' => new UserResource($this->user),
            'cart' => new CartResource($this->cart),
            'transaction' => new TransactionResource($this->transaction),
            'status' => $this->status,
            'total_cost' => $this->total_cost,
            'delivery_channel' => $this->delivery_channel,
            'delivery_confirmed_by' => $this->delivery_confirmed_by,
            'delivered_by' => $this->delivered_by,
            'contact_number' => $this->contact_number,
            'delivery_address' => $this->delivery_address,
            'delivery_state' => $this->delivery_state,
            'created_at' => $this->created_at,
        ];
    }
}
