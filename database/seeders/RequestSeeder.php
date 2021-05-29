<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('requests')->insert([
            'course_id'=>4,
            'user_id'=>4,
            'estatus'=>'En espera',
        ]);
        DB::table('requests')->insert([
            'course_id'=>3,
            'user_id'=>4,
            'estatus'=>'Rechazado',
        ]);
    }
}
