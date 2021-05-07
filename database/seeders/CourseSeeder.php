<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert([
            'nombre' => 'Programación orientada a objetos',
            'fecha_inicio' =>'2021/05/15',
            'fecha_final' =>'2021/11/15',
            'inicio_inscripciones' => '2021/05/01',           
            'fecha_limite'=>'2021/05/14',
            'link'=>'https://facebook.com',
            'max'=>'50',
            'valor_curricular'=>'100',
            'tipo_acceso' => 'Automática',
            'estatus'=>'1',
            'descripcion' =>'En este curso aprenderás a programar, usaremos el lenguaje Java y seremos todos muy felices',   
            'teacher_id' =>'3',
        ]);

        DB::table('courses')->insert([
            'nombre' => 'Curso facilito de React y laravel',
            'fecha_inicio' =>'2021/05/20',
            'fecha_final' =>'2021/11/18',
            'inicio_inscripciones' => '2021/05/01',           
            'fecha_limite'=>'2021/05/15',
            'link'=>'https://facebook.com',
            'max'=>'100',
            'valor_curricular'=>'90',
            'tipo_acceso' => 'Automática',
            'estatus'=>'1',
            'descripcion' =>'Laravel es un framework muy usado en la actualidad, convinado con React puede crear aplicaciones realmente poderosas y con interfaces muy agradables para el usuario final',   
            'teacher_id' =>'3',
            ]);

    }
}
