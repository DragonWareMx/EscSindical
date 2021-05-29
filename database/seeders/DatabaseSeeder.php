<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            RequestSeeder::class,
            CategorySeeder::class,
            RegimeSeeder::class,
            UnitSeeder::class,
            UserSeeder::class,
            PermissionSeeder::class,
            TagSeeder::class,
            CourseSeeder::class,
            ImageSeeder::class,
            ModuleSeeder::class,
            EntrySeeder::class,
            
        ]);
    }
}