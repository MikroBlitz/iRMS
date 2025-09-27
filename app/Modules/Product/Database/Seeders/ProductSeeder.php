<?php

namespace App\Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [];
        $categoryIds = DB::table('categories')->pluck('id')->toArray();

        // Sample Filipino grocery products
        $sampleProducts = [
            'Lucky Me Pancit Canton',
            'Safeguard Soap',
            'Bear Brand Powdered Milk',
            'Nescafe Classic Coffee',
            'Milo Chocolate Drink',
            'SkyFlakes Crackers',
            'Century Tuna',
            'Argentina Corned Beef',
            '555 Sardines',
            'Mang Tomas All Purpose Sauce',
            'Silver Swan Soy Sauce',
            'Datu Puti Vinegar',
            'UFC Banana Ketchup',
            'San Miguel Beer Pale Pilsen',
            'Coke Regular 1.5L',
            'Royal Tru-Orange 1.5L',
            'Sprite 1.5L',
            'Wilkins Distilled Water 1L',
            'Jack ’n Jill Piattos',
            'Chippy BBQ',
            'Presto Peanut Butter Sandwich',
            'Hansel Mocha Sandwich',
            'Cream-O Cookies',
            'Oishi Prawn Crackers',
            'Rebisco Crackers',
            'Fudgee Barr',
            'Nova Chips',
            'Yakult',
            'Selecta Ice Cream (Tub)',
            'Purefoods Hotdog',
            'Tender Juicy Hotdog',
            'Magnolia Chicken',
            'Maya Pancake Mix',
            'White King Champorado Mix',
            'Knorr Sinigang Mix',
            'Knorr Cubes',
            'Lucky Me Cup Noodles',
            'Joy Dishwashing Liquid',
            'Surf Detergent Powder',
            'Tide Detergent',
            'Downy Fabric Conditioner',
            'Colgate Toothpaste',
            'Closeup Toothpaste',
            'Palmolive Shampoo',
            'Head & Shoulders Shampoo',
            'Cream Silk Conditioner',
            'Johnson’s Baby Powder',
            'Safeguard Liquid Soap',
            'Listerine Mouthwash',
            'Hapee Toothpaste',
            'Enchanted Corn Chips',
        ];

        // Duplicate until we reach 100 products
        while (count($sampleProducts) < 100) {
            $sampleProducts = array_merge($sampleProducts, $sampleProducts);
        }

        $sampleProducts = array_slice($sampleProducts, 0, 100);

        foreach ($sampleProducts as $name) {
            $products[] = [
                'name' => $name,
                'image' => null,
                'description' => "Sample product: {$name}",
                'sku' => uniqid('SKU-'),
                'price' => rand(10, 500), // realistic grocery price
                'po_unit' => 'pcs',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('products')->upsert($products, ['name'], ['sku', 'updated_at']);
    }
}
