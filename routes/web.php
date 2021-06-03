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
Route::get('/ejemplo', [App\Http\Controllers\HomeController::class, 'ejemplo'])->name('ejemplo1');
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
Route::post('/updateCourse/{id}', [App\Http\Controllers\CourseController::class, 'update'])->name('updateCourse');
Route::post('/cursos/deleteRequest/{id}', [App\Http\Controllers\CourseController::class, 'deleteRequest'])->name('cursos.deleteRequest');


// ------Modulos del curso------
Route::get('/cursos/module/create', [App\Http\Controllers\CourseController::class, 'moduleCreate'])->name('module.create');
Route::get('/cursos/module/edit/{id}', [App\Http\Controllers\CourseController::class, 'moduleEdit'])->name('module.edit');
Route::post('/cursos/module/store', [App\Http\Controllers\CourseController::class, 'storeModule'])->name('module.store');


//------Rutas del layout cursos
Route::get('/cursos/{id}/informacion', [App\Http\Controllers\CourseController::class, 'informacion'])->name('cursos.informacion');

Route::get('/cursos/{id}/modulos', [App\Http\Controllers\CourseController::class, 'modulos'])->name('cursos.modulos');
Route::get('/cursos/{id}/modulo/{mid}', [App\Http\Controllers\CourseController::class, 'modulo'])->name('cursos.modulo');





Route::get('/cursos/{id}/participantes', [App\Http\Controllers\CourseController::class, 'participantes'])->name('cursos.participantes');
Route::get('/cursos/{id}/solicitudes', [App\Http\Controllers\CourseController::class, 'solicitudes'])->name('cursos.solicitudes');
Route::get('/cursos/{id}/agregar-participante', [App\Http\Controllers\CourseController::class, 'agregarParticipante'])->name('cursos.agregarParticipante');
Route::get('/cursos/{id}/mochila', [App\Http\Controllers\CourseController::class, 'mochila'])->name('cursos.mochila');
Route::get('/cursos/{id}/modulo/{mid}/publicacion/{pid}', [App\Http\Controllers\CourseController::class, 'verPublicacion'])->name('cursos.publicacion');
Route::post('/cursos/{id}/inscribir', [App\Http\Controllers\CourseController::class, 'inscribir'])->name('cursos.inscribir');

//----Solicitudes
Route::post('/cursos/{id}/solicitudes', [App\Http\Controllers\RequestController::class, 'aprobar'])->name('solicitudes.aprobar');


Route::get('/cursos/buscar', [App\Http\Controllers\CourseController::class, 'searchIndex'])->name('cursosBuscar');

Route::get('/layoutCursos', [App\Http\Controllers\CourseController::class, 'layout'])->name('layoutCursos');

//--------PERFIL--------
Route::get('/perfil', [App\Http\Controllers\PerfilController::class, 'index'])->name('perfil');
Route::get('/perfil/publico/{id}', [App\Http\Controllers\PerfilController::class, 'verPerfil'])->name('perfil.public');
Route::get('/perfil/configuracion', [App\Http\Controllers\PerfilController::class, 'edit'])->name('perfil.edit');
Route::patch('/perfil/configuracion', [App\Http\Controllers\PerfilController::class, 'update'])->name('perfil.update');

//----------ENTRADAS/ASIGNACIONES/EXAMENES------------
Route::get('/entrada/crear', [App\Http\Controllers\EntryController::class, 'index'])->name('entrada.crear');
Route::post('/entrada/crear', [App\Http\Controllers\EntryController::class, 'create'])->name('entrada.create');
Route::get('/entrada/editar/{id}', [App\Http\Controllers\EntryController::class, 'edit'])->name('entrada.editar');