<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PerfilController extends Controller
{
    public function index()
    {
        //$users = User::all();

        return Inertia::render('Perfil/Perfil');
    }
}
