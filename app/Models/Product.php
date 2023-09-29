<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $guarded = ["id", "created_at", "updated_at"];

    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class,"type_id","id");
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class,"category_id","id");
    }
}
