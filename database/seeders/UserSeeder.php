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
            'nombre' => 'Agustín',
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
            'nombre' => 'Adolfo',
            'sexo' => 'h',
            'apellido_p' => 'Lemus',
            'apellido_m' => 'Magaña',
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



        DB::table('users')->insert([
            'nombre' => 'Alan',
            'sexo' => 'h',
            'apellido_p' => 'Cardiel',
            'apellido_m' => 'Tafolla',
            'email' =>  'estudiante5@dragonware.com.mx',
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
            'matricula' => '17122000',
            'category_id' => '1',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'Luis Eduardo',
            'sexo' => 'h',
            'apellido_p' => 'Martínez',
            'apellido_m' => 'Morales',
            'email' =>  'estudiante6@dragonware.com.mx',
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
            'matricula' => '17122001',
            'category_id' => '1',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'Karol',
            'sexo' => 'h',
            'apellido_p' => 'Piñón',
            'apellido_m' => 'Campos',
            'email' =>  'estudiante7@dragonware.com.mx',
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
            'matricula' => '17122002',
            'category_id' => '2',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'Ariel',
            'sexo' => 'h',
            'apellido_p' => 'Lara',
            'apellido_m' => 'Pedraza',
            'email' =>  'estudiante8@dragonware.com.mx',
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
            'matricula' => '17122003',
            'category_id' => '2',
            'unit_id' => 3
        ]);

        DB::table('users')->insert([
            'nombre' => 'David',
            'sexo' => 'h',
            'apellido_p' => 'Zavala',
            'apellido_m' => 'Moreno',
            'email' =>  'estudiante9@dragonware.com.mx',
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
            'matricula' => '17122004',
            'category_id' => '2',
            'unit_id' => 3
        ]);
    }
}