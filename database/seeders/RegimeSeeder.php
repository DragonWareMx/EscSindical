<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('regimes')->insert([
            'nombre' => 'Regimen 1',
        ]);
        DB::table('regimes')->insert([
            'nombre' => 'Regimen 2',
        ]);
        DB::table('regimes')->insert([
            'nombre' => 'Regimen 3',
        ]);
    }
}
