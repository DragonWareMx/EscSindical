<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
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

    /**
     * Get a validator for an incoming registration request.
     *
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
            'foto_perfil' => ['required', 'string'],
            'sexo' => ['required', 'string'],
            'fecha_nacimiento' => ['required', 'date'],
            'tarjeton' => ['required', 'string'],
            'estado' => ['required', 'string', 'max:255'],
            'ciudad' => ['required', 'string', 'max:255'],
            'colonia' => ['required', 'string', 'max:255'],
            'calle' => ['required', 'string', 'max:255'],
            'numero' => ['required', 'string', 'max:255'],
            'numero_interior' => ['required', 'string', 'max:255'],
            'codigo_postal' => ['required', 'integer', 'min:1'],
            'matricula' => ['required', 'string', 'max:255'],
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
            //  regimen unidad categoria 
            $fileNameWithTheExtension = request('foto_perfil')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithTheExtension, PATHINFO_FILENAME);
            $extension = request('foto_perfil')->getClientOriginalExtension();
            $newFileName = $fileName . '_' . time() . '.' . $extension;
            $path = request('foto_perfil')->storeAs('/public/fotos_perfil/', $newFileName);

        return User::create([
            'nombre' => $data['nombre'],
            'foto' => $data['foto_perfil'],
            // 'foto' => $newFileName,
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
            'tarjeton_pago' => $data['tarjeton'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
