<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modules')->insert([
            'course_id'=>1,
            'nombre'=>'Introducción a la programación orientada a objetos'
        ]);
    }
}
