<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('drop_requests')->insert([
            'course_id'=>1,
            'user_id'=>4,
            'status'=>'En espera',
            'descripcion'=>'El profe es muy aburrido'
        ]);
        DB::table('drop_requests')->insert([
            'course_id'=>1,
            'user_id'=>5,
            'status'=>'En espera',
            'descripcion'=>'Tengo que trabajar y ya no puedo asistir'
        ]);
    }
}
