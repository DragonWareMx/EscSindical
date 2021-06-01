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
            'imagen'=>'curso1.png',
            'course_id'=>1
        ]);
        
        DB::table('images')->insert([
            'imagen'=>'curso2.jpg',
            'course_id'=>2
        ]);
        DB::table('images')->insert([
            'imagen'=>'curso3.png',
            'course_id'=>3
        ]);
        DB::table('images')->insert([
            'imagen'=>'curso4.png',
            'course_id'=>4
        ]);
    }
}
