<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\Category;
use App\Models\Regime;
use App\Models\Unit;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\Registered;
use App\Permission\Models\Role;
use App\Models\Log;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

   
    

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    // Llamado de la vista
    public function showRegistrationForm(Request $request)
    {
        // $categorias = Category::distinct()->get();
        // $regimen = Regime::distinct()->get();
        // $unidades = Unit::distinct()->get();
        // return view('auth.register',['categorias' => $categorias, 'regimen' => $regimen, 'unidades' => $unidades ]);

        return Inertia::render('Usuarios/AuthRegister', [
            'categories'=> fn () => Category::select('nombre')->get(),
            'regimes'=> fn () => Regime::select('nombre')->get(),
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
     * Get a validator for an incoming registration request.
     *s
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
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
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(Request $request)
    { 
        // Guardar imagen de perfil
        // $fileNameWithTheExtension = request('foto_perfil')->getClientOriginalName();
        // $fileName = pathinfo($fileNameWithTheExtension, PATHINFO_FILENAME);
        // $extension = request('foto_perfil')->getClientOriginalExtension();
        // $newFileName = $fileName . '_' . time() . '.' . $extension;
        // $path = request('foto_perfil')->storeAs('/public/fotos_perfil/', $newFileName);

        // // Guardar tarjeton de pago
        // $fileNameWithTheExtension2 = request('tarjeton')->getClientOriginalName();
        // $fileName2 = pathinfo( $fileNameWithTheExtension2,PATHINFO_FILENAME);
        // $extension2 = request('tarjeton')->getClientOriginalExtension();
        // $newFileName2=$fileName2.'_'.time().'.'.$extension2;
        // $path2 = request('tarjeton')->storeAs('/public/tarjetones_pago/',$newFileName2);
        
        // $newUser = User::create([
        //     'nombre' => $data['nombre'],
        //     'foto' => $newFileName,
        //     'apellido_p' => $data['apellido_paterno'],
        //     'apellido_m' => $data['apellido_materno'],
        //     'sexo' => $data['sexo'],
        //     'fecha_nac' => $data['fecha_nacimiento'],
        //     'estado' => $data['estado'],
        //     'ciudad' => $data['ciudad'],
        //     'colonia' => $data['colonia'],
        //     'calle' => $data['calle'],
        //     'num_ext' => $data['numero'],
        //     'num_int' => $data['numero_interior'],
        //     'cp' => $data['codigo_postal'],
        //     'matricula' => $data['matricula'],
        //     'tarjeton_pago' => $newFileName2,
        //     'category_id' => $data['categoria'],
        //     'unit_id' => $data['unidad'],
        //     'email' => $data['email'],
        //     'password' => Hash::make($data['password']),

        // ]);
        // $newUser->roles()->sync(3);
        // return $newUser;

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

            $rol = Role::where("name", "Alumno")->get();

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
            $newLog->user_id = $newUser->id;
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

            $newLog->descripcion = 'Se ha registrado un nuevo usuario: '. $newUser->email;
                
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

            return $newUser;
            
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
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request)));

        if(get_class($user) == "App\Models\User"){
            $this->guard()->login($user);
            if ($response = $this->registered($request, $user)) {
                dd($response);
                return $response;
            }
    
            return $request->wantsJson()
                        ? new JsonResponse([], 201)
                        : redirect($this->redirectPath());
        }
        else{
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar registrar el usuario, inténtelo más tarde.');
        }

    }
}
