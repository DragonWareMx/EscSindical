<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tags')->insert([
            'nombre' => 'Informática',
        ]);
        
        DB::table('tags')->insert([
            'nombre' => 'Programación',
        ]);
        
        DB::table('tags')->insert([
            'nombre' => 'Matemática',
        ]);

        DB::table('tags')->insert([
            'nombre' => 'Anime',
        ]);
        DB::table('tags')->insert([
            'nombre' => 'Artes marciales',
        ]);
    }
}
