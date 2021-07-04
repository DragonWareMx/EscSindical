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
            'descripcion' => 'La programación Orientada a objetos se define como un paradigma de la programación, una manera de programar específica, donde se organiza el código en unidades denominadas clases, de las cuales se crean objetos que se relacionan entre sí para conseguir los objetivos de las aplicaciones.',
            'teacher_id' => '3',
        ]);

        DB::table('courses')->insert([
            'nombre' => 'Curso de React y Laravel',
            'fecha_inicio' => '2021/05/20',
            'fecha_final' => '2021/11/18',
            'inicio_inscripciones' => '2021/05/01',
            'fecha_limite' => '2021/05/15',
            'link' => 'https://facebook.com',
            'max' => '100',
            'valor_curricular' => '1',
            'tipo_acceso' => 'Automática',
            'estatus' => 'Activo',
            'descripcion' => 'Laravel es un framework muy usado en la actualidad, convinado con React puede crear aplicaciones realmente poderosas y con interfaces muy agradables para el usuario final.',
            'teacher_id' => '3',
        ]);

        DB::table('courses')->insert([
            'nombre' => 'Finanzas básicas',
            'fecha_inicio' => '2021/05/15',
            'fecha_final' => '2021/06/27',
            'inicio_inscripciones' => '2021/05/01',
            'fecha_limite' => '2021/05/20',
            'link' => 'https://facebook.com',
            'max' => '100',
            'valor_curricular' => '1',
            'tipo_acceso' => 'Automática',
            'estatus' => 'Terminado',
            'descripcion' => 'En este curso aprenderás las bases para administrar tus propias finanzas de una manera fácil y eficaz.',
            'teacher_id' => '8',
        ]);

        DB::table('courses')->insert([
            'nombre' => 'Primeros auxilios básicos',
            'fecha_inicio' => '2021/05/20',
            'fecha_final' => '2021/06/30',
            'inicio_inscripciones' => '2021/05/01',
            'fecha_limite' => '2021/05/15',
            'link' => 'https://facebook.com',
            'max' => '10',
            'valor_curricular' => '1',
            'tipo_acceso' => 'Sólo yo',
            'estatus' => 'Activo',
            'descripcion' => 'Conocer algunas técnicas básicas de primeros puede salvar tu vida o la de alguien más, en este curso conoceras algunas de estas técnicas y como aplicarlas adecuadamente.',
            'teacher_id' => '8',
        ]);

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 4,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 2,
            'user_id' => 5,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 3,
            'user_id' => 6,
            'calificacion_final' => 92,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 9,
            'calificacion_final' => 80,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 2,
            'user_id' => 10,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 11,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 4,
            'user_id' => 12,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 3,
            'user_id' => 13,
        ]);

        DB::table('course_user')->insert([
            'course_id' => 1,
            'user_id' => 14,
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
            'tag_id' => 1,
            'course_id' => 2
        ]);
        DB::table('course_tag')->insert([
            'tag_id' => 2,
            'course_id' => 2
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