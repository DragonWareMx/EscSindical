<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use App\Permission\Models\Role;
use App\Models\Request as Application;
use App\Models\Course;
use App\Models\Module;
use App\Models\Tag;
use App\Models\Schedule;
use App\Models\Log;
use App\Models\Entry;
use App\Models\Notification;
use App\Models\Image;
use App\Models\Training_type;
use App\Models\Drop_requests;
use App\Models\Delete_requests;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

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
            $cursos = Course::where('teacher_id', Auth::id())->where('estatus', 'Activo')->with('users', 'images')->get();
            $OldCourses = Course::where('teacher_id', Auth::id())->where('estatus', 'Terminado')->with('users', 'images', 'tags',)->get();
            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'activeCourses', 'activeCourses.images'
                ])->where('id', Auth::id())->first(),
                'cursos' => fn () => $cursos,
                'finishedCourses' => $OldCourses,
            ]);
        } else if($user->roles[0]->name == 'Alumno') {
            \Gate::authorize('haveaccess', 'alumno.perm');
            $curso_actual='';
            $profesor='';
            $tags='';
            if(count($user->activeCourses) > 0){
                $curso_actual = $user->activeCourses[0];
                $profesor = $curso_actual->teacher;
                $tags = $curso_actual->tags;
            }
            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'requests', 'requests.course.images', 'requests.course.teacher', 'requests.course.tags', 'activeCourses', 'activeCourses.images', 'finishedCourses', 'finishedCourses.images', 'finishedCourses.teacher', 'finishedCourses.tags'
                ])->where('id', Auth::id())->first(),
                'profesor' => $profesor,
                'tags' => $tags,
            ]);
        }
        else {
            return \Redirect::route('cursosBuscar');
        }
    }

    public function inicio()
    {
        
        $user = User::find(Auth::id());
        if ($user->roles[0]->name == 'Alumno') {
            return $this->inicioEstudiante();
        }
        if ($user->roles[0]->name == 'Administrador') {
            return $this->inicioAdmin();
        }
        if ($user->roles[0]->name == 'Ponente') {
            return $this->inicioPonente();
        }
    }

    //  funcion para ver el inicio como estudiante
    public function inicioEstudiante()
    {
        \Gate::authorize('haveaccess', 'alumno.perm');
        $user = User::find(Auth::id());
        if ($user->roles[0]->name == 'Alumno') {
            //  Si el estudiante no tiene un curso activo le muestra la vista de inicio alternativa
            if(count($user->activeCourses) == 0){
                return Inertia::render('Inicio');
            }
            
            $curso_actual = $user->activeCourses[0];
            $profesor = $curso_actual->teacher;
            $tags = $curso_actual->tags;
            $participantes=Course::where('id',$curso_actual->id)->with('users:id,nombre,apellido_p,apellido_m,foto,email')->first();
            $hoy=Carbon::now();
            $entradas = Course::where('courses.id', $curso_actual->id)->leftJoin('modules', 'courses.id', '=', 'modules.course_id')
                ->leftJoin('entries', 'modules.id', '=', 'entries.module_id')
                ->where('entries.visible', 1)
                ->where('entries.fecha_de_entrega','>=',$hoy)
                ->whereIn('entries.tipo', ['Asignacion', 'Examen'])
                ->select('entries.*', 'modules.nombre as modulo', 'modules.numero as numero', 'modules.id as module_id')
                ->orderBy('fecha_de_entrega', 'ASC')
            ->get();

            $realizadas = Course::where('courses.id', $curso_actual->id)->leftJoin('modules', 'courses.id', '=', 'modules.course_id')
            ->leftJoin('entries', 'modules.id', '=', 'entries.module_id')
            ->where('entries.visible', 1)
            ->where('entries.fecha_de_entrega','>=',$hoy)
            ->whereIn('entries.tipo', ['Asignacion', 'Examen'])
            ->join('entry_user', 'entries.id', '=', 'entry_id')
            ->where('entry_user.user_id', $user->id)
            ->orderBy('fecha_de_entrega', 'ASC')
            ->get();

            $pendientes = [];
            $i = 0;
            foreach ($entradas as $entrada) {
                $found = false;
                foreach ($realizadas as $realizada) {
                    if ($entrada->id == $realizada->id) {
                        $found = true;
                        break;
                    }
                }
                if ($found == false) {
                    $pendientes[$i] = $entrada;
                    $i++;
                }
            }
            
            return Inertia::render('Inicios/inicioEstudiante', [
                'user' => fn () => User::with([
                    'roles', 'requests', 'requests.course.images', 'requests.course.teacher', 'requests.course.tags', 'activeCourses', 'activeCourses.images', 'finishedCourses', 'finishedCourses.images', 'finishedCourses.teacher', 'finishedCourses.tags'
                ])->where('id', Auth::id())->first(),
                'profesor' => $profesor,
                'tags' => $tags,
                'participantes' => $participantes,
                'pendientes' => $pendientes,
            ]);
        } 
    }

    //  funcion para ver el inicio como ponente
    public function inicioPonente()
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        
        $cursos = Course::where('teacher_id', Auth::id())->where('estatus', 'Activo')->with('users', 'images')->get();

        //  Si el ponente no tiene un curso activo le muestra la vista de inicio alternativa
        if(count($cursos) == 0){
            return Inertia::render('Inicio');
        }

        $estudiantes = Course::
            leftJoin('course_user','courses.id','=','course_user.course_id')
            ->leftJoin('users','course_user.course_id','=','users.id')
            ->leftJoin('categories','users.id','=','categories.id')
            ->where('teacher_id', Auth::id())
            ->where('estatus', 'Activo')
            ->select('categories.nombre',DB::raw('count(categories.nombre) as cantidad'))
            ->groupBy('categories.nombre')
            ->get();
        

        $participantes=Course::where('id',$cursos[0]->id)->with('users:id,nombre,apellido_p,apellido_m,foto,email')->first();
        

        return Inertia::render('Inicios/inicioPonente', [
            'cursos' => fn () => $cursos,
            'estudiantes' => $estudiantes,
            'participantes' => $participantes,
        ]);
        
    }

    //  funcion para ver el inicio como admin
    public function inicioAdmin()
    {
        \Gate::authorize('haveaccess', 'admin.perm');
        //  cantidad de usuarios separados por rol
        $usuariosRoles = Role::
            join('role_user','roles.id','=','role_user.role_id')
            ->select('roles.name',DB::raw('count(roles.id) as cantidad'))
            ->groupBy('roles.name')
            ->get();
        
        //  cantidad de estudiantes inscritos a un curso
        $inscritos = Course::
            leftJoin('course_user','courses.id','=','course_user.course_id')
            ->where('estatus','=','Activo')
            ->select(DB::raw('count(user_id) as cantidad'))
            ->first();

        //  cantida de ponentes que estan dando al menos un curso
        $cantidadPonentes = Course::
            where('estatus','=','Activo')
            ->select(DB::raw('count(teacher_id) as cantidad'))
            ->groupBy('teacher_id')
            ->limit(5);

        //dd($usuariosRoles->all());


        $totalCursosActuales=Course::where('estatus','Activo')->get();
        $totalCursosActuales=$totalCursosActuales->count();

        $cursosActuales=Course::where('courses.estatus','=','Activo')
            ->join('course_training_type','courses.id','=','course_training_type.course_id')
            ->join('training_types','course_training_type.training_type_id','=','training_types.id')
            ->select(DB::raw('count(training_types.id) as total'),'training_types.nombre')
            ->groupBy('training_types.nombre')
            ->get();

        $totalCursosTerminados=Course::where('estatus','Terminado')->get();
        $totalCursosTerminados=$totalCursosTerminados->count();

        $cursosTerminados=Course::where('courses.estatus','=','Terminado')
            ->join('course_training_type','courses.id','=','course_training_type.course_id')
            ->join('training_types','course_training_type.training_type_id','=','training_types.id')
            ->select(DB::raw('count(training_types.id) as total'),'training_types.nombre')
            ->groupBy('training_types.nombre')
            ->get();

        return Inertia::render('Inicios/inicioAdmin', [
            'usuariosRoles' => $usuariosRoles,
            'inscritos' => $inscritos,
            'cantidadPonentes' => $cantidadPonentes->count(),
            'cursosActuales' => $cursosActuales,
            'totalCursosActuales' =>$totalCursosActuales,
            'cursosTerminados' =>$cursosTerminados,
            'totalCursosTerminados' =>$totalCursosTerminados
        ]);
        
    }


    public function create()
    {
        \Gate::authorize('haveaccess', 'ponente.perm');

        return Inertia::render('Cursos/FormCurso', [
            'capacitaciones' => Training_type::get(),
        ]);
    }

    public function moduleCreate()
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        return Inertia::render('Cursos/ModuleCreate', [
            'cursos' => Course::where('teacher_id', Auth::id())->get()
        ]);
    }

    public function storeModule(Request $request)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        $validated = $request->validate([
            'nombre' => ['required', 'max:100', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'curso' => 'required|exists:courses,id',
            'objetivo' => "required",
            'criterios_de_evaluacion' => 'required',
            'duracion' => 'required|numeric',
            'temario' => 'required',
        ]);

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            $newModule = new Module;

            $newModule->nombre = $request->nombre;
            $newModule->objetivo = $request->objetivo;
            $newModule->duracion = $request->duracion;
            $newModule->criterios = $request->criterios_de_evaluacion;
            $newModule->temario = $request->temario;
            $newModule->course_id = $request->curso;

            //  se le asigna numero al nuevo modulo
            //  primero se consultan todos lo modulos correspondientes a ese curso
            $modulosCurso = Module::where('course_id', $newModule->course_id)->get('id');


            //  si el curso aun no tiene modulos se le asigna automaticamente el numero 1
            if ($modulosCurso == null) {
                $newModule->numero = 1;
            } else {
                //  se deben contar la cantidad de modulos que hay en el curso actualmente
                $cantidad = $modulosCurso->count();
                //  se le suma 1 a la cantidad
                $cantidad = $cantidad + 1;
                $newModule->numero = $cantidad;
            }

            $newModule->save();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'create';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
                modules: {
                    nombre: ' . $request->nombre .
                'objetivo: ' . $request->objetivo .
                'duracion: ' . $request->duracion .
                'criterios: ' . $request->criterios_de_evaluacion .
                'temario: ' . $request->temario .
                'course_id: ' . $request->curso .
                '},
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado el módulo: ' . $newModule->nombre;

            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos.informacion', $request->curso)->with('success', 'El módulo de este curso se ha creado exitosamente');
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::route('cursos.informacion', $request->curso)->with('error', 'No se pudo crear un módulo para este curso');
        }
    }

    public function moduleEdit($id)
    {
        if (Auth::user()->roles[0]->name == 'Ponente') {
            \Gate::authorize('haveaccess', 'ponente.perm');
            return Inertia::render('Cursos/ModuleEdit', [
                'cursos' => Course::where('teacher_id', Auth::id())->get(),
                'modulo' => Module::with('course')->findOrFail($id),
            ]);
        }
        elseif (Auth::user()->roles[0]->name == 'Administrador') {
            \Gate::authorize('haveaccess', 'admin.perm');
            $modulo = Module::with('course')->findOrFail($id);
            $teacherId = $modulo->course->teacher_id;
            return Inertia::render('Cursos/ModuleEdit', [
                'cursos' => Course::where('teacher_id', $teacherId),
                'modulo' => $modulo,
            ]);
        } else {
            return abort(403);
        }
    }
    public function updateModule($id, Request $request)
    {
        if (Auth::user()->roles[0]->name == 'Ponente') {
            \Gate::authorize('haveaccess', 'ponente.perm');
        }
        elseif (Auth::user()->roles[0]->name == 'Administrador') {
            \Gate::authorize('haveaccess', 'admin.perm');
        } else {
            return abort(403);
        }
        $validated = $request->validate([
            'nombre' => ['required', 'max:255', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'objetivo' => "required",
            'criterios_de_evaluacion' => 'required',
            'duracion' => 'required|numeric',
            'temario' => 'required',
        ]);

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            $myModule = Module::find($id);

            $myModule->nombre = $request->nombre;
            $myModule->objetivo = $request->objetivo;
            $myModule->duracion = $request->duracion;
            $myModule->criterios = $request->criterios_de_evaluacion;
            $myModule->temario = $request->temario;

            $myModule->save();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'update';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
                modules: {
                    nombre: ' . $request->nombre .
                'objetivo: ' . $request->objetivo .
                'duracion: ' . $request->duracion .
                'criterios: ' . $request->criterios_de_evaluacion .
                'temario: ' . $request->temario .
                '},
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado el módulo: ' . $myModule->nombre;

            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos.modulos', $myModule->course_id)->with('success', 'El módulo ' . $myModule->nombre . ' se ha editado exitosamente');
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::route('cursos.modulos', $myModule->course_id)->with('error', 'No se pudo editar el módulo ' . $myModule->nombre);
        }
    }

    public function store(Request $request)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');

        //VALIDAMOS DATOS
        $validated = $request->validate([
            'nombre' => ['required', 'max:100', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'tags' => 'required',
            'fecha_inicio' => 'required|date',
            'fecha_final' => 'required|date|after:fecha_inicio',
            'link' => 'required|url',
            'vc' => 'required|boolean',
            'tipos_de_capacitacion' => 'required',
            'tipo_inscripcion' => 'required|in:Automática,Solicitud,Sólo yo',
            'descripcion' => 'required',
            'imgs' => 'required|image|mimes:jpeg,png,jpg,gif|max:51200',
            'maximo' => 'required|digits_between:1,3|numeric',
            'inicio_inscripciones' => 'nullable|date',
            'final_inscripciones' => 'nullable|date|after:inicio_inscripciones',
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
            //SE AGREGA HORARIO
            $horario = new Schedule;
            $horario->course_id = $newCourse->id;
            $horario->lunes = $request->lunes;
            $horario->martes = $request->martes;
            $horario->miercoles = $request->miercoles;
            $horario->jueves = $request->jueves;
            $horario->viernes = $request->viernes;
            $horario->sabado = $request->sabado;
            $horario->domingo = $request->domingo;
            
            $horario->save();
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
            $newImagen->course_id = $newCourse->id;
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
                'valor_curricular: ' . $request->vc .
                'tipo_acceso: ' . $request->tipo_inscripcion .
                'descripcion: ' . $request->descripcion .
                'teacher_id: ' . Auth::id() .
                'max: ' . $request->maximo .
                'link: ' . $request->link .
                '},
                tags: ' . \json_encode($tags) .
                'tipos_capacitacion: ' . \json_encode($tipos) .
                'imgs: ' . $request->file('imgs')->hashName() .
                '
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha creado el curso: ' . $newCourse->nombre;

            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos')->with('success', 'El curso se ha creado exitosamente');
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::route('cursos')->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            //return response()->json(["status" => $e]);
        }
    }

    public function editCourse($id)
    {
        //VERIFICA EL ROL DEL USUARIO
        if (Auth::user()->roles[0]->name == 'Ponente') {
            \Gate::authorize('haveaccess', 'ponente.perm');

            return Inertia::render('Cursos/FormCursoEdit', [
                'curso' => Course::with(['images:imagen', 'tags:nombre'])->findOrFail($id),
                'capacitaciones' => Training_type::get(),
            ]);
        } else if (Auth::user()->roles[0]->name == 'Administrador') {
            \Gate::authorize('haveaccess', 'admin.perm');

            return Inertia::render('Cursos/FormCursoEdit', [
                'curso' => Course::with(['images:imagen', 'tags:nombre'])->findOrFail($id),
                'capacitaciones' => Training_type::get(),
            ]);
        } else {
            return abort(403);
        }
    }

    public function update($id, Request $request)
    {
        if (Auth::user()->roles[0]->name == 'Ponente') {
            \Gate::authorize('haveaccess', 'ponente.perm');
        }
        elseif (Auth::user()->roles[0]->name == 'Administrador') {
            \Gate::authorize('haveaccess', 'admin.perm');
        } else {
            return abort(403);
        }

        //VALIDAMOS DATOS
        $validated = $request->validate([
            'nombre' => ['required', 'max:100', 'regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'tags' => 'nullable',
            'fecha_inicio' => 'required|date',
            'fecha_final' => 'required|date|after:fecha_inicio',
            'link' => 'required|url',
            'vc' => 'required|boolean',
            'tipos_de_capacitacion' => 'nullable',
            'tipo_inscripcion' => 'required|in:Automática,Solicitud,Sólo yo',
            'descripcion' => 'required',
            'imgs' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:51200',
            'maximo' => 'required|digits_between:1,3|numeric',
            'inicio_inscripciones' => 'nullable|date',
            'final_inscripciones' => 'nullable|date|after:inicio_inscripciones',
            //las inscripciones podrán seguir después de iniciado el curso?
        ]);

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        $imagen = null;
        try {
            //SE OBTIENE y edita el curso
            $myCourse = Course::find($id);

            $myCourse->nombre = $request->nombre;
            $myCourse->fecha_inicio = $request->fecha_inicio;
            $myCourse->fecha_final = $request->fecha_final;
            $myCourse->max = $request->maximo;
            $myCourse->valor_curricular = $request->vc;
            $myCourse->tipo_acceso = $request->tipo_inscripcion;
            $myCourse->descripcion = $request->descripcion;
            $myCourse->teacher_id = Auth::id();
            $myCourse->link = $request->link;

            if ($request->inicio_inscripciones) $myCourse->inicio_inscripciones = $request->inicio_inscripciones;
            if ($request->final_inscripciones) $myCourse->fecha_limite = $request->final_inscripciones;


            if($request->lunes || $request->martes || $request->miercoles||
            $request->jueves|| $request->viernes|| $request->sabado || $request->domingo){
                $horario = Schedule::where('course_id', $myCourse->id)->first();
                $horario->lunes = $request->lunes;
                $horario->martes = $request->martes;
                $horario->miercoles = $request->miercoles;
                $horario->jueves = $request->jueves;
                $horario->viernes = $request->viernes;
                $horario->sabado = $request->sabado;
                $horario->domingo = $request->domingo;
                
                $horario->save();    
            }

            $myCourse->save();
            //SE AGREGAN REGISTROS A SUS RELACIONES
            //TAGS
            $tagsLog = "Sin cambios";
            if ($request->tags) {
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

                $tagsLog = \json_encode($tags);
            }

            //TIPO DE CAPACITACIONES

            $capacitaciones = 'no hubo cambios';

            if ($request->tipos_de_capacitacion) {
                //Eliminamos las capacitaciones que ya existen

                foreach ($myCourse->training_types as $tipo) {
                    $myCourse->training_types()->detach($tipo->id);
                }

                $tipos = $request->tipos_de_capacitacion;
                $myCourse->training_types()->sync($tipos);
                $capacitaciones = \json_encode($tipos);
            }

            //IMÁGENES
            $imagenes = "No hubo cambios";
            if ($request->imgs) {
                $newImagen = new Image;
                $newImagen->course_id = $myCourse->id;
                $imagen = $request->file('imgs')->store('/public/imagenes_curso');
                $newImagen->imagen = $request->file('imgs')->hashName();

                $newImagen->save();
                $imagenes = $request->file('imgs')->hashName();
            }

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'update';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
                courses: {
                    nombre: ' . $request->nombre . ',\n
                    fecha_inicio: ' . $request->fecha_inicio . ',\n
                    fecha_final: ' . $request->fecha_final . ',\n
                    valor_curricular: ' . $request->vc . ',\n
                    tipo_acceso: ' . $request->tipo_inscripcion . ',\n
                    descripcion: ' . $request->descripcion . ',\n
                    teacher_id: ' . Auth::id() . ',\n
                    max: ' . $request->maximo . ',\n
                    link: ' . $request->link . ',\n
                },
                tags:' . $tagsLog . ',\n
                tipos_capacitacion: ' . $capacitaciones  . ',\n
                imgs: ' . $imagenes . ',\n
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha editado el curso: ' . $myCourse->nombre;

            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos.informacion', $id)->with('success', 'El curso se ha editado exitosamente');
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::route('cursos.informacion', $id)->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            //return response()->json(["status" => $e]);
        }
    }

    public function deleteRequest($id, Request $request)
    {
        //metodo para que alumno solicite baja de curso

        \Gate::authorize('haveaccess', 'alumno.perm');
        //VALIDAMOS DATOS
        $validated = $request->validate([
            'descripcion' => 'required',
        ]);

        DB::beginTransaction();
        try {

            if (Drop_requests::where('course_id', $id)->where('user_id', Auth::id())->where('status', 'En espera')->first()) {
                return \Redirect::route('cursos')->with('message', 'Ya solicitaste tu baja a este curso');
            } else {
                $newRequest = new Drop_requests;
                $newRequest->course_id = $id;
                $newRequest->user_id = Auth::id();
                $newRequest->descripcion = $request->descripcion;
                $newRequest->status = "En espera";

                $newRequest->save();
                //SE CREA EL LOG

                $newLog = new Log;

                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    drop_requests: {
                        course_id: ' . $id . ',\n
                        user_id: ' . Auth::id() . ',\n
                        descripcion: ' . $request->descripcion . ',\n
                    },
                }';

                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha solicitado la baja de un curso';

                //SE GUARDA EL LOG
                $newLog->save();

                DB::commit();
                return \Redirect::route('cursos')->with('success', 'Se solicitó la baja del curso');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar procesar tu solicitud, inténtelo más tarde.');
        }
    }

    public function deleteCourseRequest($id, Request $request)
    {

        //MÉTODO PARA SOLICITAR ELIMINAR CURSO
        \Gate::authorize('haveaccess', 'ponente.perm');
        //VALIDAMOS DATOS
        $validated = $request->validate([
            'descripcion' => 'required',
        ]);

        DB::beginTransaction();
        try {

            if (Delete_requests::where('course_id', $id)->where('user_id', Auth::id())->where('status', 'En espera')->first()) {
                return \Redirect::route('cursos')->with('message', 'Ya solicitaste la eliminación de este curso');
            } else {
                $newRequest = new Delete_requests;
                $newRequest->course_id = $id;
                $newRequest->user_id = Auth::id();
                $newRequest->comentario = $request->descripcion;
                $newRequest->status = 'En espera';
                $newRequest->save();
                //SE CREA EL LOG

                $newLog = new Log;

                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    drop_requests: {
                        course_id: ' . $id . ',\n
                        user_id: ' . Auth::id() . ',\n
                        descripcion: ' . $request->descripcion . ',\n
                    },
                }';

                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha solicitado eliminar el curso';

                //SE GUARDA EL LOG
                $newLog->save();

                DB::commit();
                return \Redirect::route('cursos')->with('success', 'Se solicitó la eliminación de curso');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar procesar tu solicitud, inténtelo más tarde.');
        }
    }
    public function delete($id)
    {

        \Gate::authorize('haveaccess', 'admin.perm');
        DB::beginTransaction();
        try {
            $course = Course::find($id);

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
            ->orderBy('fecha_final', 'desc')
            ->select('courses.nombre','valor_curricular', 'courses.fecha_inicio', 'courses.fecha_final', 'courses.id', 'courses.teacher_id', 'courses.inicio_inscripciones', 'courses.fecha_limite')
            ->paginate(12);

        $cursosParaTi = Course::with(['teacher:nombre,apellido_p,apellido_m,foto,id', 'tags:nombre', 'images:imagen,course_id', 'training_types'])
            ->whereHas('training_types', function ($query) {
                $query->whereHas('categories', function ($query2) {
                    if (isset(Auth::User()->category)) {
                        $query2->where('categories.id', Auth::User()->category->id);
                    }
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
        $tipo = Auth::user()->roles[0]->name;
        if ($tipo == 'Ponente') {
            $curso_teacher = Course::where('id', $id)->first('teacher_id');
            if (Auth::id() == $curso_teacher->teacher_id) {
                $inscrito = true;
                $calificacion = Course::where('courses.id', $id)
                    ->where('calificacion_final', '!=', 'Null')
                    ->leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')
                    ->select(DB::raw('TRUNCATE(AVG(calificacion_final),2) as calificacion_final'))
                    ->first();
            } else {
                return abort(403);
            }
        } 
        else if ($tipo == 'Alumno') {

            $inscrito = Course::leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')
                ->where(
                    'course_user.course_id',
                    $id
                )->where('course_user.user_id', Auth::id())
                ->first();

            if ($inscrito) {
                $inscrito = true;
            } else {
                $inscrito = false;
            }

            $calificacion = Course::where('courses.id', $id)
                ->leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')
                ->where('course_user.user_id', Auth::id())
                ->first('calificacion_final');
        }
        else if($tipo == 'Administrador'){
            $curso_teacher = Course::where('id', $id)->first('teacher_id');
            $inscrito = true;
            $calificacion = Course::where('courses.id', $id)
                ->where('calificacion_final', '!=', 'Null')
                ->leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')
                ->select(DB::raw('TRUNCATE(AVG(calificacion_final),2) as calificacion_final'))
                ->first();
        }
        $cursosCount = Course::with('teacher:id')->find($id);
        $cursosCount = Course::where('teacher_id', $cursosCount->teacher->id)->count();
        $participantesCount = Course::with('users:id')->findOrFail($id);
        $participantesCount = $participantesCount['users']->count();

        return Inertia::render('Curso/Informacion', [
            'curso' => Course::with('images:imagen,course_id', 'tags:nombre', 'teacher:nombre,apellido_p,apellido_m,foto,id', 'modules:course_id,id,nombre,numero')->findOrFail($id),
            'cursos_count' => $cursosCount,
            'participantes_count' => $participantesCount,
            'calificacion' => $calificacion,
            'inscrito' => $inscrito,
        ]);
    }

    public function modulos($id)
    {
        if(Auth::user()->roles[0]->name=='Ponente'){
            \Gate::authorize('haveaccess', 'ponente.perm');
            $curso = Course::findOrFail($id);
            if($curso->teacher_id != Auth::id()){
                return abort(403);
            }
        }
        else if(Auth::user()->roles[0]->name=='Administrador'){
            \Gate::authorize('haveaccess', 'admin.perm');
        } else {
            return abort(403);
        }

        return Inertia::render('Curso/ModulosConfig', [
            'curso' => Course::with('modules')->findOrFail($id),
        ]);
    }

    //  funcion para reordenar los modulos
    public function ordenarModulos($id, Request $request)
    {
        if(Auth::user()->roles[0]->name=='Ponente'){
            \Gate::authorize('haveaccess', 'ponente.perm');
        }
        else if(Auth::user()->roles[0]->name=='Administrador'){
            \Gate::authorize('haveaccess', 'admin.perm');
        } else {
            return abort(403);
        }

        $validated = $request->validate([
            'order.*' => "required | numeric",
        ]);

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            //  se valida que el ponente sea el del curso
            $curso = Course::findOrFail($id);

            if(Auth::user()->roles[0]->name=='Ponente'){
                \Gate::authorize('haveaccess', 'ponente.perm');
                if($curso->teacher_id != Auth::id()){
                    return abort(403);
                }
            }

            //  se valida que los modulos pertezcan al curso
            foreach ($request->order as $mid) {
                $modulo = Module::where('id', $mid)
                    ->where('course_id', $id)
                    ->first();

                if (!$modulo) {
                    return abort(403);
                }
            }

            //  variable que dara el nuevo orden a los modulos
            $newNum = 1;
            //  se actualiza el numero de los modulos
            foreach ($request->order as $mid) {

                $modulo = Module::find($mid);

                $modulo->numero = $newNum;
                $modulo->save();

                //  se actualiza el valor de la variable que asigna el nuevo orden
                $newNum = $newNum + 1;
            }

            DB::commit();
            return \Redirect::back()->with('success', 'Orden actualizado con exito.');
        } catch (\Exception $e) {

            DB::rollBack();
            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar procesar tu solicitud, inténtelo más tarde.');
            // return \Redirect::route('cursos.informacion', $id)->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            //return response()->json(["status" => $e]);
        }

        //dd($request->all());

        // return Inertia::render('Curso/ModulosConfig', [
        //     'curso' => Course::with('modules')->findOrFail($id),
        // ]);
    }

    public function deleteModule($id)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        DB::beginTransaction();
        try {
            //  se busca el modulo a eliminar por su id
            $module = Module::find($id);
            //  antes de eliminarlo se guarda el id del curso al que pertenece
            //  para poder reordenar el resto de modulos
            $idCurso = $module->course_id;
            $curso = Course::findOrFail($idCurso);
            //  se valida que quien intente borrar el modulo sea un ponente
            if ($curso->teacher_id != Auth::user()->id) {
                return abort(403);
            }
            //  ahora si se elimina el modulo
            $module->delete();

            //  se consultan todos lo modulos correspondientes a ese curso
            $modulosCurso = Module::where('course_id', $idCurso)->get('id');

            //  si el curso aun tiene modulos se reordenan, si no no
            if ($modulosCurso != null) {
                //  variable que dara el nuevo orden a los modulos
                $newNum = 1;
                //  se actualiza el numero de los modulos
                foreach ($modulosCurso as $modulo) {

                    $modulo->numero = $newNum;
                    $modulo->save();

                    //  se actualiza el valor de la variable que asigna el nuevo orden
                    $newNum = $newNum + 1;
                }
            }

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'delete';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
                modules: {
                    id: ' . $id .
                '}
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha eliminado el modulo: ' . $module->nombre;

            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos.modulos', $module->course_id)->with('success', '¡Modulo eliminado con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar procesar tu solicitud, inténtelo más tarde.');
        }
    }

    public function modulo($id, $mid)
    {
        //Se verifica que el modulo exista y pertenezca al curso
        $modulo = Module::with('users')
            ->where('id', $mid)
            ->where('course_id', $id)
            ->first();

        if (!$modulo) {
            return abort(404);
        }

        $tipo = Auth::user()->roles[0]->name;
        //Si es tipo alumno y no está inscrito lo redirige a la vista de información
        if ($tipo == 'Alumno') {
            $inscrito = Course::leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')
                ->where('course_user.course_id', $id)
                ->where('course_user.user_id', Auth::id())
                ->first();

            $calificacion = Module::where('modules.id', $mid)
                ->leftJoin('module_user', 'modules.id', '=', 'module_user.module_id')
                ->where('module_user.user_id', Auth::id())
                ->first('calificacion');
            $actividades = Entry::where('entries.module_id', $mid)
                ->where('entries.visible', 1)
                ->leftJoin('entry_user', 'entries.id', '=', 'entry_user.entry_id')
                ->where(function ($query) {
                    $query->where('entry_user.user_id', Auth::id())
                        ->orWhere('entry_user.user_id', null);
                })
                ->where(function ($query) {
                    $query->where('entries.tipo', 'Asignacion')
                        ->orWhere('entries.tipo', 'Examen');
                })
                ->select('entries.*', 'entry_user.calificacion as calificacion', 'entry_user.fecha as fecha')
                ->get();
            
            $avisos = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', 'Aviso')
                ->where('visible', 1)
                ->orderBy('id', 'DESC')
                ->get();

            $entradas = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', '!=', 'Aviso')
                ->where('tipo', '!=', 'Asignacion')
                ->where('tipo', '!=', 'Examen')
                ->where('visible', 1)
                ->orderBy('id', 'DESC')
                ->get();
        }
        //Si es un ponente se verifica que sea el dueño del curso
        else if ($tipo == 'Ponente') {
            $curso_teacher = Course::where('id', $id)->first('teacher_id');
            if (Auth::id() == $curso_teacher->teacher_id) {
                $inscrito = true;

                $calificacion = Module::where('modules.id', $mid)
                    ->where('calificacion', '!=', 'Null')
                    ->leftJoin('module_user', 'modules.id', '=', 'module_user.module_id')
                    ->select(DB::raw('TRUNCATE(AVG(calificacion),2) as calificacion'))
                    ->first();
            } else {
                return abort(403);
            }
            $actividades = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', '!=', 'Aviso')
                ->where('tipo', '!=', 'Informacion')
                ->where('tipo', '!=', 'Enlace')
                ->where('tipo', '!=', 'Archivo')
                ->orderBy('id', 'ASC')
                ->get();
            
            $avisos = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', 'Aviso')
                ->orderBy('id', 'DESC')
                ->get();

            $entradas = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', '!=', 'Aviso')
                ->where('tipo', '!=', 'Asignacion')
                ->where('tipo', '!=', 'Examen')
                ->orderBy('id', 'DESC')
                ->get();
        } 
        else if ($tipo == 'Administrador') {
            $curso_teacher = Course::where('id', $id)->first('teacher_id');
            $inscrito = true;
            $calificacion = Module::where('modules.id', $mid)
                ->where('calificacion', '!=', 'Null')
                ->leftJoin('module_user', 'modules.id', '=', 'module_user.module_id')
                ->select(DB::raw('TRUNCATE(AVG(calificacion),2) as calificacion'))
                ->first();
            $actividades = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', '!=', 'Aviso')
                ->where('tipo', '!=', 'Informacion')
                ->where('tipo', '!=', 'Enlace')
                ->where('tipo', '!=', 'Archivo')
                ->orderBy('id', 'ASC')
                ->get();
            $avisos = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', 'Aviso')
                ->orderBy('id', 'DESC')
                ->get();

            $entradas = Entry::with('files:archivo,entry_id')
                ->where('module_id', $mid)
                ->where('tipo', '!=', 'Aviso')
                ->where('tipo', '!=', 'Asignacion')
                ->where('tipo', '!=', 'Examen')
                ->orderBy('id', 'DESC')
                ->get();
        }
        if (!$inscrito) {
            return \Redirect::route('cursos.informacion', $id);
        }

        $actual = Module::findOrFail($mid);
        $numeroActual = $actual->numero;

        $numeroSiguiente = $numeroActual + 1;
        $siguiente = Module::where('numero', $numeroSiguiente)->where('course_id', $id)->first('id');

        $numeroAnterior = $numeroActual - 1;
        $anterior = Module::where('numero', $numeroAnterior)->where('course_id', $id)->first('id');

        return Inertia::render('Curso/Modulo', [
            'curso' => Course::with('modules:course_id,id,nombre,numero')->findOrFail($id),
            'modulo' => $modulo,
            'avisos' => $avisos,
            'entradas' => $entradas,
            'actividades' => $actividades,
            'calificacion' => $calificacion,
            'siguiente' => $siguiente,
            'anterior' => $anterior,
        ]);
    }

    public function participantes($id)
    {
        $tipo = Auth::user()->roles[0]->name;

        if ($tipo == 'Ponente') {
            $curso_teacher = Course::where('id', $id)->first('teacher_id');
            if (Auth::id() != $curso_teacher->teacher_id) {
                return abort(403);
            }
        } else if ($tipo == 'Alumno') {
            $inscrito = Course::leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')->where('course_user.course_id', $id)->where('course_user.user_id', Auth::id())->first();
            if (!$inscrito) {
                return \Redirect::route('cursos.informacion', $id);
            }
        }

        return Inertia::render('Curso/Participantes', [
            'curso' => Course::with('users:id,nombre,foto,apellido_p,apellido_m,email', 'teacher:nombre,apellido_p,apellido_m,foto,id,email', 'modules:course_id,id,nombre,numero')->findOrFail($id),
        ]);
    }

    public function mochila($id)
    {
        \Gate::authorize('haveaccess', 'alumno.perm');
        $inscrito = Course::leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')->where('course_user.course_id', $id)->where('course_user.user_id', Auth::id())->first();
        if (!$inscrito) {
            return \Redirect::route('cursos.informacion', $id);
        }
        $user = User::find(Auth::id());
        $curso = $user->courses()->where('course_id', $id)->with('modules:course_id,id,nombre,numero')->first();
        if (!$curso) {
            return abort(404);
        }

        $entradas = Course::where('courses.id', $id)->leftJoin('modules', 'courses.id', '=', 'modules.course_id')
            ->leftJoin('entries', 'modules.id', '=', 'entries.module_id')
            ->where('entries.visible', 1)
            ->whereIn('entries.tipo', ['Asignacion', 'Examen'])
            ->select('entries.*', 'modules.nombre as modulo', 'modules.numero as numero', 'modules.id as module_id')
            ->orderBy('fecha_de_entrega', 'ASC')
            ->get();

        $realizadas = Course::where('courses.id', $id)->leftJoin('modules', 'courses.id', '=', 'modules.course_id')
            ->leftJoin('entries', 'modules.id', '=', 'entries.module_id')
            ->where('entries.visible', 1)
            ->whereIn('entries.tipo', ['Asignacion', 'Examen'])
            ->join('entry_user', 'entries.id', '=', 'entry_id')
            ->where('entry_user.user_id', $user->id)
            ->select(
                'entries.id as id',
                'entries.tipo as tipo',
                'entries.titulo as titulo',
                'modules.nombre as modulo',
                'entries.fecha_de_apertura as fecha_de_apertura',
                'entries.fecha_de_entrega as fecha_de_entrega',
                'entry_user.fecha as fecha',
                'entry_user.calificacion as calificacion',
                'entries.max_calif as max_calif',
                'entries.permitir_envios_retrasados as permitir_envios_retrasados',
                'modules.numero as numero',
                'modules.id as module_id'
            )
            ->orderBy('fecha_de_entrega', 'ASC')
            ->get();

        $pendientes = [];
        $i = 0;
        foreach ($entradas as $entrada) {
            $found = false;
            foreach ($realizadas as $realizada) {
                if ($entrada->id == $realizada->id) {
                    $found = true;
                    break;
                }
            }
            if ($found == false) {
                $pendientes[$i] = $entrada;
                $i++;
            }
        }

        return Inertia::render('Curso/Mochila', [
            'curso' => $curso,
            'realizadas' => $realizadas,
            'pendientes' => $pendientes,
        ]);
    }

    public function estadisticas($id)
    {
        if(Auth::user()->roles[0]->name=='Ponente'){
            Gate::authorize('haveaccess', 'ponente.perm');
            $curso_teacher = Course::where('id', $id)->first('teacher_id');
            if (Auth::id() != $curso_teacher->teacher_id) {
                return abort(403);
            }
        }
        else if(Auth::user()->roles[0]->name=='Administrador'){
            Gate::authorize('haveaccess', 'admin.perm');
        }
        else{
            return abort(403);
        }
        
        $curso = Course::findOrFail($id);
        $alumnos = $curso->users()->select('sexo', 'calificacion_final')->get();
        $cantidad = $alumnos->count();
        $categorias = User::leftJoin('categories', 'users.category_id', '=', 'categories.id')
            ->leftJoin('course_user', 'users.id', '=', 'course_user.user_id')
            ->where('course_id', $id)
            ->select('categories.nombre', DB::raw('count(*) as total'))
            ->orderBy('total', 'desc')
            ->groupBy('categories.nombre')->limit(4)->get();

        return Inertia::render('Curso/Estadisticas', [
            'curso' => Course::with('modules:course_id,id,nombre,numero')->findOrFail($id),
            'cantidad' => $cantidad,
            'alumnos' => $alumnos,
            'categorias' => $categorias
        ]);
    }

    public function calificaciones($id)
    {
        if(Auth::user()->roles[0]->name=='Administrador'){
            $curso = Course::with('modules:course_id,id,nombre,numero', 'modules.users:id', 'users:nombre,apellido_p,apellido_m,id,foto')->select('id', 'nombre', 'teacher_id', 'fecha_final')->findOrFail($id);
            
            return Inertia::render('Curso/Calificaciones', [
                'curso' => $curso
            ]);
        }
        else if(Auth::user()->roles[0]->name=='Ponente'){
            Gate::authorize('haveaccess', 'ponente.perm');

            //verificar que el ponente sea dueño del curso
            $curso = Course::with('modules:course_id,id,nombre,numero', 'modules.users:id', 'users:nombre,apellido_p,apellido_m,id,foto')->select('id', 'nombre', 'teacher_id', 'fecha_final')->findOrFail($id);
            if (Auth::id() != $curso->teacher_id) {
                return abort(403);
            }
    
            return Inertia::render('Curso/Calificaciones', [
                'curso' => $curso
            ]);
        }
        else{
            return abort(403);
        }
    }

    public function storeCalificaciones($id, Request $request)
    {
        if(Auth::user()->roles[0]->name=='Ponente'){
            \Gate::authorize('haveaccess', 'ponente.perm');
        }
        else if(Auth::user()->roles[0]->name=='Administrador'){
            \Gate::authorize('haveaccess', 'admin.perm');
        }
        else {
            return abort (403);
        }

        $validated = $request->validate([
            'calificacion'    => [
                'nullable',
                'array',
                //valida que existan los usuarios de las calificaciones
                function ($attribute, $value, $fail) {
                    //arreglo de indices
                    $ids = array_keys($value);

                    // query to check if array keys is not valid
                    $usersCountWithinArrIDs = User::whereIn('id', $ids)->count();
                    if ($usersCountWithinArrIDs != count($ids))
                        return $fail($attribute . ' no es válido.');  // -> "quantity is invalid"
                }
            ],
            'calificacion.*'    => [
                'nullable',
                'array',
                //valida que existan los modulos de las calificaciones
                function ($attribute, $value, $fail) {
                    //arreglo de indices
                    $ids = array_keys($value);

                    // query to check if array keys is not valid
                    $modulesCountWithinArrIDs = Module::whereIn('id', $ids)->count();
                    if ($modulesCountWithinArrIDs != count($ids))
                        return $fail($attribute . ' no es válido.');  // -> "quantity is invalid"
                }
            ],
            'calificacion.*.*' => 'nullable|numeric|between:0,100|regex:/^\d*(\.\d{1,2})?$/',
            'calificacion_final'    => [
                'nullable',
                'array',
                //valida que existan los usuarios de las calificaciones
                function ($attribute, $value, $fail) {
                    //arreglo de indices
                    $ids = array_keys($value);

                    // query to check if array keys is not valid
                    $usersCountWithinArrIDs = User::whereIn('id', $ids)->count();
                    if ($usersCountWithinArrIDs != count($ids))
                        return $fail($attribute . ' no es válido.');  // -> "quantity is invalid"
                }
            ],
            'calificacion_final.*.*' => 'nullable|numeric|between:0,100|regex:/^\d*(\.\d{1,2})?$/',
        ]);

        DB::beginTransaction();
        try {
            //verifica que el curso exista
            $curso = Course::find($id);

            if (!$curso) {
                DB::rollBack();
                return \Redirect::route('cursos.calificaciones.store', $id)->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            }

            //verifica que el usuario loggeado sea el maestro del curso
            if(Auth::user()->roles[0]->name=='Ponente'){
                if ($curso->teacher->id != Auth::User()->id) {
                    DB::rollBack();
                    return \Redirect::route('cursos.calificaciones.store', $id)->with('error', 'No puedes subir calificaciones si no eres el maestro del curso.');
                }
            }
            //user es el id del usuario en la iteracion
            foreach ($request->calificacion as $user => $userModules) {
                //module es el id del modulo
                foreach ($userModules as $module => $calificacion) {
                    $module = Module::find($module);

                    //se actualiza el status de la solicitud
                    $module->users()->sync([$user => ['calificacion' => $calificacion]], false);
                }
            }

            //module es el id del modulo
            foreach ($request->calificacion_final as $user => $calificacionFinal) {
                //se actualiza el status de la solicitud
                $curso->users()->sync([$user => ['calificacion_final' => $calificacionFinal]], false);
            }

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'update';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{}';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha subido calificaciones del curso de id: ' . $id;

            //SE GUARDA EL LOG
            $newLog->save();

            if (!$newLog) {
                DB::rollBack();
                return \Redirect::route('cursos.calificaciones.store', $id)->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            }

            DB::commit();

            if ($request->aprobado) {
                $status = 'aceptado';
            } else {
                $status = 'rechazado';
            }

            return \Redirect::route('cursos.calificaciones.store', $id)->with('success', 'Las calificaciones se han registrado de manera exitosa.');
        } catch (\Exception $e) {
            DB::rollback();

            return \Redirect::route('cursos.calificaciones.store', $id)->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde.');
        }
    }

    public function solicitudes($id)
    {
        if(Auth::user()->roles[0]->name=='Ponente'){
            \Gate::authorize('haveaccess', 'ponente.perm');
            $curso=Course::findOrFail($id);
            if($curso->teacher_id != Auth::id()){
                return abort(403);
            }
        }
        else if(Auth::user()->roles[0]->name=='Administrador'){
            \Gate::authorize('haveaccess', 'admin.perm');
        }
        else {
            return abort (403);
        }

        $curso = Course::with('waitingRequests:nombre,apellido_p,apellido_m,id,foto', 'modules:course_id,id,nombre,numero')
            ->select('nombre', 'id')
            ->findOrFail($id);
        return Inertia::render('Curso/Solicitudes', [
            'curso' => $curso,
        ]);
    }

    public function verPublicacion($id, $mid, $pid)
    {
        $inscrito = Course::leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')->where('course_user.course_id', $id)->where('course_user.user_id', Auth::id())->first();
        // if(!$inscrito){
        //     return \Redirect::route('cursos.informacion',$id);
        // }
        //Buscar el modulo con el mid (module id) que llega y que este tenga en course_id la relación al curso que está llegando $id
        $modulo = Module::where('id', $mid)->where('course_id', $id)->first();
        //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
        if (!$modulo) {
            return abort(404);
        }
        //Se obtiene la entrada que se desea mostrar en la vista
        $entrada = Entry::with('files:archivo,entry_id')->findOrFail($pid);
        if ($entrada->tipo == 'asignacion' || $entrada->tipo == 'examen') {
            return abort(404);
        }
        return Inertia::render('Curso/VerPublicacion', [
            'curso' => Course::with(['modules:course_id,id,nombre,numero', 'teacher:id'])->findOrFail($id),
            'modulo' => $modulo,
            'entrada' => $entrada,
            'comments' => Comment::with('user:id,nombre,apellido_p,apellido_m,foto')->where('entrie_id', $entrada->id)->orderBy('fecha', 'desc')->get()
        ]);
    }


    public function agregarParticipante($id, Request $request)
    {
        if(Auth::user()->roles[0]->name=='Ponente'){
            \Gate::authorize('haveaccess', 'ponente.perm');
            //Verificamos que el ponente sea dueño del curso
            $curso=Course::findOrFail($id);
            if($curso->teacher_id != Auth::id()){
                return abort(403);
            }
        }
        else if(Auth::user()->roles[0]->name=='Administrador'){
            \Gate::authorize('haveaccess', 'admin.perm');
        }
        else if(Auth::user()->roles[0]->name=='Estudiante'){
            return abort(403);
        }

        return Inertia::render('Curso/AgregarParticipante', [
            'curso' => Course::with('modules:course_id,id,nombre,numero')->findOrFail($id),
            'users' =>
            fn () => User::with('activeCourses:id', 'courses:id')->select('users.id', 'nombre', 'apellido_p', 'apellido_m', 'email', 'matricula','foto')
                ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
                ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
                ->where('roles.name', 'Alumno')
                ->when($request->user_search, function ($query, $search) use ($request) {
                    if ($request->filter) {
                        switch ($request->filter) {
                            case 'matricula':
                                return $query->where('users.matricula', 'LIKE', '%' . $search . '%')->where('roles.name', 'Alumno');
                                break;
                            case 'nombre':
                                return $query->WhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                )->orWhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                )->where('roles.name', 'Alumno');
                                break;
                            case 'email':
                                return $query->where('users.email', 'LIKE', '%' . $search . '%')->where('roles.name', 'Alumno');
                                break;
                            default:
                                return $query->WhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                )->orWhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                )->where('roles.name', 'Alumno');
                                break;
                        }
                    } else
                        return $query->WhereRaw(
                            "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                        )->orWhereRaw(
                            "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                        )->where('roles.name', 'Alumno');
                })
                ->when(!$request->user_search, function ($query, $search) use ($request) {
                    return $query->where('users.id', 0);
                })
                ->orderBy('users.created_at', 'desc')
                ->paginate(20)
                ->withQueryString(),
            'request' => $request
        ]);
    }

    // ASIGNACIONES----------------------------------
    public function asignacion($id, $mid, $pid)
    {
        //VERIFICA EL ROL DEL USUARIO
        if (Auth::user()->roles[0]->name == 'Ponente') {
            \Gate::authorize('haveaccess', 'ponente.perm');

            //busca el curso
            $curso = Course::with(['modules:course_id,id,nombre,numero', 'teacher:id'])->select('id', 'nombre', 'teacher_id')->findOrFail($id);

            //Si no existe el curso quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$curso) {
                return abort(404);
            }

            //verifica que el usuario auth sea profesor del curso
            if ($curso->teacher_id != Auth::user()->id) {
                return abort(403);
            }

            //Buscar el modulo con el mid
            $modulo = Module::select('id', 'nombre', 'course_id', 'numero')->findOrFail($mid);

            //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$modulo) {
                return abort(404);
            }

            //verifica que el modulo pertenezca al curso
            if ($modulo->course_id != $curso->id) {
                //si no está lo mandamos a la vista informacion -  solo si es alumno
                return abort(403);
            }

            // Buscar la asignacion
            $entrada = Entry::with('users:id')->select('id', 'titulo', 'created_at', 'contenido', 'tipo', 'module_id', 'permitir_envios_retrasados', 'fecha_de_entrega', 'max_calif')->findOrFail($pid);

            //Si no existe la entrada quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$entrada) {
                return abort(404);
            }

            //verificar que la entrada sea asingacion o examen
            if ($entrada->tipo != 'Asignacion' && $entrada->tipo != 'Examen') {
                return abort(403);
            }

            //verifica que pertenezca al modulo
            if ($entrada->module_id != $modulo->id) {
                return abort(403);
            }

            $alumnos =
                User::whereHas('courses', function ($query) use ($id) {
                    $query->where('courses.id', '=', $id);
                })->with(['entries' => function ($entrega) use ($pid) {
                    return $entrega->where('entries.id', $pid)->select('entries.id')
                        ->withPivot('calificacion', 'archivo', 'Comentario', 'created_at');
                }])
                ->get(['foto', 'nombre', 'apellido_p', 'apellido_m', 'id']);

            $nAlumnos = count($alumnos);
            $nEntregas = count($entrada->users);

            return Inertia::render('Curso/Asignacion/Asignacion', [
                'curso' => $curso,
                'modulo' => $modulo,
                'asignacion' => $entrada,
                'alumnos' => $alumnos,
                'nAlumnos' => $nAlumnos,
                'nEntregas' => $nEntregas,
                'comments' => Comment::with('user:id,nombre,apellido_p,apellido_m,foto')->where('entrie_id', $entrada->id)->orderBy('fecha', 'desc')->get()
            ]);
        } else if (Auth::user()->roles[0]->name == 'Alumno') {
            \Gate::authorize('haveaccess', 'alumno.perm');

            //busca el curso
            $curso = Course::with(['modules:course_id,id,nombre,numero', 'teacher:id'])->select('id', 'nombre', 'teacher_id')->findOrFail($id);

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
                return abort(403);

            //Buscar el modulo con el mid
            $modulo = Module::select('id', 'nombre', 'course_id', 'numero')->findOrFail($mid);

            //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$modulo) {
                return abort(404);
            }

            //verifica que el modulo pertenezca al curso
            if ($modulo->course_id != $curso->id) {
                //si no está lo mandamos a la vista informacion -  solo si es alumno
                return abort(403);
            }

            // Buscar la asignacion
            $entrada = Entry::with([
                'files:archivo,entry_id',
                'users' => function ($entrega) {
                    return $entrega->where('entry_user.user_id', Auth::user()->id)->select('users.id')
                        ->withPivot('calificacion', 'archivo', 'fecha', 'editado', 'Comentario', 'fecha_calif', 'comentario_retroalimentacion', 'nombre_original_archivo', 'created_at', 'updated_at');
                }
            ])->select('id', 'titulo', 'created_at', 'contenido', 'tipo', 'module_id', 'permitir_envios_retrasados', 'fecha_de_entrega', 'max_calif')->findOrFail($pid);


            //Si no existe la entrada quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$entrada) {
                return abort(404);
            }

            //verificar que la entrada sea asingacion o examen
            if ($entrada->tipo != 'Asignacion' && $entrada->tipo != 'Examen') {
                return abort(403);
            }

            //verifica que pertenezca al modulo
            if ($entrada->module_id != $modulo->id) {
                return abort(403);
            }

            return Inertia::render('Curso/Asignacion/Asignacion', [
                'curso' => $curso,
                'modulo' => $modulo,
                'asignacion' => $entrada,
                'comments' => Comment::with('user:id,nombre,apellido_p,apellido_m,foto')->where('entrie_id', $entrada->id)->orderBy('fecha', 'desc')->get()
            ]);
        } else if (Auth::user()->roles[0]->name == 'Administrador') {
            \Gate::authorize('haveaccess', 'admin.perm');

             //busca el curso
             $curso = Course::with(['modules:course_id,id,nombre,numero', 'teacher:id'])->select('id', 'nombre', 'teacher_id')->findOrFail($id);

             //Si no existe el curso quiere decir que algo anda mal y por eso se regresa a la vista de error
             if (!$curso) {
                 return abort(404);
             }

              //Buscar el modulo con el mid
            $modulo = Module::select('id', 'nombre', 'course_id', 'numero')->findOrFail($mid);

            //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$modulo) {
                return abort(404);
            }

            //verifica que el modulo pertenezca al curso
            if ($modulo->course_id != $curso->id) {
                //si no está lo mandamos a la vista informacion -  solo si es alumno
                return abort(403);
            }

            // Buscar la asignacion
            $entrada = Entry::with('users:id')->select('id', 'titulo', 'created_at', 'contenido', 'tipo', 'module_id', 'permitir_envios_retrasados', 'fecha_de_entrega', 'max_calif')->findOrFail($pid);

            //Si no existe la entrada quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$entrada) {
                return abort(404);
            }

            //verificar que la entrada sea asingacion o examen
            if ($entrada->tipo != 'Asignacion' && $entrada->tipo != 'Examen') {
                return abort(403);
            }

            //verifica que pertenezca al modulo
            if ($entrada->module_id != $modulo->id) {
                return abort(403);
            }
            
            $alumnos =
                User::whereHas('courses', function ($query) use ($id) {
                    $query->where('courses.id', '=', $id);
                })->with(['entries' => function ($entrega) use ($pid) {
                    return $entrega->where('entries.id', $pid)->select('entries.id')
                        ->withPivot('calificacion', 'archivo', 'Comentario', 'created_at');
                }])
                ->get(['foto', 'nombre', 'apellido_p', 'apellido_m', 'id']);

            $nAlumnos = count($alumnos);
            $nEntregas = count($entrada->users);

            return Inertia::render('Curso/Asignacion/Asignacion', [
                'curso' => $curso,
                'modulo' => $modulo,
                'asignacion' => $entrada,
                'alumnos' => $alumnos,
                'nAlumnos' => $nAlumnos,
                'nEntregas' => $nEntregas,
                'comments' => Comment::with('user:id,nombre,apellido_p,apellido_m,foto')->where('entrie_id', $entrada->id)->orderBy('fecha', 'desc')->get()
            ]);

        } else {
            return abort(403);
        }
    }

    public function entregarAsignacion($id, $mid, $pid, Request $request)
    {
        \Gate::authorize('haveaccess', 'alumno.perm');

        //VALIDAMOS DATOS
        $validated = $request->validate([
            'archivos' => 'nullable:comentario|file',
            'comentario' => 'required_without:archivos',
        ]);

        $archivos = null;
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
                return abort(403);

            //Buscar el modulo con el mid
            $modulo = Module::findOrFail($mid);

            //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$modulo) {
                return abort(404);
            }

            //verifica que el modulo pertenezca al curso
            if ($modulo->course_id != $curso->id) {
                //si no está lo mandamos a la vista informacion -  solo si es alumno
                return abort(403);
            }

            // Buscar la asignacion
            $entrada = Entry::findOrFail($pid);


            //Si no existe la entrada quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$entrada) {
                return abort(404);
            }

            //verificar que la entrada sea asingacion
            if ($entrada->tipo != 'Asignacion') {
                return abort(403);
            }

            //verifica que pertenezca al modulo
            if ($entrada->module_id != $modulo->id) {
                return abort(403);
            }

            //verifica que no haya otra entrega ni este calificado
            foreach ($entrada->users as $tarea) {
                if ($tarea->id == Auth::user()->id)
                    return \Redirect::back()->with('error', 'Ya no puedes volver a enviar la asignación, primero cancela el envío anterior.');
            }

            //verifica que la fecha actual no se haya pasado en caso que no se acepten entregas tardías
            if (!$entrada->permitir_envios_retrasados && $entrada->fecha_de_entrega) {
                $hoy = \Carbon\Carbon::now();
                $fechaEntrega = \Carbon\Carbon::create($entrada->fecha_de_entrega);
                if (!$hoy->lte($fechaEntrega))
                    return \Redirect::back()->with('error', 'Ya no puedes enviar la asignación.');
            }

            //se crea y actualiza la asignacion
            if ($request->file('archivos')) {
                //guarda el archivo
                $archivos = $request->file('archivos')->store('public/entregas_asignaciones');
                $entrada->users()->sync([Auth::user()->id => ['Comentario' => $request->comentario, 'archivo' => $request->file('archivos')->hashName(), 'nombre_original_archivo' => $request->file('archivos')->getClientOriginalName()]]);
            } else {
                $entrada->users()->sync([Auth::user()->id => ['Comentario' => $request->comentario]]);
            }

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'create';
            $newLog->user_id = Auth::id();
            $newLog->accion = "{}";

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha entregado la asignacion de id: ' . $entrada->id;

            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();

            return \Redirect::back()->with('success', 'Asignación entregada.');
        } catch (\Exception $e) {
            DB::rollBack();
            $entrada->users()->detach(Auth::user()->id);
            if ($archivos) {
                \Storage::delete($archivos);
            }
            return \Redirect::back()->with('error', 'No fue posible enviar la asignación, vuelve a intentarlo.');
        }
    }

    public function asignacionEntrega($id, $mid, $pid, $eid)
    {
        //VERIFICA EL ROL DEL USUARIO
        if (Auth::user()->roles[0]->name == 'Ponente' || Auth::user()->roles[0]->name == 'Administrador') {
            if(Auth::user()->roles[0]->name == 'Ponente'){
                //verifica que el ponente pertenezca al curso
                $curso = Course::findOrFail($id);
                if($curso->teacher_id != Auth::id())
                    return abort(403);
            }
            //Buscar el modulo con el mid (module id) que llega y que este tenga en course_id la relación al curso que está llegando $id
            $modulo = Module::where('id', $mid)->where('course_id', $id)->first();

            //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
            if (!$modulo) {
                return abort(404);
            }

            // Buscar la asignacion y se verifica que perteneza al modulo
            $entrada = Entry::where('id', $pid)->where('module_id', $mid)->first();
            if (!$entrada) {
                return abort(404);
            }

            //Ahora buscar la entrega del alumno
            $entrega = Entry::where('entries.id', $pid)
                ->leftJoin('entry_user', 'entries.id', '=', 'entry_user.entry_id')
                ->leftJoin('users', 'entry_user.user_id', '=', 'users.id')
                ->where('users.id', $eid)
                ->where('entry_user.user_id', $eid)
                ->select(
                    'entry_user.*',
                    'entries.tipo',
                    'users.nombre as nombre',
                    'users.apellido_p',
                    'users.apellido_m',
                    'users.id as id',
                    'users.foto as foto',
                )
                ->first();
            //si no encuentra la entrega quiere decir que no la entregó el alumno o que es un examen
            if (!$entrega) { 
                //se sacan los datos del usuario para mostrarlos en la vista
                $entrega = User::where('users.id', $eid)
                    ->where('course_user.course_id', $id)
                    ->leftJoin('course_user', 'users.id', '=', 'course_user.user_id')
                    ->select(
                        'users.nombre',
                        'users.apellido_p',
                        'users.apellido_m',
                        'users.id as id',
                        'users.sexo as usuario',
                        'users.foto as foto',
                    )
                    ->first();
            }
            return Inertia::render('Curso/Asignacion/RevisarAsignacion', [
                'curso' => Course::with('modules:course_id,id,nombre,numero')->findOrFail($id),
                'modulo' => $modulo,
                'asignacion' => $entrada,
                'entrega' => $entrega,
            ]);
        } else{
            return abort(403);
        }
    }

    public function asignacionEntregaCalificar($aid, $eid, Request $request){
        if (Auth::user()->roles[0]->name == 'Ponente' || Auth::user()->roles[0]->name == 'Administrador') {
            $validated = $request->validate([
                'calificacion' => ['required','numeric'],
                'comentario' => ['max:65000'],
            ]);
            
            DB::beginTransaction();
            try { 
                $asignacion=Entry::findOrFail($aid);

                if(Auth::user()->roles[0]->name == 'Ponente'){
                    //verifica que el ponente pertenezca al curso
                    if($asignacion->module->course->teacher_id != Auth::id())
                        return abort(403);
                }

                if($asignacion->max_calif < $request->calificacion){
                    return \Redirect::back()->with('error', 'La calificación máxima permitida es: '.$asignacion->max_calif.'.');
                }
                $entrada=Entry::
                    leftJoin('entry_user','entries.id','=','entry_user.entry_id')
                    ->where('entry_user.user_id',$eid)
                    ->where('entry_user.entry_id',$aid)
                    ->select('entry_user.id as id')
                    ->first();

                if($entrada){
                    // \DB::table('entry_user')->where('id',$entrada->id)->update([
                    //     [
                    //         'calificacion'                      => $request->calificacion,
                    //         'comentario_retroalimentacion'      => $request->comentario,
                    //     ]
                    // ]);
                    $usuario=User::findOrFail($eid);
                    $todayDate = Carbon::now();
                    $asignacion->users()->updateExistingPivot($usuario->id,[
                        'calificacion'                      => $request->calificacion,
                        'fecha_calif'                       => $todayDate->toDateTimeString(),
                        'comentario_retroalimentacion'      => $request->comentario,
                    ]);
                }
                else{
                    $usuario=User::findOrFail($eid);
                    $todayDate = Carbon::now();
                    $asignacion->users()->attach($usuario->id,[
                        'calificacion'                      => $request->calificacion,
                        'fecha_calif'                       => $todayDate->toDateTimeString(),
                        'comentario_retroalimentacion'      => $request->comentario,
                    ]);
                }
                DB::commit();
                return \Redirect::back()->with('success', 'La calificación se guardó correctamente.');
            } catch (\Throwable $th) {
                DB::rollback();
                return \Redirect::back()->with('error', 'Ocurrió un error inesperado, inténtelo más tarde.');
            }
        }
        else{
            return abort(403);
        }
    }

    public function inscribir($id)
    {
        \Gate::authorize('haveaccess', 'alumno.perm');

        $curso = Course::with('modules:course_id,id,nombre,numero')->findOrFail($id);

        //Verificar que el usuario no pertenezca a algún curso activo
        $user = User::with('courses:id,estatus')->findOrFail(Auth::id());
        foreach ($user->courses as $curso) {
            if ($curso->estatus == 'Activo') {
                return \Redirect::back()->with('error', 'Ya perteneces a un curso actualmente activo.');
            }
        }

        //verifica la fecha de inscripcion
        $fIncio = new \DateTime($curso->inicio_inscripciones);
        $fFinal = new \DateTime($curso->fecha_limite);
        $fHoy = new \DateTime("midnight");

        // dd($fHoy, $fIncio, $fFinal);

        if($fHoy < $fIncio)
            return \Redirect::back()->with('message', 'No puedes inscribirte, aún no comienza el periodo de inscripciones para este curso.');
        else if($fHoy > $fFinal)
            return \Redirect::back()->with('error', 'No puedes inscribirte, el periodo de inscripciones para este curso ha terminado.');
        
        try {
            DB::beginTransaction();

            //Se inscribe automáticamente
            if ($curso->tipo_acceso == 'Automática') {
                $user->courses()->attach($curso->id);
                //SE CREA EL LOG
                $newLog = new Log;

                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    course_user: {
                        course_id: ' . $id .
                    'user_id: ' . $user->id .
                    '},
                }';

                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' se ha inscrito al curso: ' . $curso->nombre;
                // //SE GUARDA EL LOG
                $newLog->save();

                $notification = new Notification();
                $notification->titulo = $user->nombre . ' se ha inscrito al curso: ' . $curso->nombre;
                $notification->visto = false;
                $notification->user_id = $curso->teacher_id;
                $notification->save();

                DB::commit();
                return \Redirect::route('cursos.informacion', $id)->with('success', 'Te has inscrito a este curso.');
            }

            //Se manda solicitud
            else if ($curso->tipo_acceso == 'Solicitud') {
                $oldRequest = Application::where('course_id', $id)->where('user_id', Auth::id())->first();
                if ($oldRequest) {
                    return \Redirect::back()->with('message', 'Ya solicitaste inscripción a este curso.');
                }
                $newRequest = new Application();
                $newRequest->course_id = $id;
                $newRequest->user_id = Auth::id();
                $newRequest->estatus = 'En espera';
                $newRequest->save();
                //SE CREA EL LOG
                $newLog = new Log;

                $newLog->categoria = 'create';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                    requests: {
                        course_id: ' . $newRequest->course_id .
                    'user_id: ' . $newRequest->user_id .
                    'estatus: ' . $newRequest->estatus .
                    '},
                }';

                $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha solicitado unirse al curso: ' . $curso->nombre;
                // //SE GUARDA EL LOG
                $newLog->save();

                $notification = new Notification();
                $notification->titulo = 'Tienes una nueva solicitud de ingreso al curso: ' . $curso->nombre;
                $notification->visto = false;
                $notification->user_id = $curso->teacher_id;
                $notification->save();

                DB::commit();
                return \Redirect::back()->with('success', 'Solicitud de inscripción enviada con éxito.');
            } else {
                DB::rollback();
                return \Redirect::route('cursos.informacion', $id)->with('error', 'No es posible inscribirse a este curso, contacta al profesor para que él mismo te inscriba.');
            }
        } catch (\Throwable $th) {
            DB::rollback();
            return \Redirect::back()->with('error', 'Ha ocurrido un problema, vuela a intentarlo más tarde.');
        }
    }

    public function darBajaEstudiante($id){
        // Confirmar los permisos para esta accion
        if (Auth::user()->roles[0]->name == 'Ponente' || Auth::user()->roles[0]->name == 'Administrador') {
            // Encontrar usuario estudiante
            $user=User::findOrFail($id);
            // Encontrar curso al que pertenece
            $curso_actual = $user->activeCourses[0];

            // curso-usuario
            $cursoUser=DB::table('course_user')->where('user_id',$id)->get();

            DB::beginTransaction();
            try {
                // Iniciar eliminacion
                $user->courses()->detach($curso_actual->course_id);//eliminamos la relación del usuario con el curso
            
                //SE CREA EL LOG
                $newLog = new Log;
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                '{
                    course_user: {
                        course_id: ' . $curso_actual->id . ',\n
                        user_id: ' . $id . ',\n
                        calificacion_final: ' . $cursoUser[0]->calificacion_final . ',\n
                    }
                }';
                $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha dado del baja al estudiante '.$user->nombre.' '.$user->apellido_p.' del curso '.$curso_actual->id;
                
                //SE GUARDA EL LOG
                $newLog->save();

                //SE HACE COMMIT
                DB::commit();
                
                //REDIRECCIONA A LA VISTA
                return \Redirect::back()->with('success','Se ha dado de baja al estudiante con éxito!');
            
            } catch (\Exception $e) {
                DB::rollBack();            
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar dar de baja al estudiante, inténtelo más tarde.');
            }
        }
        else{
            return abort(403);
        }
    }
}