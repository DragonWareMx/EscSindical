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
            'fecha_inicio' => '2021/05/15',
            'fecha_final' => '2021/11/15',
            'inicio_inscripciones' => '2021/05/01',
            'fecha_limite' => '2021/05/14',
            'link' => 'https://facebook.com',
            'max' => '50',
            'valor_curricular' => '0',
            'tipo_acceso' => 'Automática',
            'estatus' => 'Activo',
            'descripcion' => 'En este curso aprenderás a programar, usaremos el lenguaje Java y seremos todos muy felices',
            'teacher_id' => '3',
        ]);

        DB::table('courses')->insert([
            'nombre' => 'Curso facilito de React y laravel',
            'fecha_inicio' => '2021/05/20',
            'fecha_final' => '2021/11/18',
            'inicio_inscripciones' => '2021/05/01',
            'fecha_limite' => '2021/05/15',
            'link' => 'https://facebook.com',
            'max' => '100',
            'valor_curricular' => '1',
            'tipo_acceso' => 'Automática',
            'estatus' => 'Activo',
            'descripcion' => 'Laravel es un framework muy usado en la actualidad, convinado con React puede crear aplicaciones realmente poderosas y con interfaces muy agradables para el usuario final',
            'teacher_id' => '3',
        ]);

        DB::table('courses')->insert([
            'nombre' => 'Curso facilito de Django',
            'fecha_inicio' => '2021/05/20',
            'fecha_final' => '2021/05/27',
            'inicio_inscripciones' => '2021/05/01',
            'fecha_limite' => '2021/05/15',
            'link' => 'https://facebook.com',
            'max' => '100',
            'valor_curricular' => '1',
            'tipo_acceso' => 'Automática',
            'estatus' => 'Terminado',
            'descripcion' => 'Django es un framework muy potente en la actualidad, además de ser el favorito de los fanáticos de Python. Entra a este curso y descúbrelo',
            'teacher_id' => '3',
        ]);

        DB::table('courses')->insert([
            'nombre' => 'Aprende a hacer un kamehameha, la técnica de Gokú',
            'fecha_inicio' => '2021/05/20',
            'fecha_final' => '2021/06/30',
            'inicio_inscripciones' => '2021/05/01',
            'fecha_limite' => '2021/05/15',
            'link' => 'https://facebook.com',
            'max' => '10',
            'valor_curricular' => '1',
            'tipo_acceso' => 'Sólo yo',
            'estatus' => 'Activo',
            'descripcion' => '¿Te gustaría conocer los secretos del saiyajin más fuerte del universo?, este es tu curso',
            'teacher_id' => '3',
        ]);

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 4
        ]);

        DB::table('course_user')->insert([
            'course_id' => 2,
            'user_id' => 4
        ]);

        DB::table('course_user')->insert([
            'course_id' => 3,
            'user_id' => 4,
            'calificacion_final' => 92,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 5,
            'calificacion_final' => 23,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 6,
            'calificacion_final' => 100,
        ]);

        DB::table('course_tag')->insert([
            'tag_id' => 1,
            'course_id' => 1
        ]);
        DB::table('course_tag')->insert([
            'tag_id' => 2,
            'course_id' => 1
        ]);
        DB::table('course_tag')->insert([
            'tag_id' => 3,
            'course_id' => 1
        ]);
        DB::table('course_tag')->insert([
            'tag_id' => 1,
            'course_id' => 2
        ]);
        DB::table('course_tag')->insert([
            'tag_id' => 1,
            'course_id' => 3
        ]);
        DB::table('course_tag')->insert([
            'tag_id' => 3,
            'course_id' => 3
        ]);
        DB::table('course_tag')->insert([
            'tag_id' => 4,
            'course_id' => 4
        ]);

        DB::table('course_tag')->insert([
            'tag_id' => 5,
            'course_id' => 4
        ]);
    }
}