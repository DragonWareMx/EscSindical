<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Category;
use App\Models\Regime;
use App\Models\Unit;
use App\Models\Log;
use App\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

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
    public function create(Request $request)
    {
        return Inertia::render('Usuarios/Registrar', [
            'categories'=> fn () => Category::select('nombre')->get(),
            'regimes'=> fn () => Regime::select('nombre')->get(),
            'roles'=> fn () => Role::select('name')->get(),
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
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //---Validar el rol del usuario---
        \Gate::authorize('haveaccess', 'admin.perm');

        $validated = $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:51200',

            //---informacion personal---
            'nombre' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_paterno' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_materno' => ['nullable','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'fecha_de_nacimiento' => 'required|date|before:17 years ago',
            'sexo' => 'required|in:h,m,o',

            //---informacion institucional---
            
            //-de momento las matriculas son numeros solamente de tamaño maximo de 255-
            'matricula' => 'required|digits_between:0,255|numeric|unique:users,matricula',
            'regimen' => 'required|exists:regimes,nombre',
            'unidad' => 'required|exists:units,nombre',
            'categoria' => 'required|exists:categories,nombre',

            //direccion
            'estado' => ['required','max:50','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'ciudad' => ['required','max:60','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'colonia' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'calle' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'numero_exterior' => ['required','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'numero_interior' => ['nullable','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'codigo_postal' => ['required','max:9','regex:/^\d{5}$/i'],

            //---cuenta---
            'tarjeton_de_pago' => 'required|file|mimes:jpeg,png,jpg,pdf|max:51200',
            'email' => 'required|email:rfc|max:255|unique:users',
            //'contrasena' => 'required|min:8',
            'contrasena' => [
                'required',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->uncompromised(),
            ],
            'confirmar_contrasena' => 'required|min:8|same:contrasena',

            'rol' => 'required|exists:roles,name'
        ]);
        // El nuevo usuario es valido...

        //variables para comprobar la subida de archivos
        $foto = null;
        $tarjeton_pago = null;

        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            $regimen = Regime::where("nombre", $request->regimen)->get();

            if($regimen->isEmpty())
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            $unidad = Unit::where("nombre", $request->unidad)->get();

            if($unidad->isEmpty())
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            $categoria = Category::where("nombre", $request->categoria)->get();

            if($categoria->isEmpty())
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //verifica que la unidad y el regimen esten relacionados
            if($unidad[0]->regime->id != $regimen[0]->id)
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            $rol = Role::where("name", $request->rol)->get();

            if($rol->isEmpty())
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //SE CREA EL NUEVO USUARIO
            $newUser = new User;

            $foto = $request->file('foto')->store('public/fotos_perfil');
            $newUser->foto = $request->file('foto')->hashName();
            
            //---informacion personal---
            $newUser->nombre = $request->nombre;
            $newUser->apellido_p = $request->apellido_paterno;
            $newUser->apellido_m = $request->apellido_materno;
            $newUser->fecha_nac = $request->fecha_de_nacimiento;
            $newUser->sexo = $request->sexo;
            
            //---informacion institucional---
            $newUser->matricula = $request->matricula;
            $newUser->unit_id = $unidad[0]->id;
            $newUser->categorie_id = $categoria[0]->id;


            $tarjeton_pago = $request->file('tarjeton_de_pago')->store('public/tarjetones_pago');
            $newUser->tarjeton_pago = $request->file('tarjeton_de_pago')->hashName();
            
            //---direccion---
            $newUser->estado = $request->estado;
            $newUser->ciudad = $request->ciudad;
            $newUser->colonia = $request->colonia;
            $newUser->calle = $request->calle;
            $newUser->num_ext = $request->numero_exterior;
            $newUser->num_int = $request->numero_interior;
            $newUser->cp = $request->codigo_postal;
            
            //---cuenta---
            $newUser->email = $request->email;
            $newUser->password = \Hash::make($request->contrasena);

            
            //SE GUARDA EL NUEVO USUARIO
            $newUser->save();
            
            //se asigna el rol
            $newUser->roles()->sync([$rol[0]->id]);

            //SE CREA EL LOG
            $newLog = new Log;
            
            $newLog->categoria = 'create';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                users: {
                    nombre: ' . $request->nombre .
                    'apellido_p: ' . $request->apellido_paterno .
                    'apellido_m: ' . $request->apellido_materno .
                    'fecha_nac: ' . $request->fecha_de_nacimiento .
                    
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

            //$newLog->descripcion = 'El usuario '.Auth::user()->email.' ha registrado un nuevo usuario.';
                
            //SE GUARDA EL LOG
            $newLog->save();
            
            //SE HACE COMMIT
            DB::commit();
            
            if(!$newUser)
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //REDIRECCIONA A LA VISTA DE USUARIOS
            return \Redirect::route('usuarios')->with('success','El usuario ha sido registrado exitosamente!');
        } catch (\Exception $e) {
            DB::rollBack();

            //si hay foto se elimina del servidor
            if($foto)
            {
                \Storage::delete($foto);
            }
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
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
        return Inertia::render('Usuarios/Editar', [
            'user' => User::with(['categorie:id,nombre','unit:id,nombre,regime_id', 'unit.regime:id,nombre', 'activeCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'finishedCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'activeCourses.firstImage:imagen', 'finishedCourses.firstImage:imagen', 'activeCourses.teacher:nombre,foto,id', 'finishedCourses.teacher:nombre,foto,id','activeCourses.tags:nombre','finishedCourses.tags:nombre'])
                            ->findOrFail($id),
            'categories'=> fn () => Category::select('id','nombre')->get(),
            'regimes'=> fn () => Regime::select('id','nombre')->get(),
            'roles'=> fn () => Role::select('name')->get(),
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
            'foto' => 'nullable',

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
            'numero_exterior' => ['required','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'numero_interior' => ['nullable','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'codigo_postal' => ['required','max:9','regex:/^\d{5}$/i'],

            //---cuenta---
            //--FALTA TARJETON DE PAGO
            'tarjeton_de_pago' => 'nullable',

            'contrasena' => 'nullable|min:6',
            'confirmar_contrasena' => 'min:6|same:contrasena|required_with:contrasena'
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

        return \Redirect::route('usuarios')->with('success','¡Usuario editado de manera exitosa!');
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
            throw new \Exception;
            DB::commit();

            return redirect('usuarios');

        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::back()->with('message','no se pudo master :C');
        }
    }
}