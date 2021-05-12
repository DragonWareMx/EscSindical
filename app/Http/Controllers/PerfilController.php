<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;

class PerfilController extends Controller
{
    public function index()
    {
        $usuario = User::
                    // join('categories','categories.id','=','users.categorie_id')
                    with('categorie')
                    ->where('users.id',Auth::id())
                    ->first();
        //return $usuario;

        return Inertia::render('Perfil/Perfil',['user'=>$usuario]);
    }
}
