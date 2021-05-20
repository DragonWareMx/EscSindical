<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\Category;
use App\Models\Regime;
use App\Permission\Models\Role;
use App\Models\Unit;

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

    public function edit($id, Request $request)
    {
        //valida el rol del usuario
        //\Gate::authorize('haveaccess', 'admin.perm');

        return Inertia::render('Perfil/Configuracion', [
            'user' => User::withTrashed()->with(['categorie:id,nombre','unit:id,nombre,regime_id', 'unit.regime:id,nombre', 'activeCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'finishedCourses:id,fecha_final,fecha_inicio,nombre,teacher_id', 'activeCourses.images:course_id,imagen', 'finishedCourses.images:course_id,imagen', 'activeCourses.teacher:nombre,foto,id', 'finishedCourses.teacher:nombre,foto,id','activeCourses.tags:nombre','finishedCourses.tags:nombre', 'roles:name'])
                            ->findOrFail($id),
            'categories'=> fn () => Category::select('id','nombre')->get(),
            'regimes'=> fn () => Regime::select('id','nombre')->get(),
            'roles'=> fn () => Role::select('name')->get(),
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

}
