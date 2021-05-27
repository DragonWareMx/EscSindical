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
use App\Models\Image;
use App\Models\Training_type;



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
            \Gate::authorize('haveaccess', 'ponente.perm');
            $cursos = Course::where('teacher_id', Auth::id())->where('estatus', 'Activo')->with('users','images')->get();

            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'activeCourses', 'activeCourses.images'  
                ])->where('id', Auth::id())->first(),
                'cursos' => fn () => $cursos,
            ]);
        } else {
            \Gate::authorize('haveaccess', 'alumno.perm');
            $curso_actual = $user->courses[0];
            $profesor = $curso_actual->teacher;
            $tags = $curso_actual->tags;
            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'activeCourses' ,'activeCourses.images'
                ])->where('id', Auth::id())->first(),
                'profesor' => $profesor,
                'tags' => $tags,
            ]);
        }
    }

    public function create()
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        
        return Inertia::render('Cursos/FormCurso', [ 
        'capacitaciones'=> Training_type::get(),
        ]);
    }

    public function moduleCreate()
    {
        return Inertia::render('Cursos/ModuleCreate');
    }

    public function moduleEdit($id)
    {
        return Inertia::render('Cursos/ModuleEdit');
    }

    public function store(Request $request)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        //dd($request);
        //VALIDAMOS DATOS
        $validated = $request->validate([
            'nombre' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'tags' => 'required',
            'fecha_inicio' => 'required|date|after:today',
            'fecha_final' => 'required|date|after:fecha_inicio',
            'link' => 'required|url',
            'vc' => 'required|boolean',
            'tipos_de_capacitacion' => 'required',
            'tipo_inscripcion' => 'required|exists:courses,tipo_acceso',
            'descripcion' => 'required',
            'imgs' => 'required|image|mimes:jpeg,png,jpg,gif|max:51200',
            'maximo' =>'required|digits_between:1,3|numeric',
            'inicio_inscripciones' =>'nullable|date|after:today|before:fecha_inicio',
            'final_inscripciones' =>'nullable|date|after:inicio_inscripciones|before:fecha_inicio',
            //las inscripciones podrán seguir después de iniciado el curso?
        ]);

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();
        
        $imagen = null;
        try {
            //SE CREA EL NUEVO CURSO
            $newCourse = new Course;

            $newCourse->nombre = $request->nombre;
            $newCourse->fecha_inicio = $request->fecha_inicio;
            $newCourse->fecha_final = $request->fecha_final;
            $newCourse->max = $request->maximo;
            $newCourse->valor_curricular = $request->vc;
            $newCourse->tipo_acceso = $request->tipo_inscripcion;
            $newCourse->descripcion = $request->descripcion;
            $newCourse->teacher_id = Auth::id();
            $newCourse->link = $request->link;

            if ($request->inicio_inscripciones) $newCourse->inicio_inscripciones = $request->inicio_inscripciones;
            if ($request->final_inscripciones) $newCourse->fecha_limite = $request->final_inscripciones;
                 

            $newCourse->save();
            //SE AGREGAN REGISTROS A SUS RELACIONES
            //TAGS
            $tags = $request->tags;
            $tags_ids = [];
            $i = 0;
            foreach ($tags as $tag) {
                if (Tag::where('nombre', $tag['tag'])->first() != null) {
                    $oldTag = Tag::where('nombre', $tag['tag'])->first();
                    $tags_ids[$i] = $oldTag->id;
                } else {
                    $newTag = new Tag;
                    $newTag->nombre = $tag['tag'];
                    $newTag->save();

                    $tags_ids[$i] = $newTag->id;
                }
                $i++;
            }

            $newCourse->tags()->sync($tags_ids);
            
            //TIPO DE CAPACITACIONES
            $tipos = $request->tipos_de_capacitacion;

            $newCourse->training_types()->sync($tipos);

            //IMÁGENES
            $newImagen = new Image;
            $newImagen->course_id =$newCourse->id;
            $imagen = $request->file('imgs')->store('/public/imagenes_curso');
            $newImagen->imagen = $request->file('imgs')->hashName();
            
            $newImagen->save();
                   
            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'create';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                courses: {
                    nombre: ' . $request->nombre .
                    'fecha_inicio: ' . $request->fecha_inicio .
                    'fecha_final: ' . $request->fecha_final .
                    'valor_curricular: '. $request->vc.                    
                    'tipo_acceso: ' . $request->tipo_inscripcion .
                    'descripcion: '.$request->descripcion.
                    'teacher_id: ' . Auth::id() .
                    'max: ' .$request->maximo.
                    'link: ' . $request->link .
                '},
                tags: ' .\json_encode($tags) .
                'tipos_capacitacion: ' . \json_encode($tipos) .
                'imgs: ' .$request->file('imgs')->hashName() .
                '
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha creado el curso: '. $newCourse->nombre;
                
            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos')->with('success', 'El curso se ha creado exitosamente');
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return \Redirect::route('cursos')->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            //return response()->json(["status" => $e]);
        }
    }

    public function editCourse($id)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        return Inertia::render('Cursos/FormCursoEdit', [
            'curso' => Course::with(['images:imagen', 'tags:nombre'])->findOrFail($id),
            'capacitaciones'=> Training_type::get(),
        ]); 
    }

    public function update($id, Request $request)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        //VALIDAMOS DATOS
        $validated = $request->validate([
            'nombre' => 'required|max:255',
            'tags' => 'required',
            'fecha_inicio' => 'required',
            'fecha_final' => 'required',
            'link' => 'required',
            'vc' => 'required',
            'tipos_de_capacitacion' => 'required',
            'tipo_inscripcion' => 'required',
            'descripcion' => 'required',
            'imgs' => 'required',
        ]);

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            //Se busca curso a editar con id
            $myCourse = Course::findOrFail($id);

            $myCourse->nombre = $request->nombre;
            $myCourse->fecha_inicio = $request->fecha_inicio;
            $myCourse->fecha_final = $request->fecha_final;
            $myCourse->max = 100;
            $myCourse->valor_curricular = $request->vc;
            $myCourse->tipo_acceso = $request->tipo_inscripcion;
            $myCourse->descripcion = $request->descripcion;
            $myCourse->teacher_id = Auth::id();
            $myCourse->link = $request->link;

            $myCourse->save();
            //SE AGREGAN REGISTROS A SUS RELACIONES
            //TAGS
            $tags = $request->tags;
            $tags_ids = [];
            $i = 0;
            foreach ($tags as $tag) {
                if (Tag::where('nombre', $tag['tag'])->first() != null) {
                    $oldTag = Tag::where('nombre', $tag['tag'])->first();
                    $tags_ids[$i] = $oldTag->id;
                } else {
                    $newTag = new Tag;
                    $newTag->nombre = $tag['tag'];
                    $newTag->save();

                    $tags_ids[$i] = $newTag->id;
                }
                $i++;
            }

            $myCourse->tags()->sync($tags_ids);
            //tipos_de_capacitacion


            //IMÁGENES

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'update';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
                courses: {
                    nombre: ' . $request->nombre .
                    'fecha_inicio: ' . $request->fecha_inicio .
                    'fecha_final: ' . $request->fecha_final .
                    'max: ' . $request->max .
                    'valor_curricular: '. $request->vc.
                    
                    'tipo_acceso: ' . $request->tipo_inscripcion .
                    'descripcion: '.$request->descripcion.
                    'teacher_id: ' . Auth::id() .
                    
                    'link: ' . $request->link .
                '}

            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado el curso: ' . $myCourse->nombre;

            //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos')->with('success', 'El curso se ha actualizado exitosamente');
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::route('cursos')->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            //return response()->json(["status" => $e]);
        }
    }

    public function delete($id)
    {

        \Gate::authorize('haveaccess', 'admin.perm');
        DB::beginTransaction();
        try {
            $course = User::find($id);

            $course->delete();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'delete';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
                courses: {
                    id: ' . $id .
                '}
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha eliminado el curso: ' . $course->nombre;

            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos')->with('success', '¡Curso eliminado con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar procesar tu solicitud, inténtelo más tarde.');
        }
    }

    public function searchIndex(Request $request)
    {
        $cursos = Course::with(['teacher:nombre,apellido_p,apellido_m,foto,id', 'tags:nombre', 'images:imagen,course_id'])
            ->when($request->busqueda, function ($query, $busqueda) {
                $searchValues = preg_split('/\s+/', $busqueda, -1, PREG_SPLIT_NO_EMPTY);
                foreach ($searchValues as $value) {
                    $query->where('courses.nombre', 'LIKE', '%' . $value . '%')
                        ->orWhereHas('tags', function ($query) use ($value) {
                            $query->where('nombre', 'LIKE', '%' . $value . '%');
                        });
                }
            })
            ->select('courses.nombre', 'courses.fecha_inicio', 'courses.fecha_final', 'courses.id', 'courses.teacher_id', 'courses.inicio_inscripciones', 'courses.fecha_limite')
            ->paginate(12);

        $cursosParaTi = Course::with(['teacher:nombre,apellido_p,apellido_m,foto,id', 'tags:nombre', 'images:imagen,course_id', 'training_types'])
            ->whereHas('training_types', function ($query) {
                $query->whereHas('categories', function ($query2) {
                    $query2->where('categories.id', Auth::User()->category->id);
                });
            })
            ->select('courses.nombre', 'courses.fecha_inicio', 'courses.fecha_final', 'courses.id', 'courses.teacher_id', 'courses.inicio_inscripciones', 'courses.fecha_limite')
            ->take(10)
            ->get();

        //sirve para el scroll infinito
        if ($request->wantsJson()) {
            return $cursos;
        }

        return Inertia::render('Cursos/BuscarCursos', [
            'cursos' => fn () => $cursos,
            'cursosParaTi' => fn () => $cursosParaTi
        ]);
    }

    public function layout()
    {
        return Inertia::render('Cursos/layoutCursos');
    }

    public function informacion($id)
    {
        return Inertia::render('Curso/Informacion', [
            'curso' => Course::with('images:imagen,course_id', 'tags:nombre')->findOrFail($id),
        ]);
    }

    public function modulos($id)
    {
        return Inertia::render('Curso/Modulos', [
            'curso' => Course::findOrFail($id),
        ]);
    }

    public function participantes($id)
    {
        return Inertia::render('Curso/Participantes', [
            'curso' => Course::findOrFail($id),
        ]);
    }
}