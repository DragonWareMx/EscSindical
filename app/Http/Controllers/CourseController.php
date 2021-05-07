<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Course;
use App\Models\Log;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Cursos/Cursos'); 
    }
    
    public function store(Request $request)
    {   
        $validated = $request->validate([
            'nombre' => 'required|unique:posts|max:255',
            'tags' => 'required',
            'dateIni' => 'required|unique:posts|max:255',
            'dateFin' => 'required',
            'link' => 'required',
            'vc' => 'required',
            'categorias' => 'required',
            'active' => 'required',
            'inscIni' => 'required',
            'inscFin' => 'required',
            'tipo' => 'required',
            'descripcion' => 'required',
            'imgs' => 'required',
        ]);
        
        
        $course = $request['descripcion'];
        return response()->json(["status" => 200, "request"=> $course]);
    }


}
