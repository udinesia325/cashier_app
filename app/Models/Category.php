<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ["name","type_id"];

    public function product(): HasMany
    {
        return  $this->hasMany(Product::class);
    }
    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class);
    }
}
