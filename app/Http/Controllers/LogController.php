<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Log;

class LogController extends Controller
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
    public function index(Request $request)
    {
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        return Inertia::render('Log/Log', [
            'logs' => fn () => Log::with('user:id,nombre,apellido_p,apellido_m')
                ->leftJoin('users', 'logs.user_id', '=', 'users.id')
                // ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
                // ->leftJoin('categories', 'categories.id', '=', 'users.category_id')
                // ->leftJoin('units', 'units.id', '=', 'users.unit_id')
                // ->when($request->filter == 'eliminado', function ($query) {
                //     return $query->onlyTrashed();
                // })
                ->when($request->log_search, function ($query, $search) use ($request) {
                    if ($request->filter) {
                        switch ($request->filter) {
                            case 'matricula':
                                return $query->where('users.matricula', 'LIKE', '%' . $search . '%');
                                break;
                            case 'rol':
                                if ($search == "Sin Rol")
                                    return $query->whereNull('role_user.role_id');
                                else
                                    return $query->where('roles.name', 'LIKE', '%' . $search . '%');
                                break;
                            case 'unidad':
                                if ($search == "Sin unidad")
                                    return $query->whereNull('users.unit_id');
                                else
                                    return $query->where('units.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'nombre':
                                return $query->WhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                            )->orWhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                            );
                                break;
                            case 'categoria':
                                return $query->where('categories.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'eliminado':
                                return $query->WhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                            )->orWhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p) like '%" . $search . "%' "
                                            )
                                            ->onlyTrashed();
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
                        case 'id':
                            if ($request->order == 'asc')
                                return $query->orderBy('logs.id', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('logs.id', 'DESC');
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
                        case 'descripcion':
                            if ($request->order == 'asc')
                                return $query->orderBy('descripcion', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('descripcion', 'DESC');
                            else
                                return $query;
                            break;
                        case 'categoria':
                            if($request->order == 'asc')
                                return $query->orderBy('logs.categoria', 'ASC');
                            else if($request->order == 'desc')
                                return $query->orderBy('logs.categoria', 'DESC');
                            else
                                return $query;
                            break;
                        case 'fecha':
                            if ($request->order == 'asc')
                                return $query->orderBy('logs.created_at', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('logs.created_at', 'DESC');
                            else
                                return $query;
                            break;
                        default:
                            # code...
                            break;
                    }
                })
                ->select('logs.id', 'logs.descripcion','logs.categoria','logs.created_at','logs.user_id')
                ->orderBy('logs.created_at','desc')
                ->paginate(20)
                ->withQueryString(),
            'request' => $request
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $user = User::find($id);
        // return response()->json(['status' => 200, 'user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        
    }
}
