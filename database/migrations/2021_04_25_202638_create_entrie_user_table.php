<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntrieUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entrie_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entrie_id');
            $table->foreign('entrie_id')->references('id')->on('entries')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('calificacion')->nullable();
            $table->text('archivo')->nullable();
            $table->dateTime('fecha')->nullable();
            $table->tinyInteger('editado')->default(0);
            $table->Text('Comentario')->nullable();
            $table->dateTime('fecha_calif')->nullable();
            $table->text('comentario_retroalimentacion')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entrie_user');
    }
}
