<?php

namespace App\Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $products = [
            [
                'name' => 'RTX 4080',
                'image' => 'https://ecommerce.datablitz.com.ph/cdn/shop/files/1000_2_59b06c3d-c04f-4694-9cac-12a2861c93c1.jpg?v=1706766599',
                'description' => NULL,
                'sku' => '123234',
                'price' => 80000.95,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Intel Core i9 14900K',
                'image' => 'https://m.media-amazon.com/images/I/61vAL6P8pFL.jpg',
                'description' => 'asdasdasdsad',
                'sku' => '345345',
                'price' => 40000.46,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ryzen 9 5900X',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxkbCfM6Qp71WsX0pl4oVHhFKR4BPqqrT-tw&s',
                'description' => NULL,
                'sku' => '567567',
                'price' => 35000.33,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'GTX 1080 TI',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaRDnhlsQEVXLKJs00M_OTX152d_TsoNmSIQ&s',
                'description' => NULL,
                'sku' => '78978556',
                'price' => 9999.98,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'iPhone 15 Pro Max',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgauK4-gT2tjjJfjlINsOWkBWjQmngh60Pcg&s',
                'description' => 'Latest iPhone',
                'sku' => '213',
                'price' => 50000.55,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Razer Blade 15 2024',
                'image' => 'https://i5.walmartimages.com/asr/59134559-f79d-4387-9097-37a9dbc717c5.5c78d9e102403986f81b2659c3f301d1.png',
                'description' => 'HIgh end laptop CPU: RTX 4090 RAM: 32GB Base SSD: NVME 2TB',
                'sku' => '23',
                'price' => 105000.97,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'RTX 4090 Super 24GB',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHyPYLSnz9bxVJcrPf46MYEXtn6WMItCzDg&s',
                'description' => NULL,
                'sku' => '54654645',
                'price' => 70000.34,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Razer Viper Pro',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-XrwPpk6yU6awj1kX0nBmBQegPHxN1fKTMg&s',
                'description' => NULL,
                'sku' => '67678678',
                'price' => 8700.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alienware x17',
                'image' => 'https://images-cdn.ubuy.co.in/64e041f8dae1c06d453a4f26-2023-alienware-x17-r2-gaming-laptop.jpg',
                'description' => 'asdasd',
                'sku' => '456456',
                'price' => 140000.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Razer Tartarus Chroma',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM85ZTn0ETQbnxmZZqXhrVAhfqwvZIRwzHEg&s',
                'description' => 'Gaming perp',
                'sku' => '567546',
                'price' => 6500.56,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Starlink',
                'image' => 'https://images.summitmedia-digital.com/spotph/images/2023/07/13/starlink-promp-1689218924.png',
                'description' => NULL,
                'sku' => '234234',
                'price' => 14000.95,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'RAM 32GB',
                'image' => 'https://miro.medium.com/v2/resize:fit:1061/0*6k9X6LPiM4XKyssm.jpg',
                'description' => NULL,
                'sku' => '23423423',
                'price' => 4000.95,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('products')->insert($products);
    }
}
