<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = ['id'];

    public function category(): HasMany
    {
        return  $this->hasMany(Category::class);
    }
    
}
