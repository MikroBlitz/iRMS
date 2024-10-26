<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, softDeletes;

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
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();
        static::saving(function ($user) {
            $user->name = self::name($user);
        });
    }

    /**
     * Compose the complete name of the user.
     *
     * @param User $user
     *
     * @return string
     */
    protected static function name(User $user): string
    {
        $obj = [
            $user->first_name,
            $user->middle_name,
            $user->last_name,
        ];

        return implode(' ', array_filter(array_map('trim', $obj)));
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return empty($search) ? $query : $query->where('name', 'like', "%{$search}%");
    }

    public function scopeFilterCustomer(Builder $query, ?string $filter): Builder
    {
        return empty($filter) ? $query : $query->where('role', 0, "%{$filter}%");
    }
}
