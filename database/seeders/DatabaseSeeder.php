<?php

namespace Database\Seeders;

use App\Modules\Category\Database\Seeders\CategorySeeder;
use App\Modules\Inventory\Database\Seeders\InventorySeeder;
use App\Modules\Product\Database\Seeders\ProductSeeder;
use App\Modules\User\Database\Seeders\UserSeeder;
use App\Modules\User\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Super',
            'middle_name' => 'X',
            'last_name' => 'Admin',
            'role' => 1,
            'email' => 'admin@mail.com',
            'password' => bcrypt('admin1234'),
        ]);
        $this->call(UserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(InventorySeeder::class);
    }
}
