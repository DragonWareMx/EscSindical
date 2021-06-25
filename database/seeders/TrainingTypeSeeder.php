<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TrainingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('training_types')->insert([
            'nombre' => 'Enfermera general',
        ]);

        
        DB::table('training_types')->insert([
            'nombre' => 'Informática',
        ]);

        
        DB::table('training_types')->insert([
            'nombre' => 'Médico general',
        ]);

        
        DB::table('training_types')->insert([
            'nombre' => 'Intendencia',
        ]);

        DB::table('course_training_type')->insert([
            'course_id' => 1,
            'training_type_id' => 1 
        ]);

        DB::table('course_training_type')->insert([
            'course_id' => 1,
            'training_type_id' => 2
        ]);

        DB::table('course_training_type')->insert([
            'course_id' => 2,
            'training_type_id' => 2
        ]);

        DB::table('course_training_type')->insert([
            'course_id' => 3,
            'training_type_id' => 3
        ]);

        DB::table('course_training_type')->insert([
            'course_id' => 4,
            'training_type_id' => 4
        ]);
    }
}
