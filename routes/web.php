<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('home');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/menu', function () {
    return view('menu');
});


Route::get('/inicio', function () {
    return view('index');
});

Auth::routes();

//--------RUTAS DE EJEMPLO
Route::get('/ejemplo', [App\Http\Controllers\UserController::class, 'ejemplo'])->name('ejemplo1');
//--------RUTAS DE EJEMPLO

//--------USUARIOS--------
Route::get('/usuarios', [App\Http\Controllers\UserController::class, 'index'])->name('usuarios');
Route::post('/usuarios/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('usuarios.edit');

//------CURSOS----
Route::get('/cursos', [App\Http\Controllers\CourseController::class, 'index'])->name('cursos');
Route::post('/storeCourse', [App\Http\Controllers\CourseController::class, 'store'])->name('storeCourse');

//--------PERFIL--------
Route::get('/perfil', [App\Http\Controllers\PerfilController::class, 'index'])->name('perfil');