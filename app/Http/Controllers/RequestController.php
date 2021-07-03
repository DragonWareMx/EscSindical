<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Course;
use App\Models\Log;
use App\Models\Notification;
use App\Models\Drop_requests;
use App\Models\Delete_requests;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

class RequestController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request){
        \Gate::authorize('haveaccess', 'admin.perm');
        return Inertia::render('Solicitudes/Solicitudes', [
            'solicitudes' => fn () => Delete_requests::with('course', 'user')
                ->leftJoin('users', 'users.id', '=', 'delete_requests.user_id')
                ->leftJoin('courses', 'courses.id', '=', 'delete_requests.course_id')
                ->when($request->filter == 'eliminado', function ($query) {
                    return $query->where('status', 'Aprobado');
                })
                ->when($request->user_search, function ($query, $search) use ($request) {
                    if ($request->filter) {
                        switch ($request->filter) {
                            case 'matricula':
                                return $query->where('users.matricula', 'LIKE', '%' . $search . '%');
                                break;
                            case 'estatus':
                                return $query->where('delete_requests.status', 'LIKE', '%' . $search . '%');
                                break;
                            case 'curso':
                                return $query->where('courses.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'usuario':
                                return $query->WhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                            )->orWhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                            );
                                break;
                            case 'eliminado':
                                return $query->where('courses.nombre', 'LIKE', '%' . $search . '%')
                                            ->onlyTrashed(); //PROBAR DESPUÉS
                                break;

                            default:
                                return $query->where('users.nombre', 'LIKE', '%' . $search . '%');
                                break;
                        }
                    } else 
                        return $query->WhereRaw(
                            "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                        )->orWhereRaw(
                            "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                        );
                })
                ->when($request->sort, function ($query, $sort) use ($request) {
                    switch ($sort) {
                        case 'matricula':
                            if ($request->order == 'asc')
                                return $query->orderBy('users.matricula', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('users.matricula', 'DESC');
                            else
                                return $query;
                            break;
                        case 'id':
                            if ($request->order == 'asc')
                                return $query->orderBy('delete_requests.id', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('delete_requests.id', 'DESC');
                            else
                                return $query;
                            break;
                        case 'usuario':
                            if ($request->order == 'asc')
                                return $query->orderBy('users.nombre', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('users.nombre', 'DESC');
                            else
                                return $query;
                            break;
                        case 'curso':
                            if($request->order == 'asc')
                                return $query->orderBy('courses.nombre', 'ASC');
                            else if($request->order == 'desc')
                                return $query->orderBy('courses.nombre', 'DESC');
                            else
                                return $query;
                            break;
                        case 'fecha':
                            if ($request->order == 'asc')
                                return $query->orderBy('delete_requests.created_at', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('delete_requests.created_at', 'DESC');
                            else
                                return $query;
                            break;
                        default:
                            # code...
                            break;
                    }
                })
                ->select('delete_requests.id', 'users.matricula', 'users.nombre', 'apellido_p', 'apellido_m', 'course_id','user_id', 'courses.nombre', 'delete_requests.created_at', 'status')
                ->orderBy('delete_requests.created_at','desc')
                ->paginate(20)
                ->withQueryString(),
            'request' => $request
        ]);
    }

    public function indexAlumno(Request $request){
        \Gate::authorize('haveaccess', 'admin.perm');
        return Inertia::render('Solicitudes/SolicitudesAlumno', [
            'solicitudes' => fn () => Drop_requests::with('course', 'user')
                ->leftJoin('users', 'users.id', '=', 'drop_requests.user_id')
                ->leftJoin('courses', 'courses.id', '=', 'drop_requests.course_id')
                ->when($request->filter == 'eliminado', function ($query) {
                    return $query->where('status', 'Aprobado');
                })
                ->when($request->user_search, function ($query, $search) use ($request) {
                    if ($request->filter) {
                        switch ($request->filter) {
                            case 'matricula':
                                return $query->where('users.matricula', 'LIKE', '%' . $search . '%');
                                break;
                            case 'estatus':
                                return $query->where('drop_requests.status', 'LIKE', '%' . $search . '%');
                                break;
                            case 'curso':
                                return $query->where('courses.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'usuario':
                                return $query->WhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                            )->orWhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                            );
                                break;
                            case 'eliminado':
                                return $query->where('courses.nombre', 'LIKE', '%' . $search . '%')
                                            ->onlyTrashed(); //PROBAR DESPUÉS
                                break;

                            default:
                                return $query->where('users.nombre', 'LIKE', '%' . $search . '%');
                                break;
                        }
                    } else 
                        return $query->WhereRaw(
                            "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                        )->orWhereRaw(
                            "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                        );
                })
                ->when($request->sort, function ($query, $sort) use ($request) {
                    switch ($sort) {
                        case 'matricula':
                            if ($request->order == 'asc')
                                return $query->orderBy('users.matricula', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('users.matricula', 'DESC');
                            else
                                return $query;
                            break;
                        case 'id':
                            if ($request->order == 'asc')
                                return $query->orderBy('drop_requests.id', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('drop_requests.id', 'DESC');
                            else
                                return $query;
                            break;
                        case 'usuario':
                            if ($request->order == 'asc')
                                return $query->orderBy('users.nombre', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('users.nombre', 'DESC');
                            else
                                return $query;
                            break;
                        case 'curso':
                            if($request->order == 'asc')
                                return $query->orderBy('courses.nombre', 'ASC');
                            else if($request->order == 'desc')
                                return $query->orderBy('courses.nombre', 'DESC');
                            else
                                return $query;
                            break;
                        case 'fecha':
                            if ($request->order == 'asc')
                                return $query->orderBy('drop_requests.created_at', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('drop_requests.created_at', 'DESC');
                            else
                                return $query;
                            break;
                        default:
                            # code...
                            break;
                    }
                })
                ->select('drop_requests.id', 'users.matricula', 'users.nombre', 'apellido_p', 'apellido_m', 'course_id','user_id', 'courses.nombre', 'drop_requests.created_at', 'status')
                ->orderBy('drop_requests.created_at','desc')
                ->paginate(20)
                ->withQueryString(),
            'request' => $request
        ]);
    }


    public function verSolicitud($id, $type){
        \Gate::authorize('haveaccess', 'admin.perm');
        
        if ($type == 'delete') {
            $curso="";
            $relacion="";
            $solicitud = Delete_requests::with('course','user')->find($id);
            if(!$solicitud->course){
                $curso = Course::onlyTrashed()->find($solicitud->course_id);
            }
            return Inertia::render('Solicitudes/VerSolicitud', [
                'solicitud'=>$solicitud,
                'tipo'=>$type,
                'curso'=>$curso,
           ]);
        }
        else {
            $solicitud = Drop_requests::with('course','user')->find($id);
            $curso="";
            $relacion="";
            $alumno = User::find($solicitud->user_id);
           
            if(count($alumno->activeCourses)>0){
                if ($alumno->activeCourses[0]->id == $solicitud->course_id) $relacion=true;
            }

            return Inertia::render('Solicitudes/VerSolicitud', [
                'solicitud'=>$solicitud,
                'tipo'=>$type,
                'curso'=>$curso,
                'relacion'=>$relacion
        ]);
        }
    }

    public function aprobar($id, Request $request)
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
            "solicitud"    => "required|array|min:1",
            'solicitud.*' => 'required|exists:users,id',
            'aprobado' => 'required|boolean'
        ]);
        //la solicitud es valida...

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            //verifica que el curso exista
            $curso = Course::find($id);

            if(!$curso){
                DB::rollBack();
                return \Redirect::back()->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            }

            //verifica que el usuario loggeado sea el maestro del curso
            if($curso->teacher->id != Auth::User()->id){
                DB::rollBack();
                return \Redirect::back()->with('error', 'No puede aprobar o rechazar solicitudes si usted no es el maestro del curso.');
            }
            
            $cadenaLog = '';
            $contador = 0;
            //Se busca curso a editar con id
            foreach ($request->solicitud as $usuario) {
                $usuarioSolicitud = User::find($usuario);

                //verifica que el usuario exista
                if($usuarioSolicitud){
                    //verifica que el usuario sea un alumno
                    if ($usuarioSolicitud->roles && $usuarioSolicitud->roles[0]->name == 'Alumno') {
                        if($request->aprobado){
                            $status = 'Aceptado';

                            //agrega el usuario al curso
                            $usuarioSolicitud->courses()->sync($id, false);

                            //mandar notificacion al usuario
                            $notificacion = new Notification();
                            $notificacion->user_id = $usuarioSolicitud->id;
                            $notificacion->titulo = "Has sido aceptado en el curso: ".$curso->nombre;
                            $notificacion->visto = false;
                            $notificacion->save();
                        }
                        else{
                            $status = 'Rechazado';

                            //mandar notificacion al usuario
                            $notificacion = new Notification();
                            $notificacion->user_id = $usuarioSolicitud->id;
                            $notificacion->titulo = "Tu solicitud ha sido rechazada para el curso: ".$curso->nombre;
                            $notificacion->visto = false;
                            $notificacion->save();
                        }

                        //se actualiza el status de la solicitud
                        $curso->requests()->sync([$usuarioSolicitud->id => ['estatus' => $status]]);

                        $cadenaLog =$cadenaLog . $contador.': {
                            user_id: '.$usuarioSolicitud->id.',
                            course_id: '.$id.',
                            estatus: '.$status.'
                        },';
                    }
                }
                $contador++;
            }

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'update';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                requests: {
                   '.$cadenaLog.'
                }
            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha '.$status.' '.$contador.' usuarios en el curso de id: ' . $id.' llamado: '.$curso->nombre;

            //SE GUARDA EL LOG
            $newLog->save();

            if(!$newLog){
                DB::rollBack();
                return \Redirect::back()->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            }

            DB::commit();

            if($request->aprobado){
                $status = 'aceptado';
            }
            else{
                $status = 'rechazado';
            }

            return \Redirect::back()->with('success', 'Los usuarios han sido '.$status.'s exitosamente');
            
        } catch (\Exception $e) {
            $curso = Course::find($id);

            //elimina a los usuarios del curso
            foreach ($request->solicitud as $usuario) {
                $usuarioSolicitud = User::find($usuario);
                if($usuarioSolicitud){
                    if($request->aprobado){
                        $usuarioSolicitud->courses()->detach($id);
                    }
                }
                $curso->requests()->sync([$usuarioSolicitud->id => ['estatus' => 'En espera']]);
            }
            DB::rollback();

            return \Redirect::back()->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde.');
        }
    }

    public function agregar($id, Request $request)
    {
        if(Auth::user()->roles[0]->name=='Ponente'){
            \Gate::authorize('haveaccess', 'ponente.perm');
        }
        else if(Auth::user()->roles[0]->name=='Administrador'){
            \Gate::authorize('haveaccess', 'admin.perm');
        } else {
            return abort(403);
        }
        //VALIDAMOS DATOS
        $validated = $request->validate([
            "solicitud"    => "required|array|min:1",
            'solicitud.*' => 'required|exists:users,id',
        ]);
        //la solicitud es valida...

        //COMIENZA TRANSACCIÓN
        DB::beginTransaction();

        try {
            //verifica que el curso exista
            $curso = Course::find($id);

            if(!$curso){
                DB::rollBack();
                return \Redirect::back()->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            }

            //verifica que el usuario loggeado sea el maestro del curso
            if(Auth::user()->roles[0]->name=='Ponente'){
                if($curso->teacher->id != Auth::User()->id){
                    DB::rollBack();
                    return \Redirect::back()->with('error', 'No puede aprobar o rechazar solicitudes si usted no es el maestro del curso.');
                }
            }
            
            $cadenaLog = '';
            $contador = 0;
            //Se busca curso a editar con id
            foreach ($request->solicitud as $usuario) {
                $usuarioSolicitud = User::find($usuario);

                //verifica que el usuario exista
                if($usuarioSolicitud){
                    //verifica que el usuario sea un alumno
                    if($usuarioSolicitud->roles && $usuarioSolicitud->roles[0]->name == 'Alumno') {
                        //agrega el usuario al curso
                        $usuarioSolicitud->courses()->sync($id, false);
    
                        //si existe una solicitud se actualiza el status de la solicitud
                        if ($curso->requests->contains($usuarioSolicitud->id)) {
                            $curso->requests()->sync([$usuarioSolicitud->id => ['estatus' => 'Aceptado']]);
                        }
                        
                        //mandar notificacion al usuario
                        $notificacion = new Notification();
                        $notificacion->user_id = $usuarioSolicitud->id;
                        $notificacion->titulo = "Has sido aceptado en el curso: ".$curso->nombre;
                        $notificacion->visto = false;
                        $notificacion->save();
    
                        $cadenaLog =$cadenaLog . $contador.': {
                            user_id: '.$usuarioSolicitud->id.',
                            course_id: '.$id.',
                        },';
                    }

                }
                $contador++;
            }

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'update';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                requests: {
                   '.$cadenaLog.'
                }

            }';

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha agregado '.$contador.' usuarios en el curso de id: ' . $id.' llamado: '.$curso->nombre;

            //SE GUARDA EL LOG
            $newLog->save();

            if(!$newLog){
                DB::rollBack();
                return \Redirect::back()->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde');
            }

            DB::commit();

            if($request->aprobado){
                $status = 'aceptado';
            }
            else{
                $status = 'rechazado';
            }

            return \Redirect::back()->with('success', 'Los usuarios han sido '.$status.'s exitosamente');
            
        } catch (\Exception $e) {
            $curso = Course::find($id);

            //elimina a los usuarios del curso
            foreach ($request->solicitud as $usuario) {
                $usuarioSolicitud = User::find($usuario);
                if($usuarioSolicitud){
                    if($usuarioSolicitud->roles && $usuarioSolicitud->roles[0]->name == 'Alumno') {
                        $usuarioSolicitud->courses()->detach($id);

                        if ($curso->requests->contains($usuarioSolicitud->id)) {
                            $curso->requests()->sync([$usuarioSolicitud->id => ['estatus' => 'En espera']]);
                        }
                    }
                }
            }
            DB::rollback();

            return \Redirect::back()->with('error', 'Hubo un problema con tu solicitud, inténtalo más tarde.');
        }
    }

