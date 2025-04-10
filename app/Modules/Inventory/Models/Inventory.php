<?php

namespace App\Modules\Inventory\Models;

use App\Modules\Product\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = ['product_id'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return empty($search) ? $query :
            $query->where('location', 'like', "%{$search}%");
    }

    public function scopeLowStock(Builder $query, int $value): Builder
    {
        return $query->where('qty', '<=', $value)->orderBy('qty');
    }
}
