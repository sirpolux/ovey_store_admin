<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;
    protected $fillable = [
        'order_number',
        'customer_id',
        'status',
        'total_amount',
        'payment_status',
        'shipping_address',
        'billing_address',
        'placed_at',
    ];


    public function customer()
    {
        return $this->belongsTo(User::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }   

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
