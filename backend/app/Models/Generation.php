<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Generation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'style_id',
        'original_image_url',
        'result_image_url',
        'credits_used',
        'status',
        'error_message',
    ];

    protected $casts = [
        'credits_used' => 'decimal:2',
    ];

    /**
     * Relationship: Generation thuộc về một User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: Generation sử dụng một Style
     */
    public function style(): BelongsTo
    {
        return $this->belongsTo(Style::class);
    }

    /**
     * Scope: Generations đang xử lý
     */
    public function scopeProcessing($query)
    {
        return $query->whereIn('status', ['pending', 'processing']);
    }

    /**
     * Scope: Generations đã hoàn thành
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
