<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'credits',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'credits' => 'decimal:2',
    ];

    /**
     * Relationship: User có nhiều generations
     */
    public function generations(): HasMany
    {
        return $this->hasMany(Generation::class);
    }

    /**
     * Relationship: User có nhiều transactions
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Kiểm tra user có đủ xu không
     */
    public function hasEnoughCredits(int|float $amount): bool
    {
        return $this->credits >= $amount;
    }

    /**
     * Trừ xu
     */
    public function deductCredits(int|float $amount): bool
    {
        if (!$this->hasEnoughCredits($amount)) {
            return false;
        }

        $this->credits -= $amount;
        $this->save();

        return true;
    }

    /**
     * Cộng xu
     */
    public function addCredits(int|float $amount): void
    {
        $this->credits += $amount;
        $this->save();
    }
}
