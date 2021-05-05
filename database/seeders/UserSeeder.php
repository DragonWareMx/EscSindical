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
            'sexo' => 'Masculino',
            'apellido_p' => 'López',
            'apellido_m' => 'López',
            'email' =>  'test@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'imagen.pdf',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Agua Clara',
            'calle' => 'Ignacio Moctezuma',
            'num_ext' => '159',
            'num_int' => '',
            'cp' => '58189',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121035',
            'categorie_id' => '1',
        ]);

        DB::table('users')->insert([
            'nombre' => 'Oscar',
            'sexo' => 'Masculino',
            'apellido_p' => 'Huerta',
            'apellido_m' => 'Garcia',
            'email' =>  'admin@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'imagen.pdf',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Agua Clara',
            'calle' => 'Ignacio Moctezuma',
            'num_ext' => '159',
            'num_int' => '',
            'cp' => '58189',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121031',
            'categorie_id' => '1',
        ]);

        DB::table('users')->insert([
            'nombre' => 'Fernando Adrián',
            'sexo' => 'Masculino',
            'apellido_p' => 'García',
            'apellido_m' => 'Sánchez',
            'email' =>  'ponente@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'imagen.pdf',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Agua Clara',
            'calle' => 'Ignacio Moctezuma',
            'num_ext' => '159',
            'num_int' => '',
            'cp' => '58189',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121030',
            'categorie_id' => '1',
        ]);

        DB::table('users')->insert([
            'nombre' => 'Joca Guadalupe',
            'sexo' => 'Masculino',
            'apellido_p' => 'Marín',
            'apellido_m' => 'Piñón',
            'email' =>  'estudiante@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'imagen.pdf',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Agua Clara',
            'calle' => 'Ignacio Moctezuma',
            'num_ext' => '159',
            'num_int' => '',
            'cp' => '58189',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121037',
            'categorie_id' => '1',
        ]);
    }
}