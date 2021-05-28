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
                'archivos' => 'file'
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
                'archivos' => 'file'
            ]);

            //comprobar curso y modulo
        }
        dd($request);
    }
}