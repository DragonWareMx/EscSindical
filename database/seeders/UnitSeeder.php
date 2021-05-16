<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('units')->insert([
            'nombre' => 'Unidad 1 1',
            'regime_id' => 1
        ]);
        DB::table('units')->insert([
            'nombre' => 'Unidad 1 2',
            'regime_id' => 1
        ]);
        DB::table('units')->insert([
            'nombre' => 'Unidad 2 1',
            'regime_id' => 2
        ]);
        DB::table('units')->insert([
            'nombre' => 'Unidad 3 1',
            'regime_id' => 3
        ]);
        DB::table('units')->insert([
            'nombre' => 'Unidad 3 2',
            'regime_id' => 3
        ]);
        DB::table('units')->insert([
            'nombre' => 'Unidad 3 3',
            'regime_id' => 3
        ]);
    }
}
