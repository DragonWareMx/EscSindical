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
        $user = User::find(Auth::id());

        if ($user->roles[0]->name == 'Administrador'){
            $reportes=Report::orderBy('status', 'asc')->get();
            // dd($reportes);
            return Inertia::render('Reportes/Reportes', ['reportes' => $reportes]);
        }
        else{
            return abort(403);
        }
    }

    public function verReporte($id){
        $user = User::find(Auth::id());

        if ($user->roles[0]->name == 'Administrador'){
            // $reportes=Report::orderBy('status', 'asc')->get();
            // dd($reportes);
            return Inertia::render('Reportes/VerReporte');
        }
        else{
            return abort(403);
        }
    }
}
