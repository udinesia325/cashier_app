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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable(false);
            $table->integer('price')->nullable(false);
            $table->string('image')->nullable();
            $table->unsignedBigInteger("type_id")->nullable(false);
            $table->unsignedBigInteger("category_id")->nullable(false);
            $table->timestamps();

            $table->foreign("type_id")->on("types")->references("id");
            $table->foreign("category_id")->on("categories")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
