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
            'contenido' => 'Debido a que se festejará el cumpleaños de mi gatito',
            'visible'=>1,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Aviso parroquial',
            'tipo' => 'Aviso',
            'contenido' => 'Favor de asistir a la junta del lunes 31 de mayo, se pasará lista.',
            'visible'=>1,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Aviso no visible',
            'tipo' => 'Aviso',
            'contenido' => 'Este aviso no debe ser visible por que aún no está listo.',
            'visible'=>0,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Ejercicios de repaso POO',
            'tipo' => 'Informacion',
            'contenido' => 'Chicos miren estos ejercicios de repaso, son opcionales pero muy útiles.',
            'visible'=>1,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Video introducción a poo',
            'tipo' => 'Enlace',
            'link' => 'https://www.youtube.com/watch?v=DlphYPc_HKk',
            'visible'=>1,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Video introducción a la otra materia',
            'tipo' => 'Enlace',
            'link' => 'https://www.youtube.com/watch?v=SA0VNwx21m8&ab_channel=Matem%C3%A1ticasprofeAlexMatem%C3%A1ticasprofeAlexVerificada',
            'visible'=>1,
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Archivo necesario',
            'tipo' => 'Archivo',
            'visible'=>1,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Archivo necesario 2',
            'tipo' => 'Archivo',
            'visible'=>1,
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Actividad 1',
            'tipo' => 'Asignacion',
            'contenido' => 'Realizar esta asignación por favorsito.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-11 23:35:46.000000',
            'fecha_de_entrega'=>'2021-05-31 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Actividad 1 pero de la otra clase',
            'tipo' => 'Asignacion',
            'contenido' => 'Realizar esta asignación por favorsito pero dos.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-06-10 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Actividad 1 pero de la otra clase',
            'tipo' => 'Asignacion',
            'contenido' => 'Realizar esta asignación por favorsito pero dos.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-06-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-07-30 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'module_id'=>2,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Examen departamental POO',
            'tipo' => 'Examen',
            'link' => 'https://docs.google.com/forms/d/e/1FAIpQLSeFT_V9H7XvR5Hnfzznk9F9vLawiUovvC3OQ5Fz-MdFQ5ZoJQ/viewform',
            'contenido'=>'Examen departamental muy bonito.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-05-27 09:00:00.000000',
            'permitir_envios_retrasados'=>0,
            'module_id'=>1,
        ]);
        DB::table('entries')->insert([
            'titulo' => 'Examen departamental de la otra materia',
            'tipo' => 'Examen',
            'link' => 'https://docs.google.com/forms/d/e/1FAIpQLSeFT_V9H7XvR5Hnfzznk9F9vLawiUovvC3OQ5Fz-MdFQ5ZoJQ/viewform',
            'contenido'=>'Examen departamental muy bonito pero de la otra materia.',
            'visible'=>1,
            'fecha_de_apertura'=>'2021-05-27 08:00:00.000000',
            'fecha_de_entrega'=>'2021-05-27 23:59:59.000000',
            'permitir_envios_retrasados'=>1,
            'module_id'=>1,
        ]);
    }
}
