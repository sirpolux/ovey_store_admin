<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    protected $fillable = [
        'item_id',
        'item_name',
        'item_description',
        'manufacturer',
        'quantity',
        'price',
        'status',
        'created_by',
        'updated_by',
    ];


    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function featureSpecifications(){
        return $this->hasMany(FeatureSpecification::class, 'item_id');
    }
}
