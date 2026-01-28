<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function order(){
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    public function account(){
        return $this->belongsTo(Account::class, 'recipient_account_id', 'id');
    }

    public function paymentConfirmedBy(){
        return $this->belongsTo(User::class, 'payent_confirmed_by');
    }
}
