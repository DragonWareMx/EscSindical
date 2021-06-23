<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    //
    public function create(Request $request, $cid, $mid, $pid)
    {
        $validated = $request->validate([
            'comentario' => 'required|max:280',
        ]);

        //se consigue la fecha actual
        $todayDate = Carbon::now();
        //se crea el comentario
        $comentario = new Comment();
        $comentario->comentario = $request->comentario;
        $comentario->entrie_id = $pid;
        $comentario->user_id = Auth::user()->id;
        $comentario->fecha = $todayDate->toDateTimeString();
        $comentario->save();

        return redirect()->back();
    }
}