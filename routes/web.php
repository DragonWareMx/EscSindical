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
Route::get('/inicio', [App\Http\Controllers\HomeController::class, 'inicio'])->name('inicio');
//--------RUTAS DE EJEMPLO

// INICIOS
Route::get('/inicioEstudiante', [App\Http\Controllers\CourseController::class, 'inicioEstudiante'])->name('inicioEstudiante');
Route::get('/inicioPonente', [App\Http\Controllers\CourseController::class, 'inicioPonente'])->name('inicioPonente');
Route::get('/inicioAdmin', [App\Http\Controllers\CourseController::class, 'inicioAdmin'])->name('inicioAdmin');

//--------USUARIOS--------
//VISTAS PARA ADMIN
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
Route::post('/cursos/deleteRequest/{id}', [App\Http\Controllers\CourseController::class, 'deleteRequest'])->name('cursos.deleteRequest'); //solicitar BAJA DE CURSO-Estudiante
Route::post('/cursos/deleteCourseRequest/{id}', [App\Http\Controllers\CourseController::class, 'deleteCourseRequest'])->name('cursos.deleteCourseRequest'); //solicitar Eliminación de curso -Ponente


// ------Modulos del curso------
Route::get('/cursos/{id}/modulos', [App\Http\Controllers\CourseController::class, 'modulos'])->name('cursos.modulos');
Route::get('/cursos/module/create', [App\Http\Controllers\CourseController::class, 'moduleCreate'])->name('module.create');
Route::get('/cursos/module/edit/{id}', [App\Http\Controllers\CourseController::class, 'moduleEdit'])->name('module.edit');
Route::post('/cursos/module/store', [App\Http\Controllers\CourseController::class, 'storeModule'])->name('module.store');
Route::delete('/cursos/module/delete/{id}', [App\Http\Controllers\CourseController::class, 'deleteModule'])->name('module.delete');
Route::post('/cursos/module/update/{id}', [App\Http\Controllers\CourseController::class, 'updateModule'])->name('module.update');
Route::get('/cursos/{id}/modulo/{mid}', [App\Http\Controllers\CourseController::class, 'modulo'])->name('cursos.modulo');
Route::get('/cursos/{id}/modulo/{mid}/examen/{eid}', [App\Http\Controllers\EntryController::class, 'doExam'])->name('cursos.examen');



//------Rutas del layout cursos
Route::get('/cursos/{id}/informacion', [App\Http\Controllers\CourseController::class, 'informacion'])->name('cursos.informacion');

Route::get('/cursos/{id}/modulos', [App\Http\Controllers\CourseController::class, 'modulos'])->name('cursos.modulos');
//ruta para reordenar los modulos
Route::post('/cursos/{id}/modulos', [App\Http\Controllers\CourseController::class, 'ordenarModulos'])->name('cursos.modulos.order');
Route::get('/cursos/{id}/modulo/{mid}', [App\Http\Controllers\CourseController::class, 'modulo'])->name('cursos.modulo');

// ASIGNACION
Route::get('/cursos/{id}/modulo/{mid}/asignacion/{pid}', [App\Http\Controllers\CourseController::class, 'asignacion'])->name('cursos.asignacion');
Route::post('/cursos/{id}/modulo/{mid}/asignacion/{pid}', [App\Http\Controllers\CourseController::class, 'entregarAsignacion'])->name('cursos.asignacion.entregar');
Route::delete('/cursos/{id}/modulo/{mid}/asignacion/{pid}', [App\Http\Controllers\EntryController::class, 'cancelarEntrega'])->name('cursos.asignacion.cancelar');
Route::get('/cursos/{id}/modulo/{mid}/asignacion/{pid}/entrega/{eid}', [App\Http\Controllers\CourseController::class, 'asignacionEntrega'])->name('cursos.asignacion.entrega');


Route::get('/cursos/{id}/participantes', [App\Http\Controllers\CourseController::class, 'participantes'])->name('cursos.participantes');
Route::get('/cursos/{id}/solicitudes', [App\Http\Controllers\CourseController::class, 'solicitudes'])->name('cursos.solicitudes');
Route::get('/cursos/{id}/agregar-participante', [App\Http\Controllers\CourseController::class, 'agregarParticipante'])->name('cursos.agregarParticipante');
Route::post('/cursos/{id}/agregar-participante', [App\Http\Controllers\RequestController::class, 'agregar'])->name('cursos.addStudent');
Route::get('/cursos/{id}/mochila', [App\Http\Controllers\CourseController::class, 'mochila'])->name('cursos.mochila');
Route::get('/cursos/{id}/modulo/{mid}/publicacion/{pid}', [App\Http\Controllers\CourseController::class, 'verPublicacion'])->name('cursos.publicacion');
Route::post('/cursos/{id}/inscribir', [App\Http\Controllers\CourseController::class, 'inscribir'])->name('cursos.inscribir');
Route::get('/cursos/{id}/estadisticas', [App\Http\Controllers\CourseController::class, 'estadisticas'])->name('cursos.estadisticas');
Route::get('/cursos/{id}/calificaciones', [App\Http\Controllers\CourseController::class, 'calificaciones'])->name('cursos.calificaciones');
Route::post('/cursos/{id}/calificaciones', [App\Http\Controllers\CourseController::class, 'storeCalificaciones'])->name('cursos.calificaciones.store');

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
Route::patch('/entrada/editar/{id}', [App\Http\Controllers\EntryController::class, 'update'])->name('entrada.edit');
Route::delete('/entrada/eliminar/{id}', [App\Http\Controllers\EntryController::class, 'delete'])->name('entrada.delete');

//----------------NOTIFICACION----------------------
Route::post('/notificacion/vista/{id}', [App\Http\Controllers\NotificationController::class, 'marcar'])->name('notif.vista');

// --------------------REPORTES--------------------
Route::get('/reportes', [App\Http\Controllers\ReportController::class, 'index'])->name('reportes');

// Route::name('reportes.')->group(function () {
//     Route::get('/reportes', [App\Http\Controllers\ReportController::class, 'index'])->name('index');
// });

Route::get('/reportes/{id}', [App\Http\Controllers\ReportController::class, 'verReporte'])->name('VerReportes');

// SOLICITUDES
Route::get('/solicitudes', [App\Http\Controllers\RequestController::class, 'index'])->name('solicitudes');
Route::post('/solicitudes/bajaCurso/{id}',[App\Http\Controllers\RequestController::class, 'bajaCurso'])->name('solicitudes.bajaCurso');
Route::post('/solicitudes/bajaAlumno/{id}',[App\Http\Controllers\RequestController::class, 'bajaAlumno'])->name('solicitudes.bajaAlumno');
Route::get('/solicitudes/{id}/{type}', [App\Http\Controllers\RequestController::class, 'verSolicitud'])->name('verSolicitud');

//LOG
Route::name('log.')->group(function () {
    Route::get('/log', [App\Http\Controllers\LogController::class, 'index'])->name('index');
});
//----------------COMENTARIOS--------------------
Route::post('/cursos/{cid}/modulo/{mid}/publicacion/{pid}/comment', [App\Http\Controllers\CommentController::class, 'create'])->name('comment.create');
