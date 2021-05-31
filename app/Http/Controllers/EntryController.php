<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Entry;
use App\Models\File;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class EntryController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        Gate::authorize('haveaccess', 'ponente.perm');
        $cursos = Course::with('modules')->where('teacher_id', Auth::user()->id)->get();
        return Inertia::render('Entradas/Crear', ['cursos' => fn () => $cursos]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'tipo' => 'required|in:Aviso,Informacion,Enlace,Archivo,Asignacion,Examen'
        ]);
        $tipo = $request->tipo;
        if ($tipo == "Aviso") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'contenido' => 'required',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'archivos.*' => 'nullable|file'
            ]);
            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();
                //aqui va lo de los archivos
                if ($request->file('archivos')) {
                    foreach ($request->file('archivos') as $file) {
                        $archivo = $file->store('public/archivos_cursos');
                        $name = $file->hashName();
                        $newFile = new File();
                        $newFile->archivo = $name;
                        $newFile->entry_id = $entrada->id;
                        $newFile->save();
                    }
                }
                DB::commit();
                // all good
                return Redirect::back()->with('success', 'La entrada se ha creado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Informacion") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'contenido' => 'required',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'archivos.*' => 'nullable|file'
            ]);

            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();
                //aqui va lo de los archivos
                if ($request->file('archivos')) {
                    foreach ($request->file('archivos') as $file) {
                        $archivo = $file->store('public/archivos_cursos');
                        $name = $file->hashName();
                        $newFile = new File();
                        $newFile->archivo = $name;
                        $newFile->entry_id = $entrada->id;
                        $newFile->save();
                    }
                }
                DB::commit();
                // all good
                return Redirect::back()->with('success', 'La entrada se ha creado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Enlace") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'link' => 'required|url',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
            ]);

            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->link = $request->link;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                DB::commit();
                // all good
                return Redirect::back()->with('success', 'La entrada se ha creado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Archivo") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'archivos.*' => 'required|file',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
            ]);

            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();
                //aqui va lo de los archivos
                if ($request->file('archivos')) {
                    foreach ($request->file('archivos') as $file) {
                        $archivo = $file->store('public/archivos_cursos');
                        $name = $file->hashName();
                        $newFile = new File();
                        $newFile->archivo = $name;
                        $newFile->entry_id = $entrada->id;
                        $newFile->save();
                    }
                }
                DB::commit();
                // all good
                return Redirect::back()->with('success', 'La entrada se ha creado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Asignacion") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'contenido' => 'required',
                'archivos' => 'nullable|file',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'permitir_envios_retrasados' => 'required|boolean',
                'fecha_de_apertura' => 'required|date',
                'fecha_de_entrega' => 'required|date',
                'hora_de_apertura' => 'required|date_format:H:i',
                'hora_de_entrega' => 'required|date_format:H:i',
            ]);

            //comprobar curso y modulo
        }
        if ($tipo == "Examen") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'link' => 'required|url',
                'contenido' => 'nullable',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'permitir_envios_retrasados' => 'required|boolean',
                'fecha_de_apertura' => 'required|date',
                'fecha_de_entrega' => 'required|date',
                'hora_de_apertura' => 'required|date_format:H:i',
                'hora_de_entrega' => 'required|date_format:H:i',
            ]);

            //comprobar curso y modulo
        }
        dd($request);
    }
}