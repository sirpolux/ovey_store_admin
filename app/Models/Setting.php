<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /** @use HasFactory<\Database\Factories\SettingFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'type',
        'max',
        'min',
        'min_cost',
        'max_cost',
        'active',
        'added_by',
    ];
}
