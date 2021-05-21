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
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        return Inertia::render('Usuarios/Usuarios', [
            'users' => fn () => User::with('roles', 'category','unit')
                ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
                ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
                ->leftJoin('categories', 'categories.id', '=', 'users.category_id')
                ->leftJoin('units', 'units.id', '=', 'users.unit_id')
                ->when($request->filter == 'eliminado', function ($query) {
                    return $query->onlyTrashed();
                })
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
                            case 'unidad':
                                if ($search == "Sin unidad")
                                    return $query->whereNull('users.unit_id');
                                else
                                    return $query->where('units.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'nombre':
                                return $query->WhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
                                            );
                                break;
                            case 'categoria':
                                return $query->where('categories.nombre', 'LIKE', '%' . $search . '%');
                                break;
                            case 'eliminado':
                                return $query->WhereRaw(
                                                "concat(users.nombre, ' ', users.apellido_p, ' ', users.apellido_m) like '%" . $search . "%' "
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
                        );
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
                        case 'unidad':
                            if($request->order == 'asc')
                                return $query->orderBy('units.nombre', 'ASC');
                            else if($request->order == 'desc')
                                return $query->orderBy('units.nombre', 'DESC');
                            else
                                return $query;
                            break;
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
                ->select('users.id', 'matricula', 'users.nombre', 'apellido_p', 'apellido_m', 'category_id','users.unit_id','users.deleted_at')
                ->orderBy('users.created_at','desc')
                ->paginate(20)
                ->withQueryString(),
            'request' => $request
        ]);
    }

    public function ejemplo()
    {
        //$users = User::factory()->count(80)->create();
        return Inertia::render('Ejemplo');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

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
        //valida el rol del usuario
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
            'matricula' => 'required|digits_between:7,10|numeric|unique:users,matricula',
            'regimen' => 'required|exists:regimes,nombre',
            'unidad' => 'required|exists:units,nombre',
            'categoria' => 'required|exists:categories,nombre',

            //direccion
            'estado' => ['required','max:50','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'ciudad' => ['required','max:60','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'colonia' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'calle' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'numero_exterior' => ['required','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]*\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'numero_interior' => ['nullable','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]*\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'codigo_postal' => ['required','max:9','regex:/^\d{5}$/i'],

            //---cuenta---
            'tarjeton_de_pago' => 'required|file|mimes:jpeg,png,jpg,pdf|max:51200',
            'email' => 'required|email:rfc|max:255|unique:users',
            'contrasena' => [
                'required',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->uncompromised(),
            ],
            'confirmar_contrasena' => 'required|same:contrasena',
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

            //guarda la foto
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
            $newUser->category_id = $categoria[0]->id;

            //guarda el tarjeton de pago
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
                    nombre: ' . $request->nombre . ',\n
                    apellido_p: ' . $request->apellido_paterno . ',\n
                    apellido_m: ' . $request->apellido_materno . ',\n
                    fecha_nac: ' . $request->fecha_de_nacimiento . ',\n
                    sexo: '. $request->sexo. ',\n

                    matricula: ' . $request->matricula . ',\n
                    unit_id: '.$unidad[0]->id. ',\n
                    category_id: ' . $categoria[0]->id . ',\n

                    estado: ' . $request->estado . ',\n
                    ciudad: ' . $request->ciudad . ',\n
                    colonia: ' . $request->colonia . ',\n
                    calle: ' . $request->calle . ',\n
                    num_ext: ' . $request->numero_exterior . ',\n
                    num_int: ' . $request->numero_interior . ',\n
                    cp: ' . $request->codigo_postal . ',\n

                    email: ' . $request->email .
                '}
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha registrado un nuevo usuario: '. $newUser->email;
                
            //SE GUARDA EL LOG
            $newLog->save();
            
            
            if(!$newUser)
            {
                DB::rollBack();
                //si hay foto se elimina del servidor
                if($foto)
                {
                    \Storage::delete($foto);
                }
                //si hay tarjeton se elimina del servidor
                if($tarjeton_pago)
                {
                    \Storage::delete($tarjeton_pago);
                }
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }
            if(!$newLog)
            {
                DB::rollBack();
                //si hay foto se elimina del servidor
                if($foto)
                {
                    \Storage::delete($foto);
                }
                //si hay tarjeton se elimina del servidor
                if($tarjeton_pago)
                {
                    \Storage::delete($tarjeton_pago);
                }
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //SE HACE COMMIT
            DB::commit();
            
            //REDIRECCIONA A LA VISTA DE USUARIOS
            return \Redirect::route('usuarios')->with('success','El usuario ha sido registrado con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();

            //si hay foto se elimina del servidor
            if($foto)
            {
                \Storage::delete($foto);
            }
            //si hay tarjeton se elimina del servidor
            if($tarjeton_pago)
            {
                \Storage::delete($tarjeton_pago);
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
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        return Inertia::render('Usuarios/Editar', [
            'user' => User::withTrashed()->with(['category:id,nombre','unit:id,nombre,regime_id', 'unit.regime:id,nombre', 'activeCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'finishedCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'activeCourses.images:course_id,imagen', 'finishedCourses.images:course_id,imagen', 'activeCourses.teacher:nombre,apellido_p,apellido_m,foto,id', 'finishedCourses.teacher:nombre,foto,id','activeCourses.tags:nombre','finishedCourses.tags:nombre', 'roles:name'])
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
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        $validated = $request->validate([
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:51200',

            //---informacion personal---
            'nombre' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_paterno' => ['required','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'apellido_materno' => ['nullable','max:255','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'fecha_de_nacimiento' => 'required|date|before:17 years ago',
            'sexo' => 'required|in:h,m,o',

            //---informacion institucional---
            
            //-de momento las matriculas son numeros solamente de tamaño maximo de 255-
            'matricula' => 'required|digits_between:7,10|numeric|unique:users,matricula,'.$id,
            'regimen' => 'required|exists:regimes,nombre',
            'unidad' => 'required|exists:units,nombre',
            'categoria' => 'required|exists:categories,nombre',

            //direccion
            'estado' => ['required','max:50','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'ciudad' => ['required','max:60','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'colonia' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'calle' => ['required','max:100','regex:/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)*$/i'],
            'numero_exterior' => ['required','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]*\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'numero_interior' => ['nullable','max:10','regex:/^(((#|[nN][oO]|[a-zA-Z1-9À-ÖØ-öø-ÿ]*\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/i'],
            'codigo_postal' => ['required','max:9','regex:/^\d{5}$/i'],

            //---cuenta---
            'cambiar_tarjeton' => 'required|boolean',
            'tarjeton_de_pago' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:51200',
            'email' => 'required|email:rfc|max:255|unique:users,email,'.$id,

            'cambiar_contrasena' => 'required|boolean',
            'contrasena' => [
                'nullable',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->uncompromised(),
            ],
            'confirmar_contrasena' => 'required_with:contrasena|same:contrasena',
            'rol' => 'required|exists:roles,name'
        ]);
        // El usuario es valido...

        //si hay cambio de contraseña valida que no sea nula
        if($request->cambiar_contrasena){
            if(is_null($request->contrasena)){
                DB::rollBack();
                return \Redirect::back()->with('error','La nueva contraseña no ha sido introducida.');
            }
        }

        //si hay cambio de contraseña valida que no sea nula
        if($request->cambiar_tarjeton){
            if(is_null($request->file('tarjeton_de_pago'))){
                DB::rollBack();
                return \Redirect::back()->with('error','No se ha enviado ningún archivo de tarjetón de pago.');
            }
        }

        //variables para comprobar la subida de archivos
        $foto = null;
        $tarjeton_pago = null;

        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            //se busca el regimen en la bd
            $regimen = Regime::where("nombre", $request->regimen)->get();

            if($regimen->isEmpty())
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //se busca la unidad en la bd
            $unidad = Unit::where("nombre", $request->unidad)->get();

            if($unidad->isEmpty())
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //se busca ña categoria en la bd
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

            //se busca el rol en la bd
            $rol = Role::where("name", $request->rol)->get();

            if($rol->isEmpty())
            {
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //SE CREA EL NUEVO USUARIO
            $user = User::find($id);

            //guarda la foto
            if(!is_null($request->file('foto'))){
                if($user->foto){
                    \Storage::delete('public/fotos_perfil'.$user->foto);
                }
                $foto = $request->file('foto')->store('public/fotos_perfil');
                $user->foto = $request->file('foto')->hashName();
            }
            
            //---informacion personal---
            $user->nombre = $request->nombre;
            $user->apellido_p = $request->apellido_paterno;
            $user->apellido_m = $request->apellido_materno;
            $user->fecha_nac = $request->fecha_de_nacimiento;
            $user->sexo = $request->sexo;
            
            //---informacion institucional---
            $user->matricula = $request->matricula;
            $user->unit_id = $unidad[0]->id;
            $user->category_id = $categoria[0]->id;

            //guarda el tarjeton de pago
            if(!is_null($request->file('tarjeton_de_pago'))){
                if($user->tarjeton_pago){
                    \Storage::delete('public/tarjetones_pago/'.$user->tarjeton_pago);
                }
                $tarjeton_pago = $request->file('tarjeton_de_pago')->store('public/tarjetones_pago');
                $user->tarjeton_pago = $request->file('tarjeton_de_pago')->hashName();
            }
            
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

            if($request->cambiar_contrasena){
                $user->password = \Hash::make($request->contrasena);
            }

            //SE GUARDA EL NUEVO USUARIO
            $user->save();
            
            //se asigna el rol
            $user->roles()->sync([$rol[0]->id]);

            //SE CREA EL LOG
            $newLog = new Log;
            
            $newLog->categoria = 'update';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                users: {
                    nombre: ' . $request->nombre . ',\n
                    apellido_p: ' . $request->apellido_paterno . ',\n
                    apellido_m: ' . $request->apellido_materno . ',\n
                    fecha_nac: ' . $request->fecha_de_nacimiento . ',\n
                    sexo: '. $request->sexo. ',\n

                    matricula: ' . $request->matricula . ',\n
                    unit_id: '.$unidad[0]->id. ',\n
                    category_id: ' . $categoria[0]->id . ',\n

                    estado: ' . $request->estado . ',\n
                    ciudad: ' . $request->ciudad . ',\n
                    colonia: ' . $request->colonia . ',\n
                    calle: ' . $request->calle . ',\n
                    num_ext: ' . $request->numero_exterior . ',\n
                    num_int: ' . $request->numero_interior . ',\n
                    cp: ' . $request->codigo_postal . ',\n

                    email: ' . $request->email .
                '}
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha registrado un nuevo usuario: '. $user->email;
                
            //SE GUARDA EL LOG
            $newLog->save();
            
            
            if(!$user)
            {
                DB::rollBack();
                //si hay foto se elimina del servidor
                if($foto)
                {
                    \Storage::delete($foto);
                }
                //si hay tarjeton se elimina del servidor
                if($tarjeton_pago)
                {
                    \Storage::delete($tarjeton_pago);
                }
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }
            if(!$newLog)
            {
                DB::rollBack();
                //si hay foto se elimina del servidor
                if($foto)
                {
                    \Storage::delete($foto);
                }
                //si hay tarjeton se elimina del servidor
                if($tarjeton_pago)
                {
                    \Storage::delete($tarjeton_pago);
                }
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
            }

            //SE HACE COMMIT
            DB::commit();
            
            //REDIRECCIONA A LA VISTA DE USUARIOS
            return \Redirect::back()->with('success','El usuario ha sido editado con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();

            //si hay foto se elimina del servidor
            if($foto)
            {
                \Storage::delete($foto);
            }
            //si hay tarjeton se elimina del servidor
            if($tarjeton_pago)
            {
                \Storage::delete($tarjeton_pago);
            }
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        DB::beginTransaction();
        try{
            $user = User::find($id);

            if(!$user){
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar eliminar el usuario, inténtelo más tarde.');
            }

            if($user->id == Auth::id()){
                DB::rollBack();
                return \Redirect::back()->with('message','¡No puedes eliminar tu propio usuario!');
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

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha eliminado al usuario: '. $user->email;

            $newLog->save();

            DB::commit();
            return \Redirect::route('usuarios')->with('success','¡Usuario eliminado con éxito!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar eliminar el usuario, inténtelo más tarde.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        //valida el rol del usuario
        \Gate::authorize('haveaccess', 'admin.perm');

        DB::beginTransaction();
        try{
            $user = User::withTrashed()->find($id);

            if(!$user){
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar eliminar el usuario, inténtelo más tarde.');
            }

            if($user->id == Auth::id()){
                DB::rollBack();
                return \Redirect::back()->with('message','¡No puedes eliminar tu propio usuario!');
            }

            $user->restore();

            //SE CREA EL LOG
            $newLog = new Log;

            $newLog->categoria = 'restore';
            $newLog->user_id = Auth::id();
            $newLog->accion =
            '{
                users: {
                    id: ' . $id .
                '}
            }';

            $newLog->descripcion = 'El usuario '.Auth::user()->email.' ha restaurado al usuario: '. $user->email;

            $newLog->save();

            DB::commit();
            return \Redirect::back()->with('success','¡Usuario restaurado con éxito!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el usuario, inténtelo más tarde.');
        }
    }
}