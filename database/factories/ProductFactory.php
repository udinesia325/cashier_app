<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->word(),
            "price" => fake()->numberBetween(50000,60000),
            "type_id"=>fake()->numberBetween(1,2),
            "category_id" => 1,
            "image" => "images/products/default.png"
        ];
    }
}
