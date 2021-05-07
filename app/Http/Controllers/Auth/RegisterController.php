<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\Category;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


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
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

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
    public function showRegistrationForm()
    {
        $categorias = Category::distinct()->get();
        // dd($categorias);
        return view('auth.register',['categorias' => $categorias ]);
    }

    /**
     * Get a validator for an incoming registration request.
     *s
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        // dd($data);
        return Validator::make($data, [
            'nombre' => ['required', 'string', 'max:255'],
            'apellido_paterno' => ['required', 'string', 'max:255'],
            'apellido_materno' => ['string', 'max:255'],
            'foto_perfil' => ['image','mimes:jpg,png,gif,jpeg','max:10000','required'],
            'sexo' => ['required', 'string'],
            'fecha_nacimiento' => ['required', 'date'],
            'tarjeton' => ['file','mimes:pdf','required','max:10000'],
            'estado' => ['required', 'string', 'max:255'],
            'ciudad' => ['required', 'string', 'max:255'],
            'colonia' => ['required', 'string', 'max:255'],
            'calle' => ['required', 'string', 'max:255'],
            'numero' => ['required', 'string', 'max:255'],
            'numero_interior' => ['required', 'string', 'max:255'],
            'codigo_postal' => ['required', 'integer', 'min:1'],
            'matricula' => ['required', 'string', 'max:255'],
            'categoria' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    { 
            // Falta guardar regimen y unidad

            // Guardar imagen de perfil
            $fileNameWithTheExtension = request('foto_perfil')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithTheExtension, PATHINFO_FILENAME);
            $extension = request('foto_perfil')->getClientOriginalExtension();
            $newFileName = $fileName . '_' . time() . '.' . $extension;
            $path = request('foto_perfil')->storeAs('/public/fotos_perfil/', $newFileName);

            // Guardar tarjeton de pago
            $fileNameWithTheExtension2 = request('tarjeton')->getClientOriginalName();
            $fileName2 = pathinfo( $fileNameWithTheExtension2,PATHINFO_FILENAME);
            $extension2 = request('tarjeton')->getClientOriginalExtension();
            $newFileName2=$fileName2.'_'.time().'.'.$extension2;
            $path2 = request('tarjeton')->storeAs('/public/tarjetones_pago/',$newFileName2);

            // Obtener id de la categoria
            // obtener categorias
            $categorias = Category::get();
            $idct;
            foreach ($categorias as $ct){
                if($ct["nombre"]==$data['categoria'])
                    $idct=$ct["id"];
            }
        
        return User::create([
            'nombre' => $data['nombre'],
            'foto' => $newFileName,
            'apellido_p' => $data['apellido_paterno'],
            'apellido_m' => $data['apellido_materno'],
            'sexo' => $data['sexo'],
            'fecha_nac' => $data['fecha_nacimiento'],
            'estado' => $data['estado'],
            'ciudad' => $data['ciudad'],
            'colonia' => $data['colonia'],
            'calle' => $data['calle'],
            'num_ext' => $data['numero'],
            'num_int' => $data['numero_interior'],
            'cp' => $data['codigo_postal'],
            'matricula' => $data['matricula'],
            'tarjeton_pago' => $newFileName2,
            'categorie_id' => $idct,
            'email' => $data['email'],
            'password' => Hash::make($data['password']),

        ]);
        // $newUser->roles()->sync(3);
        
    }
}
