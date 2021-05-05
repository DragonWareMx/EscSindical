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
        $usuario = User::where('id',Auth::id())->get();
        
        //return $usuario;

        return Inertia::render('Perfil/Perfil',['user'=>Auth::user()]);
        
    }
}
