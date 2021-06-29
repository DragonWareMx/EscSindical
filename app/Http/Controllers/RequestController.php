<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
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
            'solicitudesCurso' => Delete_requests::get(),
            'solicitudesAlumno'=> Drop_requests::get(),
        ]);
    }

    public function verSolicitud($id, $type){
        \Gate::authorize('haveaccess', 'admin.perm');
        if ($type == 'delete') $solicitud = Delete_requests::with('course')->find($id);
        else $solicitud = Drop_requests::with('course')->find($id);

        return Inertia::render('Solicitudes/VerSolicitud', [
             'solicitud'=>$solicitud,
             'tipo'=>$type,
        ]);
    }

    public function aprobar($id, Request $request)
    {
        \Gate::authorize('haveaccess', 'ponente.perm');
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

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha '.$status.' '.$contador.' usuarios en el curso de id: ' . $id;

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
        \Gate::authorize('haveaccess', 'ponente.perm');
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

            $newLog->descripcion = 'El usuario ' . Auth::user()->email . ' ha agregado '.$contador.' usuarios en el curso de id: ' . $id;

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
                
            }
            else {
                $myRequest->status ='Rechazado';
                $notificacion->titulo = "Tu baja del curso ".$myRequest->course->nombre. " ha sido rechazada";
            }
            
            $myRequest->save();
            $notificacion->save();

            $newLog = new Log;

            //debemos el LOG

            DB::commit();
            return \Redirect::route('solicitudes')->with('success', 'La acción se llevó a cabo con éxito'); //poner info del alumno
        } catch (\Exception $e) {
            //throw $th;
            dd($e);
            DB::rollBack();
            return \Redirect::route('solicitudes')->with('error', 'Hubo un problema, inténtalo de nuevo más tarde');
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
                $curso = Course::find($myRequest->course_id);
                $notificacion->titulo = "Tu solicitud de eliminación del curso ".$curso->nombre. " ha sido aprobada";//creamos notificación
                $curso->delete();
            }
            else {
                $myRequest->status ='Rechazado';
                $notificacion->titulo = "Tu solicitud de eliminación del curso ".$myRequest->course->nombre. " ha sido rechazada";
            }
            
            $myRequest->save();
            $notificacion->save();

            $newLog = new Log;

            //debemos el LOG

            
            DB::commit();
            return \Redirect::route('Solicitudes')->with('success', 'La acción se llevó a cabo con éxito');//poner info del curso
        } catch (\Exception $e) {
            //throw $th;
            dd($e);
            DB::rollBack();
            return \Redirect::back('Solicitudes')->with('error', 'Hubo un problema, inténtalo de nuevo más tarde');
        }
        
    }
}
