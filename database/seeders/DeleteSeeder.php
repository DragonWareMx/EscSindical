<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeleteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('delete_requests')->insert([
            'course_id'=>2,
            'user_id'=>3,
            'status'=>'En espera',
            'comentario'=>'No considero que sea muy importante el tema, la verdad'
        ]);
        DB::table('delete_requests')->insert([
            'course_id'=>3,
            'user_id'=>3,
            'status'=>'En espera',
        ]);
    }
}