    public function bajaAlumno($id, Request $request)
    {
        \Gate::authorize('haveaccess', 'admin.perm');
        //VALIDAMOS DATOS
        $validated= $request->validate([
            'respuesta' => 'required'
        ]);


        DB::beginTransaction();
        try {
            $myRequest = Drop_requests::find($id);
            $notificacion = new Notification;
            $notificacion->user_id = $myRequest->user_id;

            //cambiamos estatus de solicitud de baja de alumno
            if($request->respuesta == 'true') {
                $myRequest->status = 'Aprobado';
                $user = User::find($myRequest->user_id);//buscamos el usuario
                $user->courses()->detach($myRequest->course_id);//eliminamos la relación del usuario con el curso
                
                $notificacion->titulo = "Tu baja del curso ".$myRequest->course->nombre. " ha sido aprobada";//creamos notificación
                
                $newLog = new Log;
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                        drop_requests: {
                        status = Aprobado
                        }
                    }';
                $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha dado de baja al alumno: '. $user->nombre .' del curso '.$myRequest->course->nombre.' de id: '.$myRequest->course->id;
                
            }
            else {
                $myRequest->status ='Rechazado';
                $user = User::find($myRequest->user_id);
                $notificacion->titulo = "Tu baja del curso ".$myRequest->course->nombre. " ha sido rechazada";

                $newLog = new Log;
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                        drop_requests: {
                        status = Rechazado
                        }
                    }';
                $newLog->descripcion = 'El usuario '.Auth::user()->email.' rechazó la solicitud de baja de '. $user->nombre .' del curso '.$myRequest->course->nombre.' de id: '.$myRequest->course->id;
                
            }
            
