<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('images')->insert([
            'imagen'=>'curso1.png'
        ]);
        DB::table('images')->insert([
            'imagen'=>'curso2.jpg'
        ]);
    }
}
