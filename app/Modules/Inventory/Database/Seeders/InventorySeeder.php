<?php

namespace App\Modules\Inventory\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $inventories = [
            [
                'id' => 1,
                'product_id' => 1,
                'qty' => 19,
                'location' => 'Baguio',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'product_id' => 2,
                'qty' => 16,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'product_id' => 3,
                'qty' => 13,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'product_id' => 4,
                'qty' => 24,
                'location' => 'Cebu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'product_id' => 5,
                'qty' => 11,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'product_id' => 6,
                'qty' => 12,
                'location' => 'Davao',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'product_id' => 7,
                'qty' => 16,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'product_id' => 8,
                'qty' => 20,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'product_id' => 9,
                'qty' => 60,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'product_id' => 10,
                'qty' => 15,
                'location' => 'Leyte',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'product_id' => 11,
                'qty' => 14,
                'location' => 'Cebu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'product_id' => 12,
                'qty' => 10,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 13,
                'product_id' => 1,
                'qty' => 25,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 14,
                'product_id' => 2,
                'qty' => 10,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'product_id' => 3,
                'qty' => 5,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 16,
                'product_id' => 4,
                'qty' => 100,
                'location' => 'Leyte',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('inventories')->insert($inventories);
    }
}
