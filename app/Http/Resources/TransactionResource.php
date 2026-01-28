<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'transaction_type'=>$this->transaction_type,
            'user'=>new UserResource($this->user) ,
            'order'=> new OrderMinimalResource($this->order),
            'account'=>new AccountResource($this->account),
            'amount'=>$this->amount,
            'evidence_of_payment'=>$this->evidence_of_payment,
            'sender_bank'=>$this->sender_bank,
            'sender_account_number'=>$this->sender_account_number,
            'sender_account_name'=>$this->sender_account_name,
            'transaction_status'=>$this->transaction_status,
            'transaction_channel'=>$this->transaction_channel,
            'payment_comfirmed_by'=>new UserResource($this->paymentConfirmedBy)
        ];
    }
}
