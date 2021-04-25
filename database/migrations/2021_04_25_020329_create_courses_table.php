<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('fecha_inicio');
            $table->date('fecha_limite');
            $table->unsignedInteger('max');
            $table->unsignedInteger('valor_curricular');
            $table->enum('acceso', ['','']);
            $table->tinyInteger('status');
            $table->string('tipo',45);
            $table->text('descripcion');
            $table->string('tipo_acceso',45);   
            $table->unsignedBigInteger('teacher_id');
            
            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
