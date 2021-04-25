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
            $table->string('titulo',45);
            $table->enum('tipo', ['','']);
            $table->string('contenido',45);
            $table->unsignedInteger('max_calif');
            $table->unsignedBigInteger('module_id');
            $table->dateTime('fecha_act');
            $table->dateTime('fecha_limite');
            $table->tinyInteger('visible');
            $table->tinyInteger('editable');

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
