<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        //return response() -> json(['status' => 200, 'users' => $users]);
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newUser = User::create([
            'nombre' => $request->nombre,
            'apellido_p' => $request->apellido_p,
            'apellido_m' => $request->apellido_m,
            'email' => $request->email,
            'foto' => $request->foto,
            'fecha_nac' => $request->fecha_nac,
            'estado' => $request->estado,
            'ciudad' => $request->ciudad,
            'colonia' => $request->colonia,
            'calle' => $request->calle,
            'num_ext' => $request->num_ext,
            'num_int' => $request->num_int,
            'cp' => $request->cp,
            'tarjeton_pago' => $request->tarjeton_pago,
            'matricula' => $request->matricula,
            'categorie_id' => $request->categorie_id,
        ]);
        if($newUser){
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
    public function edit($id)
    {
        //
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
        $user = Post::find($id);
        $user->nombre = $request->nombre;
        $user->apellido_p = $request->apellido_p;
        $user->apellido_m = $request->apellido_m;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->foto = $request->foto;
        $user->fecha_nac = $request->fecha_nac;
        $user->estado = $request->estado;
        $user->ciudad = $request->ciudad;
        $user->colonia = $request->colonia;
        $user->calle = $request->calle;
        $user->num_ext = $request->num_ext;
        $user->num_int = $request->num_int;
        $user->cp = $request->cp;
        $user->tarjeton_pago = $request->tarjeton_pago;
        $user->matricula = $request->matricula;
        $user->categorie_id = $request->categorie_id;
        if($user -> save()){
            return response()->json(["status" => 200]);
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
        $user = Post::find($id);
        if($user -> delete()){
            return response()->json(["status" => 200]);
        }
    }
}
