<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Entry;
use App\Models\File;
use App\Models\Log;
use App\Models\Module;
use App\Models\Notification;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        Gate::authorize('haveaccess', 'ponente.perm');
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
                //SE GUARDA LA ENTRADA
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado una nueva entrada de tipo ' . $entrada->tipo . ' para el modulo ' . $modulo->nombre . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //aqui va lo de los archivos
                if ($request->file('archivos')) {
                    foreach ($request->file('archivos') as $file) {
                        $archivo = $file->store('public/archivos_cursos');
                        $name = $file->hashName();
                        $newFile = new File();
                        $newFile->archivo = $name;
                        $newFile->original = $file->getClientOriginalName();
                        $newFile->entry_id = $entrada->id;
                        $newFile->save();
                    }
                }
                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha creado con éxito!');
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
                //SE CREA LA ENTRADA
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado una nueva entrada de tipo ' . $entrada->tipo . ' para el modulo ' . $modulo->nombre . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //aqui va lo de los archivos
                if ($request->file('archivos')) {
                    foreach ($request->file('archivos') as $file) {
                        $archivo = $file->store('public/archivos_cursos');
                        $name = $file->hashName();
                        $newFile = new File();
                        $newFile->archivo = $name;
                        $newFile->original = $file->getClientOriginalName();
                        $newFile->entry_id = $entrada->id;
                        $newFile->save();
                    }
                }
                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha creado con éxito!');
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
                //se crea la entrada
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->link = $request->link;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        link: ' . $request->link . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado una nueva entrada de tipo ' . $entrada->tipo . ' para el modulo ' . $modulo->nombre . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha creado con éxito!');
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
                'archivos' => 'required|file',
                'visible' => 'required|boolean',
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
                //se crea la entrada
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado una nueva entrada de tipo ' . $entrada->tipo . ' para el modulo ' . $modulo->nombre . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //aqui va lo de los archivos
                if ($request->file('archivos')) {
                    foreach ($request->file('archivos') as $file) {
                        $archivo = $file->store('public/archivos_cursos');
                        $name = $file->hashName();
                        $newFile = new File();
                        $newFile->archivo = $name;
                        $newFile->original = $file->getClientOriginalName();
                        $newFile->entry_id = $entrada->id;
                        $newFile->save();
                    }
                }
                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha creado con éxito!');
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
                'archivos.*' => 'nullable|file',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'permitir_envios_retrasados' => 'required|boolean',
                'fecha_de_apertura' => 'required|date',
                'fecha_de_entrega' => 'required|date',
                'hora_de_apertura' => 'required|date_format:H:i',
                'hora_de_entrega' => 'required|date_format:H:i',
                'max_calif' => 'required|numeric|min:1|max:100',
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
            //comprobar fechas de apertura y de entrega
            $fechaAp = new DateTime($request->fecha_de_apertura . '' . $request->hora_de_apertura);
            $fechaEn = new DateTime($request->fecha_de_entrega . '' . $request->hora_de_entrega);
            if ($fechaAp >= $fechaEn) {
                return Redirect::back()->with('error', 'La fecha de entrega no puede ser menor a la fecha de apertura.');
            }

            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //se crea la entrada
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->max_calif = $request->max_calif;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->fecha_de_apertura = $request->fecha_de_apertura . ' ' . $request->hora_de_apertura;
                $entrada->fecha_de_entrega = $request->fecha_de_entrega . ' ' . $request->hora_de_entrega;
                $entrada->visible = $request->visible;
                $entrada->permitir_envios_retrasados = $request->permitir_envios_retrasados;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        max_calif: ' . $request->max_calif . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        fecha_de_apertura: ' . $request->fecha_de_apertura . ' ' . $request->hora_de_apertura . ',\n
                        fecha_de_entrega: ' .  $request->fecha_de_entrega . ' ' . $request->hora_de_entrega . ',\n
                        permitir_envios_retrasados: ' . $request->permitir_envios_retrasados . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado una nueva entrada de tipo ' . $entrada->tipo . ' para el modulo ' . $modulo->nombre . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //aqui va lo de la notificacion xd
                if ($request->notificacion) {
                    foreach ($curso->users()->get() as $user) {
                        $notificacion = new Notification();
                        $notificacion->user_id = $user->id;
                        $notificacion->titulo = "Se te ha asignado una nueva actividad";
                        $notificacion->link = '/cursos/' . $curso->id . '/modulo/' . $request->modulo . '/asignacion/' . $entrada->id;
                        $notificacion->visto = false;
                        $notificacion->save();
                    }
                }

                //aqui va lo de los archivos
                if ($request->file('archivos')) {
                    foreach ($request->file('archivos') as $file) {
                        $archivo = $file->store('public/archivos_cursos');
                        $name = $file->hashName();
                        $newFile = new File();
                        $newFile->archivo = $name;
                        $newFile->original = $file->getClientOriginalName();
                        $newFile->entry_id = $entrada->id;
                        $newFile->save();
                    }
                }
                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha creado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
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
                'fecha_de_apertura' => 'required|date|after_or_equal:today',
                'fecha_de_entrega' => 'required|date|after_or_equal:fecha_de_apertura',
                'hora_de_apertura' => 'required|date_format:H:i',
                'hora_de_entrega' => 'required|date_format:H:i',
                'max_calif' => 'required|numeric|min:1|max:100',
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

            //comprobar fechas de apertura y de entrega
            if ($request->fecha_de_apertura == $request->fecha_de_entrega) {
                if ($request->hora_de_apertura > $request->hora_de_entrega) {
                    return Redirect::back()->with('error', 'La hora de entrega no puede ser menor a la hora de apertura.');
                }
            }

            $fechaAp = new DateTime($request->fecha_de_apertura . '' . $request->hora_de_apertura);
            $fechaEn = new DateTime($request->fecha_de_entrega . '' . $request->hora_de_entrega);

            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //se crea la entrada
                $entrada = new Entry();
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->link = $request->link;
                $entrada->max_calif = $request->max_calif;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->fecha_de_apertura = $request->fecha_de_apertura . ' ' . $request->hora_de_apertura;
                $entrada->fecha_de_entrega = $request->fecha_de_entrega . ' ' . $request->hora_de_entrega;
                $entrada->visible = $request->visible;
                $entrada->permitir_envios_retrasados = $request->permitir_envios_retrasados;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        link: ' . $request->link . ',\n
                        max_calif: ' . $request->max_calif . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        fecha_de_apertura: ' . $request->fecha_de_apertura . ' ' . $request->hora_de_apertura . ',\n
                        fecha_de_entrega: ' .  $request->fecha_de_entrega . ' ' . $request->hora_de_entrega . ',\n
                        permitir_envios_retrasados: ' . $request->permitir_envios_retrasados . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado una nueva entrada de tipo ' . $entrada->tipo . ' para el modulo ' . $modulo->nombre . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //aqui va lo de la notificacion xd
                if ($request->notificacion) {
                    foreach ($curso->users()->get() as $user) {
                        $notificacion = new Notification();
                        $notificacion->user_id = $user->id;
                        $notificacion->titulo = "Se te ha asignado un nuevo examen";
                        $notificacion->link = '/cursos/' . $curso->id . '/modulo/' . $request->modulo . '/asignacion/' . $entrada->id;
                        $notificacion->visto = false;
                        $notificacion->save();
                    }
                }

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha creado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar crear la entrada, inténtelo más tarde.');
            }
        }
    }

    public function edit($id)
    {
        Gate::authorize('haveaccess', 'ponente.perm');
        $entry = Entry::with(['module:id,nombre,course_id', 'module.course:id,nombre', 'files:entry_id,original,archivo'])->findOrFail($id);
        $cursos = Course::with('modules')->where('teacher_id', Auth::user()->id)->get();
        $viledruid = false;
        foreach ($cursos as $curso) {
            foreach ($curso->modules()->get() as $modulo) {
                if ($modulo->id == $entry->module_id) {
                    $viledruid = true;
                }
            }
        }
        if (!$viledruid) {
            abort(403);
        }
        return Inertia::render('Entradas/Editar', ['cursos' => fn () => $cursos, 'entry' => fn () => $entry]);
    }

    public function delete($id)
    {
        Gate::authorize('haveaccess', 'ponente.perm');
        DB::beginTransaction();
        try {
            $entry = Entry::with(['module:id,nombre,course_id', 'module.course:id,nombre'])->findOrFail($id);
            $cursos = Course::with('modules')->where('teacher_id', Auth::user()->id)->get();
            $viledruid = false;
            foreach ($cursos as $curso) {
                foreach ($curso->modules()->get() as $modulo) {
                    if ($modulo->id == $entry->module_id) {
                        $viledruid = true;
                    }
                }
            }
            if (!$viledruid) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar eliminar la entrada, inténtelo más tarde.');
            }

            $entry->delete();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'delete';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
                entries: {
                    id: ' . $id .
                '}
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha eliminado la entrada con id: ' . $id;

            $newLog->save();

            DB::commit();
            // all good
            return Redirect::back()->with('success', '¡Entrada eliminada con éxito!');
        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
            return Redirect::back()->with('error', 'Ha ocurrido un error al intentar eliminar la entrada, inténtelo más tarde.');
        }
    }

    public function update($id, Request $request)
    {
        Gate::authorize('haveaccess', 'ponente.perm');
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
                'modFiles' => 'required|boolean',
                'archivos.*' => 'nullable|file'
            ]);
            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //SE GUARDA LA ENTRADA
                $entrada = Entry::findOrFail($id);
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado una entrada de tipo ' . $entrada->tipo . ' con el id ' . $entrada->id . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //MODIFICAR ARCHIVOS
                if ($request->modFiles) {
                    //esto es para borrar los archivos viejos
                    $actuales = $entrada->files()->get();
                    foreach ($actuales as $archivo) {
                        Storage::delete('public/archivos_cursos/' . $archivo->archivo);
                        $archivo->forceDelete();
                    }
                    //aqui va lo de los archivos
                    if ($request->file('archivos')) {
                        foreach ($request->file('archivos') as $file) {
                            $archivo = $file->store('public/archivos_cursos');
                            $name = $file->hashName();
                            $newFile = new File();
                            $newFile->archivo = $name;
                            $newFile->original = $file->getClientOriginalName();
                            $newFile->entry_id = $entrada->id;
                            $newFile->save();
                        }
                    }
                }

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha editado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Informacion") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'contenido' => 'required',
                'visible' => 'required|boolean',
                'archivos.*' => 'nullable|file',
                'modFiles' => 'required|boolean',
            ]);

            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //SE CREA LA ENTRADA
                $entrada = Entry::findOrFail($id);
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado una entrada de tipo ' . $entrada->tipo . ' con el id ' . $entrada->id . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //MODIFICAR ARCHIVOS
                if ($request->modFiles) {
                    //esto es para borrar los archivos viejos
                    $actuales = $entrada->files()->get();
                    foreach ($actuales as $archivo) {
                        Storage::delete('public/archivos_cursos/' . $archivo->archivo);
                        $archivo->forceDelete();
                    }
                    //aqui va lo de los archivos
                    if ($request->file('archivos')) {
                        foreach ($request->file('archivos') as $file) {
                            $archivo = $file->store('public/archivos_cursos');
                            $name = $file->hashName();
                            $newFile = new File();
                            $newFile->archivo = $name;
                            $newFile->original = $file->getClientOriginalName();
                            $newFile->entry_id = $entrada->id;
                            $newFile->save();
                        }
                    }
                }

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha editado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Enlace") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'link' => 'required|url',
                'visible' => 'required|boolean',
                'modFiles' => 'required|boolean',
            ]);

            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //se crea la entrada
                $entrada = Entry::findOrFail($id);
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->link = $request->link;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        link: ' . $request->link . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado una entrada de tipo ' . $entrada->tipo . ' con el id ' . $entrada->id . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //MODIFICAR ARCHIVOS
                if ($request->modFiles) {
                    //esto es para borrar los archivos viejos
                    $actuales = $entrada->files()->get();
                    foreach ($actuales as $archivo) {
                        Storage::delete('public/archivos_cursos/' . $archivo->archivo);
                        $archivo->forceDelete();
                    }
                }

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha editado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Archivo") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'archivos' => 'required|file',
                'visible' => 'required|boolean',
                'modFiles' => 'required|boolean',
            ]);
            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //se crea la entrada
                $entrada = Entry::findOrFail($id);
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->module_id = $request->modulo;
                $entrada->visible = $request->visible;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        module_id: ' . $request->modulo . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado una entrada de tipo ' . $entrada->tipo . ' con el id ' . $entrada->id . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //MODIFICAR ARCHIVOS
                if ($request->modFiles) {
                    //esto es para borrar los archivos viejos
                    $actuales = $entrada->files()->get();
                    foreach ($actuales as $archivo) {
                        Storage::delete('public/archivos_cursos/' . $archivo->archivo);
                        $archivo->forceDelete();
                    }
                    //aqui va lo de los archivos
                    if ($request->file('archivos')) {
                        foreach ($request->file('archivos') as $file) {
                            $archivo = $file->store('public/archivos_cursos');
                            $name = $file->hashName();
                            $newFile = new File();
                            $newFile->archivo = $name;
                            $newFile->original = $file->getClientOriginalName();
                            $newFile->entry_id = $entrada->id;
                            $newFile->save();
                        }
                    }
                }

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha editado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
        }
        if ($tipo == "Asignacion") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255'],
                'contenido' => 'required',
                'archivos.*' => 'nullable|file',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'permitir_envios_retrasados' => 'required|boolean',
                'fecha_de_apertura' => 'required|date',
                'fecha_de_entrega' => 'required|date',
                'hora_de_apertura' => 'required|date_format:H:i',
                'hora_de_entrega' => 'required|date_format:H:i',
                'max_calif' => 'required|numeric|min:1|max:100',
                'modFiles' => 'required|boolean',
            ]);

            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            //comprobar fechas de apertura y de entrega
            $fechaAp = new DateTime($request->fecha_de_apertura . '' . $request->hora_de_apertura);
            $fechaEn = new DateTime($request->fecha_de_entrega . '' . $request->hora_de_entrega);
            if ($fechaAp >= $fechaEn) {
                return Redirect::back()->with('error', 'La fecha de entrega no puede ser menor a la fecha de apertura.');
            }

            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //se crea la entrada
                $entrada =  Entry::findOrFail($id);
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->max_calif = $request->max_calif;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->fecha_de_apertura = $request->fecha_de_apertura . ' ' . $request->hora_de_apertura;
                $entrada->fecha_de_entrega = $request->fecha_de_entrega . ' ' . $request->hora_de_entrega;
                $entrada->visible = $request->visible;
                $entrada->permitir_envios_retrasados = $request->permitir_envios_retrasados;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        max_calif: ' . $request->max_calif . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        fecha_de_apertura: ' . $request->fecha_de_apertura . ' ' . $request->hora_de_apertura . ',\n
                        fecha_de_entrega: ' .  $request->fecha_de_entrega . ' ' . $request->hora_de_entrega . ',\n
                        permitir_envios_retrasados: ' . $request->permitir_envios_retrasados . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado una entrada de tipo ' . $entrada->tipo . ' con el id ' . $entrada->id . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //aqui va lo de la notificacion xd
                if ($request->notificacion) {
                    foreach ($curso->users()->get() as $user) {
                        $notificacion = new Notification();
                        $notificacion->user_id = $user->id;
                        $notificacion->titulo = "Se te ha asignado una nueva actividad";
                        $notificacion->visto = false;
                        $notificacion->save();
                    }
                }

                //MODIFICAR ARCHIVOS
                if ($request->modFiles) {
                    //esto es para borrar los archivos viejos
                    $actuales = $entrada->files()->get();
                    foreach ($actuales as $archivo) {
                        Storage::delete('public/archivos_cursos/' . $archivo->archivo);
                        $archivo->forceDelete();
                    }
                    //aqui va lo de los archivos
                    if ($request->file('archivos')) {
                        foreach ($request->file('archivos') as $file) {
                            $archivo = $file->store('public/archivos_cursos');
                            $name = $file->hashName();
                            $newFile = new File();
                            $newFile->archivo = $name;
                            $newFile->original = $file->getClientOriginalName();
                            $newFile->entry_id = $entrada->id;
                            $newFile->save();
                        }
                    }
                }

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha editado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
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
                'fecha_de_apertura' => 'required|date|after_or_equal:today',
                'fecha_de_entrega' => 'required|date|after_or_equal:fecha_de_apertura',
                'hora_de_apertura' => 'required|date_format:H:i',
                'hora_de_entrega' => 'required|date_format:H:i',
                'max_calif' => 'required|numeric|min:1|max:100',
                'modFiles' => 'required|boolean',
            ]);

            //comprobar curso y modulo
            $curso = Course::with('modules')->where([
                ['teacher_id', Auth::user()->id,],
                ['id', $request->curso]
            ])->first();
            if (!$curso) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
            $modulo = Module::where([
                ['id', $request->modulo],
                ['course_id', $curso->id]
            ])->first();
            if (!$modulo) {
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }

            //comprobar fechas de apertura y de entrega
            if ($request->fecha_de_apertura == $request->fecha_de_entrega) {
                if ($request->hora_de_apertura > $request->hora_de_entrega) {
                    return Redirect::back()->with('error', 'La hora de entrega no puede ser menor a la hora de apertura.');
                }
            }

            $fechaAp = new DateTime($request->fecha_de_apertura . '' . $request->hora_de_apertura);
            $fechaEn = new DateTime($request->fecha_de_entrega . '' . $request->hora_de_entrega);

            //aqui empieza la transaccion
            DB::beginTransaction();
            try {
                //se edita la entrada
                $entrada =  Entry::findOrFail($id);
                $entrada->titulo = $request->titulo;
                $entrada->tipo = $request->tipo;
                $entrada->link = $request->link;
                $entrada->max_calif = $request->max_calif;
                $entrada->contenido = $request->contenido;
                $entrada->module_id = $request->modulo;
                $entrada->fecha_de_apertura = $request->fecha_de_apertura . ' ' . $request->hora_de_apertura;
                $entrada->fecha_de_entrega = $request->fecha_de_entrega . ' ' . $request->hora_de_entrega;
                $entrada->visible = $request->visible;
                $entrada->permitir_envios_retrasados = $request->permitir_envios_retrasados;
                $entrada->save();

                //SE CREA EL LOG
                $newLog = new Log();
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    entries: {
                        titulo: ' . $request->titulo . ',\n
                        tipo: ' . $request->tipo . ',\n
                        link: ' . $request->link . ',\n
                        max_calif: ' . $request->max_calif . ',\n
                        contenido: ' . $request->contenido . ',\n
                        module_id: ' . $request->modulo . ',\n
                        fecha_de_apertura: ' . $request->fecha_de_apertura . ' ' . $request->hora_de_apertura . ',\n
                        fecha_de_entrega: ' .  $request->fecha_de_entrega . ' ' . $request->hora_de_entrega . ',\n
                        permitir_envios_retrasados: ' . $request->permitir_envios_retrasados . ',\n
                        visible: ' . $request->visible .
                    '}
                }';
                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado una entrada de tipo ' . $entrada->tipo . ' con el id ' . $entrada->id . ' en el curso ' . $curso->nombre;
                //SE GUARDA EL LOG
                $newLog->save();

                //MODIFICAR ARCHIVOS
                if ($request->modFiles) {
                    //esto es para borrar los archivos viejos
                    $actuales = $entrada->files()->get();
                    foreach ($actuales as $archivo) {
                        Storage::delete('public/archivos_cursos/' . $archivo->archivo);
                        $archivo->forceDelete();
                    }
                }

                DB::commit();
                // all good
                return Redirect::route('cursos.informacion', $curso->id)->with('success', 'La entrada se ha editado con éxito!');
            } catch (\Exception $e) {
                DB::rollback();
                // something went wrong
                return Redirect::back()->with('error', 'Ha ocurrido un error al intentar editar la entrada, inténtelo más tarde.');
            }
        }
    }

    public function doExam($id, $mid, $eid)
    {
        Gate::authorize('haveaccess', 'alumno.perm');

        //busca el curso
        $curso = Course::with('modules:course_id,id,nombre,numero')->select('id', 'nombre')->findOrFail($id);

        //Si no existe el curso quiere decir que algo anda mal y por eso se regresa a la vista de error
        if (!$curso) {
            return abort(404);
        }

        //verifica que el usuario auth sea alumno del curso
        $validador = false;
        foreach (Auth::user()->courses()->get() as $cursoA) {
            if ($cursoA->id == $curso->id)
                $validador = true;
        }
        if (!$validador)
            abort(403);

        //Buscar el modulo con el mid
        $modulo = Module::select('id', 'nombre', 'course_id')->findOrFail($mid);

        //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
        if (!$modulo) {
            return abort(404);
        }

        //verifica que el modulo pertenezca al curso
        if ($modulo->course_id != $curso->id) {
            //si no está lo mandamos a la vista informacion -  solo si es alumno
            abort(403);
        }

        // Buscar la asignacion
        $entrada = Entry::findOrFail($eid);


        //Si no existe la entrada quiere decir que algo anda mal y por eso se regresa a la vista de error
        if (!$entrada) {
            return abort(404);
        }

        //verificar que la entrada sea asingacion o examen
        if ($entrada->tipo != 'Examen') {
            abort(403);
        }

        //verifica que pertenezca al modulo
        if ($entrada->module_id != $modulo->id) {
            abort(403);
        }

        return Inertia::render('Curso/Examen', [
            'curso' => $curso,
            'modulo' => $modulo,
            'asignacion' => $entrada,
        ]);
    }

    public function cancelarEntrega($id, $mid, $pid){
        \Gate::authorize('haveaccess', 'alumno.perm');

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            //busca el curso
            $curso = Course::findOrFail($id);

            //Si no existe el curso quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$curso) {
                return abort(404);
            }

            //verifica que el usuario auth sea alumno del curso
            $validador = false;
            foreach (Auth::user()->courses()->get() as $cursoA) {
                if ($cursoA->id == $curso->id)
                    $validador = true;
            }
            if (!$validador)
                abort(403);

            //Buscar el modulo con el mid
            $modulo = Module::findOrFail($mid);

            //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$modulo) {
                return abort(404);
            }

            //verifica que el modulo pertenezca al curso
            if ($modulo->course_id != $curso->id) {
                //si no está lo mandamos a la vista informacion -  solo si es alumno
                abort(403);
            }

            // Buscar la asignacion
            $entrada = Entry::findOrFail($pid);


            //Si no existe la entrada quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$entrada) {
                abort(404);
            }

            //verificar que la entrada sea asingacion
            if ($entrada->tipo != 'Asignacion') {
                abort(403);
            }

            //verifica que pertenezca al modulo
            if ($entrada->module_id != $modulo->id) {
                abort(403);
            }

            $validador = false;
            $file = null;
            //verifica que haya otra entrega pero que no este calificado
            foreach ($entrada->users as $tarea) {
                if($tarea->id == Auth::user()->id){
                    if(!is_null($tarea->pivot->archivo)){
                        $file = $tarea->pivot->archivo;
                    }
                    if(is_null($tarea->pivot->calificacion)){
                        $validador = true;
                    }
                }
            }
            if (!$validador)
                abort(403);

            //se elimina el archivo
            if($file)
            {
                unlink(storage_path('app\public\entregas_asignaciones\\'.$file));
            }
            $entrada->users()->detach(Auth::user()->id);

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'delete';
            $newLog->user_id = Auth::id();
            $newLog->accion = "{}";

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha eliminado la entrega de asignacion de id: ' . $entrada->id;

            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();

            return \Redirect::back()->with('success', 'Entrega eliminada.');
        } catch (\Exception $e) {
            DB::rollBack();
            // dd($e);
            return \Redirect::back()->with('error', 'No fue posible enviar la asignación, vuelve a intentarlo.');
        }
    }
}