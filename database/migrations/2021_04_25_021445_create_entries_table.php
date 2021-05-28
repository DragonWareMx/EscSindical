<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('titulo', 255);
            $table->enum('tipo', ['Aviso', 'Informacion', 'Enlace', 'Archivo', 'Asignacion', 'Examen']);
            $table->text('contenido');
            $table->unsignedBigInteger('module_id');
            $table->dateTime('fecha_act');
            $table->dateTime('fecha_limite');
            $table->tinyInteger('visible');
            $table->tinyInteger('permitir_envios_retrasados');
            $table->text('link');
            $table->dateTime('fecha_de_apertura');
            $table->dateTime('fecha_de_entrega');

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');

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
        Schema::dropIfExists('entries');
    }
}