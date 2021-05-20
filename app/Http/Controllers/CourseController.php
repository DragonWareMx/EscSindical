<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use App\Models\Course;
use App\Models\Tag;
use App\Models\Log;


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

    public function create()
    {
        return Inertia::render('Cursos/FormCurso');
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

            $newCourse->nombre = $request->nombre;
            $newCourse->fecha_inicio = $request->dateIni;
            $newCourse->fecha_final = $request->dateFin;
            $newCourse->max = 100;
            $newCourse->valor_curricular = $request->vc;
            $newCourse->tipo_acceso = $request->tipo;
            $newCourse->descripcion = $request->descripcion;
            $newCourse->teacher_id = Auth::id();
            $newCourse->link = $request->link;

            $newCourse->save();
            //SE AGREGAN REGISTROS A SUS RELACIONES
            //TAGS
            $tags = $request->tags;
            $tags_ids = [];
            $i =0;
            foreach ($tags as $tag) {
                if (Tag::where('nombre',$tag['tag'])->first()!=null){
                    $oldTag = Tag::where('nombre',$tag['tag'])->first();
                    $tags_ids[$i] = $oldTag->id;  
                }
                else {
                    $newTag = new Tag;
                    $newTag->nombre = $tag['tag'];
                    $newTag->save();
                    
                    $tags_ids[$i] = $newTag->id;
                }
                $i++;
            }
            
            $newCourse->tags()->sync($tags_ids);
            //CATEGORIAS


            //IMÁGENES
                   
            //SE CREA EL LOG
            // $newLog = new Log;

            // $newLog->categoria = 'create';
            // $newLog->user_id = Auth::id();
            // $newLog->accion =
            //     '';
            //falta agregar el accion del log, es un json

            //GUARDAMOS EL LOG

            DB::commit();
            return \Redirect::route('cursos')->with('success','El usuario ha sido registrado con éxito!');

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => $e]);
        }    
    }

    public function searchIndex(Request $request)
    {
        $cursos = Course::with(['teacher', 'tags', 'images'])->paginate(12);

        if ($request->wantsJson()) {
            return $cursos;
        }

        return Inertia::render('Cursos/BuscarCursos', ['cursos' => fn () => $cursos]);
    }

    public function layout(){
        return Inertia::render('Cursos/layoutCursos');
    }

    public function prueba(){
        return Inertia::render('Cursos/Prueba');
    }

    public function informacion($id){
        return Inertia::render('Curso/Informacion',[
            'curso'=>Course::findOrFail($id),
        ]);
    }

    public function modulos($id){
        return Inertia::render('Curso/Modulos',[
            'curso'=>Course::findOrFail($id),
        ]);
    } 
}