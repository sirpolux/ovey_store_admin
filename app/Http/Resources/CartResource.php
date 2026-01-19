<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
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
            'item_count' => $this->item_count,
            'total_cost' => $this->total_cost,
            //'item=>'=>new ItemMinimalResource($this->cartItems->item),
            'cart_items' => CartItemResource::collection($this->cartItems),
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
