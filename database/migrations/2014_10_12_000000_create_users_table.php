<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('sexo')->default(0);
            $table->string('apellido_p');
            $table->string('apellido_m')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->text('foto')->nullable();
            $table->date('fecha_nac');
            $table->string('estado');
            $table->string('ciudad');
            $table->string('colonia');
            $table->string('calle');
            $table->string('num_ext');
            $table->string('num_int');
            $table->integer('cp');
            $table->text('tarjeton_pago');
            $table->string('matricula');
            $table->rememberToken();

            // $table->unsignedBigInteger('categorie_id');
            // $table->foreign('categorie_id')->references('id')->on('categories');

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
        Schema::dropIfExists('users');
    }
}
