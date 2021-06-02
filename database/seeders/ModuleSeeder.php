<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
            'numero'=>1,
            'nombre'=>'Introducción a la programación orientada a objetos',
            'objetivo'=>'UN LOREM IPSUM DE LA BASE DE DATOS SOY Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
            'criterios'=>'Asistencia 10%, tareas 20%, examen 30% y proyecto final 40%',
            'duracion'=>4,
            'temario'=>'<h1>Unidad 1</h1>
                <ol>
                    <li>Introducci&oacute;n a poo</li>
                    <li>Objetos</li>
                    <li>Atributos</li>
                    <li>M&eacute;todos</li>
                    <li>Otro temita por ah&iacute; muy bonito</li>
                </ol>
                
                <p>&nbsp;</p>'
        ]);
        DB::table('modules')->insert([
            'course_id'=>2,
            'numero'=>1,
            'nombre'=>'Un modulo muy divertido',
            'objetivo'=>'UN segundo LOREM IPSUM DE LA BASE DE DATOS SOY Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
            'criterios'=>'Asistencia 90%, tareas 1%, examen 9%',
            'duracion'=>6,
            'temario'=>'<h1>Unidad 1</h1>
                <ol>
                    <li>Tremendo modulo</li>
                    <li>modulo muy lindo</li>
                    <li>el modulo y sus derivados</li>
                </ol>'
        ]);
    }
}
