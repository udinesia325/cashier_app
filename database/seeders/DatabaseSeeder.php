<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Type;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'role' => 'admin'
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Test Staff',
            'email' => 'staff@gmail.com',
            'role' => 'staff'
        ]);
        Type::create([
            "name" => "makanan"
        ]);
        Type::create([
            "name" => "minuman"
        ]);
        Category::create([
            "name" => "Nasi Goreng"
        ]);
    }
}
