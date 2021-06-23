<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Course;
use App\Models\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;

class RequestController extends Controller
{

    public function index(){
        $user = User::find(Auth::id());

        if ($user->roles[0]->name == 'Administrador'){
            // $reportes=Report::orderBy('status', 'asc')->get();
            // dd($reportes);
            return Inertia::render('Solicitudes/Solicitudes');
        }
        else{
            return abort(403);
        }
    }

    public function verSolicitud($id){
        $user = User::find(Auth::id());

        if ($user->roles[0]->name == 'Administrador'){
            return Inertia::render('Solicitudes/VerSolicitud');
        }
        else{
            return abort(403);
        }
        
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
}
