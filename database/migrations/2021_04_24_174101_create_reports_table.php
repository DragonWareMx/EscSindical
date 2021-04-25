<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reported');
            $table->foreign('reported')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('reporter');
            $table->foreign('reporter')->references('id')->on('users')->onDelete('cascade');
            $table->string('comentario');
            $table->dateTime('fecha');
            $table->tinyInteger('status')->default(0);
            $table->string('accion')->nullable();
            $table->timestamps();
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
        Schema::dropIfExists('reports');
    }
}
