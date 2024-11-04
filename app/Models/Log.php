<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Log extends Model
{
    use HasFactory, softDeletes;

    protected $fillable = ['user_id', 'ip_address', 'browser'];

    public function loggable(): MorphTo
    {
        return $this->morphTo();
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('id', 'like', '%' . $search . '%');
    }
}
