<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeatureSpecification extends Model
{
    /** @use HasFactory<\Database\Factories\FeatureSpecificationFactory> */
    use HasFactory;
    protected $fillable = [
        'item_id',
        'feature_name',
    ];
}
