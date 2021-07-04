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
            'sexo' => 'h',
            'apellido_p' => 'López',
            'apellido_m' => 'López',
            'email' =>  'test@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'avatar1.jpg',
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
            'category_id' => '1',
            'unit_id' => 1
        ]);

        DB::table('users')->insert([
            'nombre' => 'Oscar',
            'sexo' => 'h',
            'apellido_p' => 'Huerta',
            'apellido_m' => 'Garcia',
            'email' =>  'admin@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'avatar2.jpg',
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
            'category_id' => '1',
            'unit_id' => 2
        ]);

        DB::table('users')->insert([
            'nombre' => 'Fernando Adrián',
            'sexo' => 'h',
            'apellido_p' => 'García',
            'apellido_m' => 'Sánchez',
            'email' =>  'ponente@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'avatar3.jpg',
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
            'category_id' => '1',
            'unit_id' => 2
        ]);

        DB::table('users')->insert([
            'nombre' => 'Dulce Gabriela',
            'sexo' => 'm',
            'apellido_p' => 'Marín',
            'apellido_m' => 'Rendón',
            'email' =>  'estudiante@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'avatar4.jpg',
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
            'category_id' => '1',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'Jocabed Guadalupe',
            'sexo' => 'o',
            'apellido_p' => 'Marín',
            'apellido_m' => 'Piñón',
            'email' =>  'estudiante2@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'avatar4.jpg',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Agua Clara',
            'calle' => 'Ignacio Moctezuma',
            'num_ext' => '159',
            'num_int' => '',
            'cp' => '58189',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121038',
            'category_id' => '2',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'Oscar Andre',
            'sexo' => 'h',
            'apellido_p' => 'Pantoja',
            'apellido_m' => 'de Nivardy',
            'email' =>  'estudiante3@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'foto' =>  'avatar4.jpg',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Agua Clara',
            'calle' => 'Ignacio Moctezuma',
            'num_ext' => '159',
            'num_int' => '',
            'cp' => '58189',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121039',
            'category_id' => '1',
            'unit_id' => 3
        ]);
        // Estos 3 son los de prueba
        DB::table('users')->insert([
            'nombre' => 'Marina ',
            'sexo' => 'm',
            'apellido_p' => 'Guardado',
            'apellido_m' => 'Godoy',
            'email' =>  'administrador@sindical.com',
            'password' => Hash::make('password123'),
            'foto' =>  'avatarT.jpg',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Torrenueva',
            'calle' => 'Antonio Vázquez',
            'num_ext' => '29',
            'num_int' => '',
            'cp' => '58129',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121050',
            'category_id' => '1',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'Oscar Andre',
            'sexo' => 'h',
            'apellido_p' => 'Pantoja',
            'apellido_m' => 'Nivardy',
            'email' =>  'ponente@sindical.com',
            'password' => Hash::make('password123'),
            'foto' =>  'avatarT.jpg',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Torrenueva',
            'calle' => 'Antonio Vázquez',
            'num_ext' => '29',
            'num_int' => '',
            'cp' => '58129',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121051',
            'category_id' => '1',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'Lissa',
            'sexo' => 'm',
            'apellido_p' => 'Corral',
            'apellido_m' => 'Romero',
            'email' =>  'alumno@sindical.com',
            'password' => Hash::make('password123'),
            'foto' =>  'avatarT.jpg',
            'fecha_nac' => '1999/12/04',
            'estado' => 'Michoacan',
            'ciudad' => 'Morelia',
            'colonia' => 'Torrenueva',
            'calle' => 'Antonio Vázquez',
            'num_ext' => '29',
            'num_int' => '',
            'cp' => '58129',
            'tarjeton_pago' => 'tarjeton.pdf',
            'matricula' => '17121052',
            'category_id' => '1',
            'unit_id' => 3
        ]);
    }
}