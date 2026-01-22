<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MinioService
{
    /**
     * Upload file lên MinIO và trả về URL
     */
    public function uploadFile(UploadedFile $file, string $folder = 'uploads'): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = "{$folder}/{$filename}";

        Storage::disk('minio')->put($path, file_get_contents($file));

        return $this->getPublicUrl($path);
    }

    /**
     * Upload file từ content (base64 hoặc binary)
     */
    public function uploadFromContent(string $content, string $extension, string $folder = 'generated'): string
    {
        $filename = Str::uuid() . '.' . $extension;
        $path = "{$folder}/{$filename}";

        Storage::disk('minio')->put($path, $content);

        return $this->getPublicUrl($path);
    }

    /**
     * Lấy public URL của file
     */
    public function getPublicUrl(string $path): string
    {
        // Trả về URL trực tiếp từ MinIO
        $endpoint = config('filesystems.disks.minio.endpoint');
        $bucket = config('filesystems.disks.minio.bucket');

        return "{$endpoint}/{$bucket}/{$path}";
    }

    /**
     * Xóa file
     */
    public function deleteFile(string $path): bool
    {
        return Storage::disk('minio')->delete($path);
    }

    /**
     * Kiểm tra file tồn tại
     */
    public function exists(string $path): bool
    {
        return Storage::disk('minio')->exists($path);
    }
}
