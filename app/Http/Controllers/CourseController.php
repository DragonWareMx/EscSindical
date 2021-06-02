<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use App\Models\Course;
use App\Models\Module;
use App\Models\Tag;
use App\Models\Log;
use App\Models\Entry;
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
            $OldCourses = Course::where('teacher_id', Auth::id())->where('estatus', 'Terminado')->with('users','images','tags',)->get();
            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'activeCourses', 'activeCourses.images'
                ])->where('id', Auth::id())->first(),
                'cursos' => fn () => $cursos,
                'finishedCourses' =>$OldCourses,
            ]);
        } else {
            \Gate::authorize('haveaccess', 'alumno.perm');
            $curso_actual = $user->courses[0];
            $profesor = $curso_actual->teacher;
            $tags = $curso_actual->tags;
            return Inertia::render('Cursos/Cursos', [
                'user' => fn () => User::with([
                    'roles', 'requests', 'requests.course.images', 'requests.course.teacher', 'requests.course.tags', 'activeCourses', 'activeCourses.images', 'finishedCourses', 'finishedCourses.images', 'finishedCourses.teacher' , 'finishedCourses.tags'
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
        \Gate::authorize('haveaccess', 'ponente.perm');
        return Inertia::render('Cursos/ModuleCreate', [
            'cursos' => Course::where('teacher_id', Auth::id())->get()
        ]);
    }

    public function storeModule(Request $request){
        \Gate::authorize('haveaccess', 'ponente.perm');
        $validated = $request->validate([
            'nombre' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
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
                    'criterios: '. $request->criterios_de_evaluacion.                    
                    'temario: ' . $request->temario .
                    'course_id: '.$request->curso.
                '},
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha creado el módulo: '. $newModule->nombre;
                
            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos.informacion', $request->curso)->with('success', 'El módulo de este curso se ha creado exitosamente');
        }
        catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return \Redirect::route('cursos.informacion', $request->curso)->with('error', 'No se pudo crear un módulo para este curso');
        }
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
            'capacitaciones' => Training_type::get(),
        ]);
    }

    public function update($id, Request $request)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
        //VALIDAMOS DATOS
        $validated = $request->validate([
            'nombre' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'tags' => 'nullable',
            'fecha_inicio' => 'required|date|after:today',
            'fecha_final' => 'required|date|after:fecha_inicio',
            'link' => 'required|url',
            'vc' => 'required|boolean',
            'tipos_de_capacitacion' => 'nullable',
            'tipo_inscripcion' => 'required|exists:courses,tipo_acceso',
            'descripcion' => 'required',
            'imgs' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:51200',
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
                 

            $myCourse->save();
            //SE AGREGAN REGISTROS A SUS RELACIONES
            //TAGS
            $tagsLog = "Sin cambios";
            if($request->tags){
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
            
            if($request->tipos_de_capacitacion){
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
            if($request->imgs){
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
                    valor_curricular: '. $request->vc. ',\n                    
                    tipo_acceso: ' . $request->tipo_inscripcion . ',\n
                    descripcion: '.$request->descripcion. ',\n
                    teacher_id: ' . Auth::id() . ',\n
                    max: ' .$request->maximo. ',\n
                    link: ' . $request->link . ',\n
                },
                tags:'. $tagsLog .',\n
                tipos_capacitacion: ' . $capacitaciones  . ',\n
                imgs: ' . $imagenes . ',\n
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha editado el curso: '. $myCourse->nombre;
                
            // //SE GUARDA EL LOG
            $newLog->save();

            DB::commit();
            return \Redirect::route('cursos.informacion', $id)->with('success', 'El curso se ha editado exitosamente');
        } catch (\Exception $e) {
            
            DB::rollBack();
            dd($e);
            return \Redirect::route('cursos.informacion', $id)->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
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
        $cursosCount=Course::with('teacher:id')->find($id);
        $cursosCount=Course::where('teacher_id',$cursosCount->teacher->id)->count();
        $participantesCount=Course::with('users:id')->findOrFail($id);
        $participantesCount=$participantesCount['users']->count();
        $calificacion=Course::where('courses.id',$id)->leftJoin('course_user','courses.id','=','course_user.course_id')->where('course_user.user_id',Auth::id())->get();

        return Inertia::render('Curso/Informacion', [
            'curso' => Course::with('images:imagen,course_id', 'tags:nombre','teacher:nombre,apellido_p,apellido_m,foto,id')->findOrFail($id),
            'cursos_count'=> $cursosCount,
            'participantes_count'=>$participantesCount,
        ]);
    }

    public function modulos($id){
        return Inertia::render('Curso/ModulosConfig', [
            'curso' => Course::findOrFail($id),
        ]);
    }

    public function modulo($id,$mid)
    {
        //Buscar el modulo con el mid (module id) que llega y que este tenga en course_id la relación al curso que está llegando $id
        $modulo=Module::where('id',$mid)->where('course_id',$id)->first();
        //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
        if(!$modulo){
            return abort(404);
        }

        //Se obtienen todos los avisos, el primer where obtiene todas las entradas pertenecientes al módulo y el segundo filtra esas entradas en todas las 
        //que son de tipo Aviso, después se hace otro filtrado donde se obtienen los que son visibles, los que no son visibles (1) no hay por que mandarlos a la vista
        $avisos=Entry::with('files:archivo,entry_id')->where('module_id',$mid)->where('tipo','Aviso')->where('visible',1)->orderBy('id','DESC')->get();

        //Se obtenienen todas las demás entradas que no sean de tipo aviso, tarea ni examen pero que también sean visibles y pertenezcarn al módulo
        $entradas=Entry::with('files:archivo,entry_id')->where('module_id',$mid)->where('tipo','!=','Aviso')->where('tipo','!=','Asignacion')->where('tipo','!=','Examen')
            ->where('visible',1)->orderBy('id','DESC')->get();

        //Se obtenienen todas las tareas y todos los exámenes, se pone este orderBy para que aparezcan listados del más reciente al más viejo
        $actividades=Entry::with('files:archivo,entry_id')->where('module_id',$mid)->where('tipo','!=','Aviso')->where('tipo','!=','Informacion')->where('tipo','!=','Enlace')->where('tipo','!=','Archivo')->orderBy('id','ASC')->get();
        
        return Inertia::render('Curso/Modulo', [
            //Aquí adentro se mandan las variables (JSONS) a la vista, en este caso curso se hace la consulta aquí mismo, pero las demás variables se igualan a las que 
            //sacamos anteriormente
            'curso' => Course::findOrFail($id),
            'modulo' => $modulo,
            'avisos' => $avisos,
            'entradas' => $entradas,
            'actividades' =>$actividades,
            //Ahora en el archivo de la vista recuerda que debe recibir todas las variables que le estamos mandando para poder usarlas, en este caso las recibe en la linea 7
        ]);
    }

    public function participantes($id)
    {
        return Inertia::render('Curso/Participantes', [
            'curso' => Course::with('users:id,nombre,foto,apellido_p,apellido_m,email','teacher:nombre,apellido_p,apellido_m,foto,id,email')->findOrFail($id),
        ]);
    }

    public function mochila($id)
    {
        \Gate::authorize('haveaccess', 'alumno.perm');
        $user = User::find(Auth::id());
        $curso=$user->courses()->where('course_id',$id)->first();
        if(!$curso){
            return abort(404);
        }

        $entradas=Course::where('courses.id',$id)->leftJoin('modules','courses.id','=','modules.course_id')
            ->leftJoin('entries','modules.id','=','entries.module_id')
            ->where('entries.visible',1)
            ->whereIn('entries.tipo',['Asignacion','Examen'])
            ->select('entries.*','modules.nombre as modulo','modules.numero as numero')
            ->orderBy('fecha_de_entrega','ASC')
            ->get();

        $realizadas=Course::where('courses.id',$id)->leftJoin('modules','courses.id','=','modules.course_id')
            ->leftJoin('entries','modules.id','=','entries.module_id')
            ->where('entries.visible',1)
            ->whereIn('entries.tipo',['Asignacion','Examen'])
            ->join('entry_user','entries.id','=','entry_id')
            ->where('entry_user.user_id',$user->id)
            ->select('entries.id as id','entries.tipo as tipo','entries.titulo as titulo','modules.nombre as modulo', 'entries.fecha_de_apertura as fecha_de_apertura', 
                'entries.fecha_de_entrega as fecha_de_entrega', 'entry_user.fecha as fecha', 'entry_user.calificacion as calificacion', 'entries.max_calif as max_calif',
                'entries.permitir_envios_retrasados as permitir_envios_retrasados','modules.numero as numero')
            ->orderBy('fecha_de_entrega','ASC')
            ->get();

        $pendientes=[];
        $i=0;
        foreach($entradas as $entrada){
            $found=false;
            foreach($realizadas as $realizada){
                if($entrada->id == $realizada->id){
                    $found=true;
                    break;
                }
            }    
            if($found == false){
                $pendientes[$i]=$entrada;
                $i++;
            }
        }

        return Inertia::render('Curso/Mochila', [
            'curso' => $curso,
            'realizadas' =>$realizadas,
            'pendientes'=>$pendientes,
        ]);
    }

    public function solicitudes($id)
    {
        $curso = Course::with('waitingRequests:nombre,apellido_p,apellido_m,id,foto')
                        ->select('nombre','id')
                        ->findOrFail($id);
        return Inertia::render('Curso/Solicitudes', [
            'curso' => $curso,
        ]);
    }

    public function verPublicacion($id,$mid,$pid)
    {
        //Buscar el modulo con el mid (module id) que llega y que este tenga en course_id la relación al curso que está llegando $id
        $modulo=Module::where('id',$mid)->where('course_id',$id)->first();
        //Si no existe el módulo quiere decir que algo anda mal y por eso se regresa a la vista de error
        if(!$modulo){
            return abort(404);
        }
        //Se obtiene la entrada que se desea mostrar en la vista
        $entrada=Entry::with('files:archivo,entry_id')->findOrFail($pid);
        return Inertia::render('Curso/VerPublicacion', [
            'curso' => Course::findOrFail($id),
            'modulo' => $modulo,
            'entrada' => $entrada,
        ]);
    }
    
    
    public function agregarParticipante($id, Request $request){
        return Inertia::render('Curso/AgregarParticipante', [
            'curso' => Course::findOrFail($id),
            'users' =>
                fn () => User::with('activeCourses:id')->select('users.id','nombre','apellido_p', 'apellido_m', 'email')
                            ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
                            ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
                            ->where('roles.name','Alumno')
                            ->when($request->user_search, function ($query, $search) use ($request) {
                                if ($request->filter) {
                                    switch ($request->filter) {
                                        case 'matricula':
                                            return $query->where('users.matricula', 'LIKE', '%' . $search . '%')->where('roles.name','Alumno');
                                            break;
                                        case 'nombre':
                                            return $query->WhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                            )->orWhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                            )->where('roles.name','Alumno');
                                            break;
                                        case 'email':
                                            return $query->where('users.email', 'LIKE', '%' . $search . '%')->where('roles.name','Alumno');
                                            break;
                                        default:
                                        return $query->WhereRaw(
                                            "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                        )->orWhereRaw(
                                            "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                        )->where('roles.name','Alumno');
                                            break;
                                    }
                                } else
                                return $query->WhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                )->orWhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                )->where('roles.name','Alumno');
                            })
                            ->when(!$request->user_search, function ($query, $search) use ($request) {
                                return $query->where('users.id',0);
                            })
                            ->orderBy('users.created_at','desc')
                            ->paginate(20)
                            ->withQueryString()
                ,
                'request' => $request
        ]);
    }
    
}
