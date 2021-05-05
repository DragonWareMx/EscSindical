<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        return Inertia::render('Usuarios/Usuarios', ['users' => fn () => User::get()]);
    }

    public function ejemplo()
    {
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
        $validated = $request->validate([
            'nombre' => 'required|unique:posts|max:255',
            'apellido_p' => 'required',
            'apellido_m' => 'required|unique:posts|max:255',
            'email' => 'required',
            'foto' => 'required',
            'fecha_nac' => 'required',
            'estado' => 'required',
            'ciudad' => 'required',
            'colonia' => 'required',
            'calle' => 'required',
            'num_ext' => 'required',
            'num_int' => 'required',
            'cp' => 'required',
            'tarjeton_pago' => 'required',
            'matricula' => 'required',
            'categorie_id' => 'required',
        ]);
        // El usuario es valido...

        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try{
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
                nombre: '.$request->nombre.
                'apellido_p: '.$request->apellido_p.
                'apellido_m: '.$request->apellido_m.
                'fecha_nac: '.$request->fecha_nac.

                'matricula: '.$request->matricula.
                '//regimen...
                //unidad...
                categorie_id: '.$request->categorie_id.
                'tarjeton_pago: '.$request->tarjeton_pago.

                'estado: '.$request->estado.
                'ciudad: '.$request->ciudad.
                'colonia: '.$request->colonia.
                'calle: '.$request->calle.
                'num_ext: '.$request->num_ext.
                'num_int: '.$request->num_int.
                'cp: '.$request->cp.

                'email: '.$request->email.
            '}
        }';

        //SE GUARDA EL LOG
        
        DB::commit();
    }
    catch(\Exception $e){
        DB::rollBack();
    }

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
