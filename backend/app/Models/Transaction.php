<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'credits',
        'description',
        'reference_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'credits' => 'decimal:2',
    ];

    /**
     * Relationship: Transaction thuộc về một User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope: Transactions nạp tiền
     */
    public function scopeTopups($query)
    {
        return $query->where('type', 'topup');
    }

    /**
     * Scope: Transactions sử dụng xu
     */
    public function scopeUsages($query)
    {
        return $query->where('type', 'usage');
    }
}
