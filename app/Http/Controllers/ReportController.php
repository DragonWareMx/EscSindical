<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\Report;
use App\Models\Log;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index(){
        \Gate::authorize('haveaccess', 'admin.perm');

        $reportes=Report::with('reported:id,nombre,apellido_p,apellido_m,matricula','reporter:id,nombre,apellido_p,apellido_m,matricula')->orderBy('status', 'asc')->get();
        // dd($reportes);
        return Inertia::render('Reportes/Reportes', ['reportes' => $reportes]);
        
    }

    public function verReporte($id){
        \Gate::authorize('haveaccess', 'admin.perm');

        $reporte=Report::findOrFail($id);

        $reported=$reporte->reported;
        $reported=User::join('role_user', 'users.id', '=', 'role_user.user_id')->join('roles', 'role_user.role_id', '=', 'roles.id')->select('users.id', 'users.nombre', 'users.apellido_p', 'users.apellido_m', 'role_user.role_id', 'roles.name')->findOrFail($reported);
        
        $reporter=$reporte->reporter;
        $reporter=User::join('role_user', 'users.id', '=', 'role_user.user_id')->join('roles', 'role_user.role_id', '=', 'roles.id')->select('users.id', 'users.nombre', 'users.apellido_p', 'users.apellido_m', 'role_user.role_id', 'roles.name')->findOrFail($reporter);
        // dd($reported);
        return Inertia::render('Reportes/VerReporte', ['reporte' => $reporte, 'reported' => $reported, 'reporter' => $reporter]);
        
    }
}
