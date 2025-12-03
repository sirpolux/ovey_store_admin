<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    /** @use HasFactory<\Database\Factories\LogFactory> */
    use HasFactory;

    protected $fillable = [
        'action',
        'channel',
        'description',
        'meta',
        'user_id',
        'ip_address',
        'user_agent',
    ];  
}
