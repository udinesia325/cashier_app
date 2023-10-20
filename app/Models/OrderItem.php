<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderItem extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public $timestamps = true;
    public function product():HasMany{
        return $this->hasMany(Product::class,'id','product_id');
    }
}
