<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    /** @use HasFactory<\Database\Factories\UploadFactory> */
    use HasFactory;

    protected $fillable = [
        'item_id',
        'transaction_id',
        'file_name',
        'file_path',
        'file_type',
        'is_primary',
        'position',
        'uploaded_by',
    ];
}
