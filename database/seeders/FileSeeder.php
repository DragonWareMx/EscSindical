<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('files')->insert([
            'archivo' => 'archivo1.pdf',
            'original' => 'archivo1.pdf',
            'entry_id' => 2,
        ]);
        DB::table('files')->insert([
            'archivo' => 'repasopoo.pdf',
            'original' => 'repasopoo.pdf',
            'entry_id' => 4,
        ]);
        DB::table('files')->insert([
            'archivo' => 'necesario.pdf',
            'original' =>  'necesario.pdf',
            'entry_id' => 7,
        ]);
        DB::table('files')->insert([
            'archivo' => 'necesario2.pdf',
            'original' => 'necesario2.pdf',
            'entry_id' => 8,
        ]);
        DB::table('files')->insert([
            'archivo' => 'asignacion.pdf',
            'original' => 'asignacion.pdf',
            'entry_id' => 10,
        ]);
    }
}