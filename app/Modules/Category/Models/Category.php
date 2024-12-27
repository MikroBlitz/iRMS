<?php

namespace App\Modules\Category\Models;

use App\Modules\Product\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, softDeletes;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return empty($search) ? $query :
            $query->where('name', 'like', "%{$search}%");
    }
}
