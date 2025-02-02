<?php

namespace App\Modules\Inventory\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $inventories = [];
        $product_ids = DB::table('products')->pluck('id');

        foreach ($product_ids as $product_id) {
            $inventories[] = [
                'product_id' => $product_id,
                'qty' => rand(20, 50),
                'location' => $this->getRandomLocation(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('inventories')->insert($inventories);
    }

    /**
     * Get a random location from a predefined list.
     */
    private function getRandomLocation(): string
    {
        $locations = ['Baguio', 'Manila', 'Cebu', 'Davao', 'Leyte', 'Warehouse'];
        return $locations[array_rand($locations)];
    }
}
