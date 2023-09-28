<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->uuid("product_id")->nullable(false);
            $table->unsignedBigInteger("order_id")->nullable(false);
            $table->integer("quantity")->nullable(false);
            $table->integer("subtotal")->nullable(false);
            $table->timestamps();

            $table->foreign("product_id")->on("products")->references("id");
            $table->foreign("order_id")->on("orders")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
