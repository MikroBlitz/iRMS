<?php

namespace App\Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $products = [];
        $productNames = [];
        $categoryIds = DB::table('categories')->pluck('id')->toArray();

        for ($i = 0; $i < 6000; $i++) {
            $uniqueName = $faker->word . ' ' . $faker->randomLetter . $faker->randomNumber(2);

            while (in_array($uniqueName, $productNames)) {
                $uniqueName = $faker->word . ' ' . $faker->randomLetter . $faker->randomNumber(2);
            }

            $productNames[] = $uniqueName;

            $products[] = [
                'name' => $uniqueName,
                'image' => null,
                'description' => $faker->sentence(),
                'sku' => $faker->unique()->randomNumber(6),
                'price' => $faker->randomFloat(2, 1000, 50000),
                'category_id' => $faker->randomElement($categoryIds),
                'po_unit' => $this->getRandomUnit(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('products')->insert($products);
    }

    /**
     * Get a random unit from a predefined list.
     */
    private function getRandomUnit(): string
    {
        $units = ['pcs', 'kg', 'g', 'm', 'cm', 'box', 'set'];
        return $units[array_rand($units)];
    }
}
