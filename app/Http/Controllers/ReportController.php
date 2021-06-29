<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\Report;
use App\Models\Log;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request){
        // Valida el permiso
        \Gate::authorize('haveaccess', 'admin.perm');

        return Inertia::render('Reportes/Reportes', [
            // 'reportes' => fn () => Report::with('reported:id,nombre,apellido_p,apellido_m,matricula','reporter:id,nombre,apellido_p,apellido_m,matricula')
            'reportes' => fn () => Report::join('users', 'reports.reported', '=', 'users.id')->select(DB::raw("concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) as nombre"), 'users.matricula', 'reports.id', 'reports.status', 'reports.comentario', 'reports.created_at')
            ->when($request->sort, function ($query, $sort) use ($request) {
                switch ($sort) {
                    case 'matricula':
                        if ($request->order == 'asc')
                            return $query->orderBy('id', 'ASC');
                        else if ($request->order == 'desc')
                            return $query->orderBy('id', 'DESC');
                        else
                            return $query;
                        break;
                    case 'usuario':
                        if ($request->order == 'asc')
                            return $query->orderBy('reported', 'ASC');
                        else if ($request->order == 'desc')
                            return $query->orderBy('reported', 'DESC');
                        else
                            return $query;
                        break;
                    case 'motivo':
                        if ($request->order == 'asc')
                            return $query->orderBy('comentario', 'ASC');
                        else if ($request->order == 'desc')
                            return $query->orderBy('comentario', 'DESC');
                        else
                            return $query;
                        break;
                    case 'estatus':
                        if($request->order == 'asc')
                            return $query->orderBy('status', 'ASC');
                        else if($request->order == 'desc')
                            return $query->orderBy('status', 'DESC');
                        else
                            return $query;
                        break;
                    default:
                        # code...
                        break;
                }
            })
            ->when($request->reporte_search, function ($query, $search) use ($request) {
                if ($request->filter) {
                    switch ($request->filter) {
                        case 'matricula':
                            return $query->where('matricula', 'LIKE', '%' . $search . '%');
                            break;
                        case 'usuario':
                                return $query->WhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                )->orWhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                );
                            break;
                        case 'comentario':
                                return $query->where('reports.comentario', 'LIKE', '%' . $search . '%');
                            break;
                        default:
                                return $query->WhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                )->orWhereRaw(
                                    "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                );
                            break;
                    }
                } else
                    // Si no tiene ningun filtro solo se busca por el nombre
                    return $query->WhereRaw(
                        "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                    )->orWhereRaw(
                        "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                    );
            })
            
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString(),
            'request' => $request
        ]);


        // return Inertia::render('Reportes/Reportes', ['reportes' => $reportes]);
        
    }

    public function verReporte($id){
        // Valida el permiso
        \Gate::authorize('haveaccess', 'admin.perm');

        $reporte=Report::findOrFail($id);

        $reported=$reporte->reported;
        $reported=User::join('role_user', 'users.id', '=', 'role_user.user_id')->join('roles', 'role_user.role_id', '=', 'roles.id')->select('users.id', 'users.nombre', 'users.apellido_p', 'users.apellido_m', 'role_user.role_id', 'roles.name')->findOrFail($reported);
        
        $reporter=$reporte->reporter;
        $reporter=User::join('role_user', 'users.id', '=', 'role_user.user_id')->join('roles', 'role_user.role_id', '=', 'roles.id')->select('users.id', 'users.nombre', 'users.apellido_p', 'users.apellido_m', 'role_user.role_id', 'roles.name')->findOrFail($reporter);

        return Inertia::render('Reportes/VerReporte', ['reporte' => $reporte, 'reported' => $reported, 'reporter' => $reporter]);
        
    }

    public function marcarReporte($id){
        \Gate::authorize('haveaccess', 'admin.perm');

        $reporte=Report::findOrFail($id);
        
        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            // revisar que el estatus sea cero
            if($reporte->status == 0){
                $reporte->status = 1;
                $reporte->save();

                //SE CREA EL LOG
                $newLog = new Log;
                $newLog->categoria = 'update';
                $newLog->user_id = Auth::id();
                $newLog->accion =
                '{
                    reports: {
                        id: ' . $reporte->id . ',\n
                        reported: ' . $reporte->reported . ',\n
                        reporter: ' . $reporte->reporter . ',\n
                        comentario: ' . $reporte->comentario . ',\n
                        fecha: '. $reporte->created_at. ',\n
                        status: '. $reporte->status. ',\n
                    }
                }';
                $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha actualizado el reporte con id '.$reporte->id.' como leído';
                
                //SE GUARDA EL LOG
                $newLog->save();

                //SE HACE COMMIT
                DB::commit();
                
                //REDIRECCIONA A LA VISTA DE REPORTE
                return \Redirect::back()->with('success','Reporte actualizado con éxito!');
            }
            else{
                DB::rollBack();            
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar actualizar el reporte, inténtelo más tarde.');
            }
        } catch (\Exception $e) {
            DB::rollBack();            
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar actualizar el reporte, inténtelo más tarde.');
        }
    }
}
