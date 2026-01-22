<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Style extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'thumbnail_url',
        'price_credits',
        'secret_prompt',
        'openrouter_model_id',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'price_credits' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Hidden fields - không trả về cho user
     */
    protected $hidden = [
        'secret_prompt',
        'openrouter_model_id',
    ];

    /**
     * Scope: Chỉ lấy styles đang active
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Relationship: Style có nhiều generations
     */
    public function generations(): HasMany
    {
        return $this->hasMany(Generation::class);
    }
}
