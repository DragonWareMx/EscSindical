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
            $table->enum('sexo',['h','m','o']);
            $table->string('apellido_p');
            $table->string('apellido_m')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->text('foto')->nullable();
            $table->date('fecha_nac');
            $table->string('estado', 50);
            $table->string('ciudad', 60);
            $table->string('colonia', 100);
            $table->string('calle', 100);
            $table->string('num_ext', 10);
            $table->string('num_int', 10)->nullable();
            $table->string('cp', 9);
            $table->text('tarjeton_pago')->nullable();
            $table->string('matricula',10);
            $table->rememberToken();

            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');

            $table->unsignedBigInteger('unit_id')->nullable();
            $table->foreign('unit_id')->references('id')->on('units')->onDelete('set null');

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