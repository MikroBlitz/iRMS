<?php

namespace App\Modules\User\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Modules\Customer\Models\Customer;
use App\Modules\Log\Models\Log;
use App\Modules\Message\Models\Contact;
use App\Modules\Message\Models\Message;
use App\Modules\User\Database\Factories\UserFactory;
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

    protected $fillable = ['id', 'first_name', 'middle_name', 'last_name', 'email', 'password', 'role'];

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

    protected static function newFactory(): UserFactory
    {
        return UserFactory::new();
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

    public function messages(): hasMany
    {
        return $this->hasMany(Message::class);
    }

    public function contacts(): hasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
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
