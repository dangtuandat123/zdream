<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Tạo user demo
        User::create([
            'name' => 'Demo User',
            'email' => 'demo@zdream.vn',
            'password' => Hash::make('password'),
            'credits' => 10, // 10 xu miễn phí
        ]);

        // Seed styles
        $this->call([
            StyleSeeder::class,
        ]);
    }
}
