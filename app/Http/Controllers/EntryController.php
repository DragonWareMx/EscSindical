<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class EntryController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        Gate::authorize('haveaccess', 'ponente.perm');
        $cursos = Course::with('modules')->where('teacher_id', Auth::user()->id)->get();
        return Inertia::render('Entradas/Crear', ['cursos' => fn () => $cursos]);
    }
}