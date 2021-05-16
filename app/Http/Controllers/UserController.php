<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Category;
use App\Models\Regime;
use App\Models\Unit;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
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
        return Inertia::render('Usuarios/Usuarios', [
            'users' => fn () => User::with('roles', 'categorie')
                ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
                ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
                ->leftJoin('categories', 'categories.id', '=', 'users.categorie_id')
                ->when($request->user_search, function ($query, $search) use ($request) {
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
                            case 'nombre':
                                return $query->where('users.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'categoria':
                                return $query->where('categories.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'eliminado':
                                return $query->onlyTrashed()->where('users.matricula', 'LIKE', '%' . $search . '%');
                                break;

                            default:
                                return $query->where('users.nombre', 'LIKE', '%' . $search . '%');
                                break;
                        }
                    } else
                        return $query->where('users.nombre', 'LIKE', '%' . $search . '%');
                })
                ->when($request->sort, function ($query, $sort) use ($request) {
                    switch ($sort) {
                        case 'matricula':
                            if ($request->order == 'asc')
                                return $query->orderBy('matricula', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('matricula', 'DESC');
                            else
                                return $query;
                            break;
                        case 'rol':
                            if ($request->order == 'asc')
                                return $query->orderBy('roles.name', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('roles.name', 'DESC');
                            else
                                return $query;
                            break;
                        case 'nombre':
                            if ($request->order == 'asc')
                                return $query->orderBy('nombre', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('nombre', 'DESC');
                            else
                                return $query;
                            break;
                            // case 'unidad':
                            //     if($request->order == 'asc')
                            //         return $query->orderBy('matricula', 'ASC');
                            //     else if($request->order == 'desc')
                            //         return $query->orderBy('matricula', 'DESC');
                            //     else
                            //         return $query;
                            //     break;
                        case 'categoria':
                            if ($request->order == 'asc')
                                return $query->orderBy('categories.nombre', 'ASC');
                            else if ($request->order == 'desc')
                                return $query->orderBy('categories.nombre', 'DESC');
                            else
                                return $query;
                            break;
                        default:
                            # code...
                            break;
                    }
                })
                ->select('users.id', 'matricula', 'users.nombre', 'apellido_p', 'apellido_m', 'categorie_id')
                ->paginate(20)
                ->withQueryString(),
            'user' => Inertia::lazy(
                fn () => User::with(['categorie:id,nombre','unit:id,nombre,regime_id', 'unit.regime:id,nombre', 'activeCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'finishedCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'activeCourses.firstImage:imagen', 'finishedCourses.firstImage:imagen', 'activeCourses.teacher:nombre,foto,id', 'finishedCourses.teacher:nombre,foto,id','activeCourses.tags:nombre','finishedCourses.tags:nombre'])
                    ->when($request->user, function ($query, $user) {
                        $query->find($user);
                    })
                    ->first()
            ),
            'request' => $request,
            'categories'=> Inertia::lazy(
                fn () => Category::select('id','nombre')->get(),
            ),
            'regimes'=> Inertia::lazy(
                fn () => Regime::select('id','nombre')->get(),
            ),
            'units'=> Inertia::lazy(
                fn () => Unit::select('units.id','units.nombre')
                            ->leftJoin('regimes', 'regimes.id', '=', 'units.regime_id')
                            ->when($request->regime, function ($query, $regime) {
                                $query->where('regimes.nombre',$regime);
                            })
                            ->get(),
            )
        ]);
    }

    public function ejemplo()
    {
        $users = User::factory()->count(80)->create();
        return Inertia::render('Ejemplo');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //---Validar el rol del usuario---

        $validated = $request->validate([
            //---falta el de la foto
            'foto' => 'required',

            //---informacion personal---
            'nombre' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_paterno' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_materno' => ['nullable','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'fecha_de_nacimiento' => 'required|date|before:17 years ago',
            'sexo' => 'required|in:h,m,o',

            //---informacion institucional---
            
            //-de momento las matriculas son numeros solamente de tamaño maximo de 255-
            'matricula' => 'required|digits_between:0,255|numeric|unique:users,matricula,'.$id,
            'regimen' => 'required|exists:regimes,nombre',
            'unidad' => 'required|exists:units,nombre',
            'categoria' => 'required|exists:categories,nombre',

            //direccion
            'estado' => ['required','max:50','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'ciudad' => ['required','max:60','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'colonia' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'calle' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'numero_exterior' => ['required','max:10','regex:/^(((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'numero_interior' => ['nullable','max:10','regex:/^(((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'codigo_postal' => ['required','max:9','regex:/^\d{5}$/i'],

            //---cuenta---
            //--FALTA TARJETON DE PAGO
            'tarjeton_de_pago' => 'nullable',
            'email' => 'required|email:rfc|max:255',
        ]);
        // El nuevo usuario es valido...

        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            //---verificar que el regimen y la unidad esten relacionados---

            //SE CREA EL NUEVO USUARIO
            $newUser = new User;

            //---informacion personal---
            $newUser->foto = $request->foto;
            $newUser->nombre = $request->nombre;
            $newUser->apellido_p = $request->apellido_p;
            $newUser->apellido_m = $request->apellido_m;
            $newUser->fecha_nac = $request->fecha_nac;

            //---informacion institucional---
            $newUser->matricula = $request->matricula;
            //regimen...
            //unidad...
            $newUser->categorie_id = $request->categorie_id;
            $newUser->tarjeton_pago = $request->tarjeton_pago;

            //---direccion---
            $newUser->estado = $request->estado;
            $newUser->ciudad = $request->ciudad;
            $newUser->colonia = $request->colonia;
            $newUser->calle = $request->calle;
            $newUser->num_ext = $request->num_ext;
            $newUser->num_int = $request->num_int;
            $newUser->cp = $request->cp;

            //---cuenta---
            $newUser->email = $request->email;

            //SE GUARDA EL NUEVO USUARIO
            $newUser->save();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'create';
            $newLog->user_id = Auth::id();
            $newLog->accion =
                '{
            users: {
                nombre: ' . $request->nombre .
                'apellido_p: ' . $request->apellido_p .
                'apellido_m: ' . $request->apellido_m .
                'fecha_nac: ' . $request->fecha_nac .

                'matricula: ' . $request->matricula .
                '//regimen...
                //unidad...
                categorie_id: ' . $request->categorie_id .
                'tarjeton_pago: ' . $request->tarjeton_pago .

                'estado: ' . $request->estado .
                'ciudad: ' . $request->ciudad .
                'colonia: ' . $request->colonia .
                'calle: ' . $request->calle .
                'num_ext: ' . $request->num_ext .
                'num_int: ' . $request->num_int .
                'cp: ' . $request->cp .

                'email: ' . $request->email .
                '}
        }';

            //SE GUARDA EL LOG

            //SE HACE COMMIT
            DB::commit();

            //REDIRECCIONA A LA VISTA DE USUARIOS
            return Redirect::route('usuarios');
        } catch (\Exception $e) {
            DB::rollBack();
        }

        if ($newUser) {
            return response()->json(["status" => 200]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return response()->json(['status' => 200, 'user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        //
        return Inertia::render('Usuarios/Editar', [
            'user' => User::with(['categorie:id,nombre','unit:id,nombre,regime_id', 'unit.regime:id,nombre', 'activeCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'finishedCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'activeCourses.firstImage:imagen', 'finishedCourses.firstImage:imagen', 'activeCourses.teacher:nombre,foto,id', 'finishedCourses.teacher:nombre,foto,id','activeCourses.tags:nombre','finishedCourses.tags:nombre'])
                            ->findOrFail($id),
            'categories'=> fn () => Category::select('id','nombre')->get(),
            'regimes'=> fn () => Regime::select('id','nombre')->get(),
            'units'=>  Inertia::lazy(
                fn () => Unit::select('units.id','units.nombre')
                            ->leftJoin('regimes', 'regimes.id', '=', 'units.regime_id')
                            ->when($request->regime, function ($query, $regime) {
                                $query->where('regimes.nombre',$regime);
                            })
                            ->get()
            )
        ]);
        
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
        $validated = $request->validate([
            //---falta el de la foto
            'foto' => 'required',

            //---informacion personal---
            'nombre' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_paterno' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_materno' => ['nullable','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'fecha_de_nacimiento' => 'required|date|before:17 years ago',
            'sexo' => 'required|in:h,m,o',

            //---informacion institucional---
            
            //-de momento las matriculas son numeros solamente de tamaño maximo de 255-
            'matricula' => 'required|digits_between:0,255|numeric|unique:users,matricula,'.$id,
            'regimen' => 'required|exists:regimes,nombre',
            'unidad' => 'required|exists:units,nombre',
            'categoria' => 'required|exists:categories,nombre',

            //direccion
            'estado' => ['required','max:50','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'ciudad' => ['required','max:60','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'colonia' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'calle' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'numero_exterior' => ['required','max:10','regex:/^(((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'numero_interior' => ['nullable','max:10','regex:/^(((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'codigo_postal' => ['required','max:9','regex:/^\d{5}$/i'],

            //---cuenta---
            //--FALTA TARJETON DE PAGO
            'tarjeton_de_pago' => 'nullable',
        ]);

        $user = User::find($id);
        //---informacion personal---
        $user->foto = $request->foto;
        $user->nombre = $request->nombre;
        $user->apellido_p = $request->apellido_paterno;
        $user->apellido_m = $request->apellido_materno;
        $user->fecha_nac = $request->fecha_de_nacimiento;

        //---informacion institucional---
        $user->matricula = $request->matricula;
        //regimen...
        //unidad...
        //categoria
        $user->tarjeton_pago = $request->tarjeton_de_pago;

        //---direccion---
        $user->estado = $request->estado;
        $user->ciudad = $request->ciudad;
        $user->colonia = $request->colonia;
        $user->calle = $request->calle;
        $user->num_ext = $request->numero_exterior;
        $user->num_int = $request->numero_interior;
        $user->cp = $request->codigo_postal;

        //---cuenta---
        $user->email = $request->email;

        //SE GUARDA EL NUEVO USUARIO
        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            $user = User::find($id);
            if(!$user || $user->id == Auth::id()){
                DB::rollBack();
                return;
            }
            $user->delete();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'delete';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                users: {
                    id: ' . $id .
                '}
            }';
            $newLog->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}