            $myRequest->save();
            $notificacion->save();
            $newLog->save();

            
            DB::commit();
            return \Redirect::route('solicitudes.alumno')->with('success', 'La acción se llevó a cabo con éxito'); //poner info del alumno
        } catch (\Exception $e) {
            //throw $th;
            // dd($e);
            DB::rollBack();
            return \Redirect::route('solicitudes.alumno')->with('error', 'Hubo un problema, inténtalo de nuevo más tarde');
        }

    }
    public function bajaCurso($id, Request $request)
    {
        \Gate::authorize('haveaccess', 'admin.perm');
        //VALIDAMOS DATOS
        $validated= $request->validate([
            'respuesta' => 'required'
        ]);
        DB::beginTransaction();
        try {
            $myRequest = Delete_requests::find($id);
            $notificacion = new Notification;
            $notificacion->user_id = $myRequest->user_id;

            //cambiamos estatus de solicitud de baja de alumno
            if($request->respuesta == "true") {
                $myRequest->status = 'Aprobado';
                $user = User::find($myRequest->user_id);
                $curso = Course::find($myRequest->course_id);

                $notificacion->titulo = "Tu solicitud de eliminación del curso ".$curso->nombre. " ha sido aprobada";//creamos notificación
                $curso->delete();

                $newLog = new Log;
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                        delete_requests: {
                        status = Aprobado
                        }
                    }';
                $newLog->descripcion = 'El usuario '.Auth::user()->email.' aprobó la solicitud de '. $user->nombre .' para eliminar el curso '.$myRequest->course->nombre.' de id: '.$myRequest->course->id;
            }
            else {
                $myRequest->status ='Rechazado';
                $notificacion->titulo = "Tu solicitud de eliminación del curso ".$myRequest->course->nombre. " ha sido rechazada";
                $user = User::find($myRequest->user_id);

                $newLog = new Log;
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                    '{
                        delete_requests: {
                        status = Rechazado
                        }
                    }';
                $newLog->descripcion = 'El usuario '.Auth::user()->email.' rechazó la solicitud de '. $user->nombre .' para eliminar el curso '.$myRequest->course->nombre.' de id: '.$myRequest->course->id;

            }
            
            $myRequest->save();
            $notificacion->save();
            $newLog->save();
            
            DB::commit();
            return \Redirect::route('solicitudes')->with('success', 'La acción se llevó a cabo con éxito');//poner info del curso
        } catch (\Exception $e) {
            //throw $th;
            // dd($e);
            DB::rollBack();
            return \Redirect::back('solicitudes')->with('error', 'Hubo un problema, inténtalo de nuevo más tarde');
        }
        
    }

    public function restoreCourse($id)
    {
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        DB::beginTransaction();
        try{
            $curso = Course::withTrashed()->find($id);

            if(!$curso){
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el curso, inténtelo más tarde.');
            }


            $curso->restore();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'restore';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                courses: {
                    id: ' . $id .
                '}
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha restaurado el curso: '. $curso->nombre.' de id: '.$curso->id;

            $newLog->save();

            DB::commit();
            return \Redirect::back()->with('success','¡Curso restaurado con éxito!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            // dd($e);
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el curso, inténtelo más tarde.');
        }
    }

    public function restoreAlumno($id)
    {
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        DB::beginTransaction();
        try{
            $solicitud = Drop_requests::find($id);
            $user = User::find($solicitud->user_id);


            if(!$user){
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el alumno, inténtelo más tarde.');
            }

            $user->courses()->attach($solicitud->course_id);

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'restore';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                user_course: {
                    course_id: ' . $solicitud->course_id .
                    'user_id: ' .$user->id .
                '}
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha restaurado al alumno: '. $user->nombre. 'al curso '. $solicitud->course->nombre.' de id: '. $solicitud->course->id;

            $newLog->save();

            DB::commit();
            return \Redirect::back()->with('success','¡Alumno restaurado con éxito!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            // dd($e);
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el alumno, inténtelo más tarde.');
        }
    }
}
