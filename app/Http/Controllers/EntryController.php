<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

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
                'titulo' =>  ['required', 'max:255', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
                'contenido' => 'required',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'archivos' => 'nullable|file'
            ]);
        }
        if ($tipo == "Informacion") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
                'contenido' => 'required',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
                'archivos' => 'nullable|file'
            ]);

            //comprobar curso y modulo
        }
        if ($tipo == "Enlace") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
                'link' => 'required|url',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
            ]);

            //comprobar curso y modulo
        }
        if ($tipo == "Archivo") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
                'archivos' => 'required|file',
                'visible' => 'required|boolean',
                'notificacion' => 'required|boolean',
            ]);

            //comprobar curso y modulo
        }
        if ($tipo == "Asignacion") {
            $validated = $request->validate([
                'curso' => 'required|numeric|exists:courses,id',
                'modulo' => 'required|numeric|exists:modules,id',
                'titulo' =>  ['required', 'max:255', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
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
                'titulo' =>  ['required', 'max:255', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
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