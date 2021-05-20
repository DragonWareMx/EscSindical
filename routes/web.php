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
Route::get('/usuarios/create', [App\Http\Controllers\UserController::class, 'create'])->name('usuarios.create');
Route::post('/usuarios', [App\Http\Controllers\UserController::class, 'store'])->name('usuarios.store');
Route::get('/usuarios/{id}', [App\Http\Controllers\UserController::class, 'edit'])->name('usuarios.edit');
Route::patch('/usuarios/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('usuarios.update');
Route::delete('usuarios/{id}',  [App\Http\Controllers\UserController::class, 'destroy'])->name('usuarios.delete');
Route::put('usuarios/{id}/restore',  [App\Http\Controllers\UserController::class, 'restore'])->name('usuarios.restore');

//------CURSOS----
Route::get('/cursos', [App\Http\Controllers\CourseController::class, 'index'])->name('cursos');
Route::get('/cursos/create', [App\Http\Controllers\CourseController::class, 'create'])->name('cursos.create');
Route::get('/cursos/edit/{id}', [App\Http\Controllers\CourseController::class, 'editCourse'])->name('cursos.edit');
Route::post('/storeCourse', [App\Http\Controllers\CourseController::class, 'store'])->name('storeCourse');
// ------Modulos del curso------
Route::get('/cursos/module/create', [App\Http\Controllers\CourseController::class, 'moduleCreate'])->name('module.create');
Route::get('/cursos/module/edit/{id}', [App\Http\Controllers\CourseController::class, 'moduleEdit'])->name('module.edit');

//------Rutas del layout cursos
Route::get('/cursos/{id}/informacion', [App\Http\Controllers\CourseController::class, 'informacion'])->name('cursos.informacion');
Route::get('/cursos/{id}/modulos', [App\Http\Controllers\CourseController::class, 'modulos'])->name('cursos.modulos');


Route::get('/prueba', [App\Http\Controllers\CourseController::class, 'prueba'])->name('prueba');

Route::get('/cursos/buscar', [App\Http\Controllers\CourseController::class, 'searchIndex'])->name('cursosBuscar');

Route::get('/layoutCursos', [App\Http\Controllers\CourseController::class, 'layout'])->name('layoutCursos');

//--------PERFIL--------
Route::get('/perfil', [App\Http\Controllers\PerfilController::class, 'index'])->name('perfil');