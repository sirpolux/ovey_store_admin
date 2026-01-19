<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemMinimalResource extends JsonResource
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
            'status' => $this->status,
            'item_name' => $this->item_name,
            'price' => $this->price,  
            'uploads' => UploadResource::collection($this->uploads),
            'quantity' => $this->quantity,
       
        ];
    }
}
