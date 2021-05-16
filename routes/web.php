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
Route::get('/usuarios/{id}', [App\Http\Controllers\UserController::class, 'edit'])->name('usuarios.edit');
Route::post('/usuarios', [App\Http\Controllers\UserController::class, 'store'])->name('usuarios.create');
Route::post('/usuarios/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('usuarios.store');
Route::delete('usuarios/{id}',  [App\Http\Controllers\UserController::class, 'destroy'])->name('usuarios.delete');

//------CURSOS----
Route::get('/cursos', [App\Http\Controllers\CourseController::class, 'index'])->name('cursos');
Route::post('/storeCourse', [App\Http\Controllers\CourseController::class, 'store'])->name('storeCourse');

Route::get('/cursos/buscar', [App\Http\Controllers\CourseController::class, 'searchIndex'])->name('cursosBuscar');

//--------PERFIL--------
Route::get('/perfil', [App\Http\Controllers\PerfilController::class, 'index'])->name('perfil');