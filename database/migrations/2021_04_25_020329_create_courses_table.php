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
            $table->string('nombre');
            $table->date('fecha_inicio');
            $table->date('fecha_final');
            $table->date('inicio_inscripciones')->nullable();            
            $table->date('fecha_limite')->nullable();
            $table->text('link');
            $table->unsignedInteger('max');
            $table->tinyInteger('valor_curricular');
            $table->enum('tipo_acceso', ['Automática','Solicitud','Sólo yo']);
            $table->enum('estatus',['Activo','Terminado','Cancelado'])->default('Activo');
            $table->text('descripcion');   
            $table->unsignedBigInteger('teacher_id');
            
            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('cascade');

            $table->softDeletes();
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
