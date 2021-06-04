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
    }
}
