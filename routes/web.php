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
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/menu', function () {
    return view('menu');
});


Route::get('/inicio', function () {
    return view('index');
});

Route::get('/ejemplo',[App\Http\Controllers\UserController::class, 'index'])->name('ejemplo1');
Route::get('/ejemplo2',function (){
    return Inertia::render('Ejemplo2');
})->name('ejemplo2');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
