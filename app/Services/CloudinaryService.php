<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class CloudinaryService
{
    public function upload($file, string $folder = 'items')
    {
        $result = Cloudinary::upload(
            $file->getRealPath(),
            ['folder' => $folder]
        );

        return [
            'url' => $result->getSecurePath(),
            'public_id' => $result->getPublicId(),
        ];
    }

    public function delete(string $publicId): void
    {
        Cloudinary::destroy($publicId);
    }
    
}

