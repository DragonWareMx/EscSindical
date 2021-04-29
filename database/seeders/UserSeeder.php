<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'nombre' => 'Leonardo',
            'apellido_p' => 'López',
            'apellido_m' => 'López',
            'email' =>  'test@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'img/avatar/monita.jpg',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Agua Clara',
            'calle' => 'Ignacio Moctezuma',
            'num_ext' => '159',
            'num_int' => '',
            'cp' => '58189',
            'tarjeton_pago' => 'img/tpago/tarjeton.jpg',
            'matricula' => '17121035',
            'categorie_id' => '1',
        ]);
    }
}