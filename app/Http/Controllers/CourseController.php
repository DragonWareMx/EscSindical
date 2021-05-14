<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use App\Models\User;
use App\Models\Course;
use App\Models\Log;
use Illuminate\Support\Facades\DB;


class CourseController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index()
    {
        $user = User::find(Auth::id());

        if ($user->roles[0]->name == 'Ponente') {
            $cursos = Course::where('teacher_id', Auth::id())->with('users')->get();

            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'courses' => function ($query) {
                        $query->join('users', 'users.id', '=', 'courses.teacher_id');
                    }
                ])->where('id', Auth::id())->first(),
                'cursos' => fn () => $cursos,
            ]);
        } else {
            $curso_actual = $user->courses[0];
            $profesor = $curso_actual->teacher;
            $tags = $curso_actual->tags;
            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'courses' => function ($query) {
                        $query->join('users', 'users.id', '=', 'courses.teacher_id');
                    }
                ])->where('id', Auth::id())->first(),
                'profesor' => $profesor,
                'tags' => $tags,
            ]);
        }
    }

    public function store(Request $request)
    {

        //VALIDAMOS DATOS
        $validated = $request->validate([
            'nombre' => 'required|max:255',
            'tags' => 'required',
            'dateIni' => 'required',
            'dateFin' => 'required',
            'link' => 'required',
            'vc' => 'required',
            'categorias' => 'required',
            'tipo' => 'required',
            'descripcion' => 'required',
            'imgs' => 'required',
        ]);

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            //SE CREA EL NUEVO CURSO
            $newCourse = new Course;

            $newCourse->nombre = $request->foto;
            $newCourse->fecha_inicio = $request->nombre;
            $newCourse->fecha_limite = $request->apellido_p;
            //falta max no sé que sea
            $newCourse->valor_curricular = $request->apellido_m;
            $newCourse->acceso = $request->fecha_nac;
            $newCourse->estatus = $request->fecha_nac;
            $newCourse->tipo = $request->fecha_nac;
            $newCourse->descripcion = $request->fecha_nac;
            $newCourse->tipo_acceso = $request->fecha_nac;
            $newCourse->teacher_id = Auth::id();

            $newCourse->save();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'create';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '';
            //falta agregar el accion del log, es un json

            //GUARDAMOS EL LOG

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }

        if ($newCourse) {
            return response()->json(["status" => 200]);
        }
    }

    public function searchIndex()
    {
        return Inertia::render('Cursos/BuscarCursos', ['cursos' => fn () => Course::with(['teacher', 'tags'])->get()]);
    }
}