<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('entries')->insert([
            'titulo' => 'Viernes 28 de Mayo no hay clases',
            'tipo' => 'Aviso',
            'contenido' => 'Debido a que estarán remodelando los laboratorios.',
            'visible'=>1,
            'created_at'=>'2021-05-18 02:23:23.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Reunión para dudas sobre calificaciones',
            'tipo' => 'Aviso',
            'contenido' => 'Favor de asistir a la junta del lunes 31 de mayo si tienes alguna duda respecto a la calificación de la última únidad.',
            'visible'=>1,
            'created_at'=>'2021-05-17 16:00:00.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Aviso no visible',
            'tipo' => 'Aviso',
            'contenido' => 'Este aviso no debe ser visible por que aún no está listo.',
            'visible'=>0,
            'created_at'=>'2021-04-22 08:30:00.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Ejercicios de repaso POO',
            'tipo' => 'Informacion',
            'contenido' => 'Chicos miren estos ejercicios de repaso, son opcionales pero muy útiles.',
            'visible'=>1,
            'created_at'=>'2021-03-25 02:00:00.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Video introducción a poo',
            'tipo' => 'Enlace',
            'link' => 'https://www.youtube.com/watch?v=DlphYPc_HKk',
            'visible'=>1,
            'created_at'=>'2021-05-26 08:00:00.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Video introductorio del curso',
            'tipo' => 'Enlace',
            'link' => 'https://www.youtube.com/watch?v=SA0VNwx21m8&ab_channel=Matem%C3%A1ticasprofeAlexMatem%C3%A1ticasprofeAlexVerificada',
            'visible'=>1,
            'created_at'=>'2021-01-18 13:45:52.000000',
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Origen de la Programación Orientada a Objetos',
            'tipo' => 'Archivo',
            'visible'=>1,
            'created_at'=>'2021-02-22 22:22:22.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Archivo necesario',
            'tipo' => 'Archivo',
            'visible'=>1,
            'created_at'=>'2021-05-27 19:15:32.000000',
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Actividad 1',
            'tipo' => 'Asignacion',
            'contenido' => 'Resolver los siguientes ejercicios basandose en los ejemplos vistos en clase.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-11 23:35:46.000000',
            'fecha_de_entrega'=>'2021-05-31 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'max_calif'=>100,
            'created_at'=>'2021-05-22 18:00:00.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Actividad 1',
            'tipo' => 'Asignacion',
            'contenido' => 'Elaborar un mapa mental de los conceptos vistos en clase.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-06-10 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'max_calif'=>50,
            'created_at'=>'2021-05-27 10:23:23.000000',
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Actividad 2',
            'tipo' => 'Asignacion',
            'contenido' => 'Hacer un resumen del articulo publicado en los recursos de esta unidad.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-06-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-07-30 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'max_calif'=>20,
            'created_at'=>'2021-05-27 11:00:00.000000',
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Examen departamental POO',
            'tipo' => 'Examen',
            'link' => 'https://docs.google.com/forms/d/e/1FAIpQLSeFT_V9H7XvR5Hnfzznk9F9vLawiUovvC3OQ5Fz-MdFQ5ZoJQ/viewform',
            'contenido'=>'Examen departamental Unidad 1.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-05-27 09:00:00.000000',
            'permitir_envios_retrasados'=>0,
            'max_calif'=>100,
            'created_at'=>'2021-05-18 02:23:23.000000',
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Examen departamental',
            'tipo' => 'Examen',
            'link' => 'https://docs.google.com/forms/d/e/1FAIpQLSeFT_V9H7XvR5Hnfzznk9F9vLawiUovvC3OQ5Fz-MdFQ5ZoJQ/viewform',
            'contenido'=>'Examen departamental Unidad 2.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-05-27 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'max_calif'=>80,
            'created_at'=>'2021-05-18 02:23:23.000000',
            'module_id'=>2,
        ]);
    }
}
