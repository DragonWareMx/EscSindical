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
            'objetivo'=>'Definir y aclarar la diferencia entre la programación orientada a objetos y un lenguaje orientado objeto, además de aprender conceptos los conceptos más básicos.',
            'criterios'=>'Asistencia 10%, tareas 20%, examen 30% y proyecto final 40%',
            'duracion'=>4,
            'temario'=>'<h1>Unidad 1</h1>
                <ol>
                    <li>Introducci&oacute;n a poo</li>
                    <li>Objetos</li>
                    <li>Atributos</li>
                    <li>M&eacute;todos</li>
                </ol>
                
                <p>&nbsp;</p>'
        ]);
        DB::table('modules')->insert([
            'course_id'=>2,
            'numero'=>1,
            'nombre'=>'Laravel',
            'objetivo'=>'Aprender las bases de laravel para crear tu primero proyecto.',
            'criterios'=>'Asistencia 10%, tareas 30%, proyecto 60%',
            'duracion'=>6,
            'temario'=>'<h1>Laravel</h1>
                <ol>
                    <li>¿Qué es Laravel?</li>
                    <li>Ventajas de usar Laravel</li>
                    <li>Tu primer proyecto de Laravel</li>
                </ol>'
        ]);
        DB::table('modules')->insert([
            'course_id'=>2,
            'numero'=>1,
            'nombre'=>'React',
            'objetivo'=>'Aprender las ventajes de usar react y su programación por componentes.',
            'criterios'=>'Asistencia 10%, tareas 30%, proyecto 60%',
            'duracion'=>6,
            'temario'=>'<h1>React</h1>
                <ol>
                    <li>¿Qué es React?</li>
                    <li>Concept de programación por componentes</li>
                    <li>Principales usos de React</li>
                    <li>Tu primer componente con React</li>
                </ol>'
        ]);
        DB::table('modules')->insert([
            'course_id'=>1,
            'numero'=>2,
            'nombre'=>'Conceptos avanzados',
            'objetivo'=>'En este módulo aprenderas que son los constructores, la herencia, el polimorfismo y la sobrecarga de métodos, para que puedas sacar el mayor provecho a tus programas.',
            'criterios'=>'Asistencia 10%, tareas 20%, examen 30% y proyecto final 40%',
            'duracion'=>4,
            'temario'=>'<h1>Unidad 2</h1>
                <ol>
                    <li>Constructores</li>
                    <li>Herencia</li>
                    <li>Polimorfismo</li>
                    <li>Sobrecarga de metodos</li>
                </ol>
                
                <p>&nbsp;</p>'
        ]);
    }
}
