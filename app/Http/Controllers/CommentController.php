<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    //
    public function consultar($pid)
    {
        $comments = Comment::where('entrie_id', $pid);
        return redirect()->back();
    }

    public function create(Request $request, $cid, $mid, $pid)
    {
        $validated = $request->validate([
            'comentario' => 'required|max:280',
        ]);

        //return redirect()->back()->with('error', 'Algo falló aquí  :\'v.');
        $inscrito = Course::leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')->where('course_user.course_id', $cid)->where('course_user.user_id', Auth::id())->first();
        $profe = Course::where([
            ['teacher_id', '=', Auth::id()],
            ['id', '=', $cid],
        ])->first();
        if (!$inscrito && !$profe) {
            return redirect()->back()->with('error', 'Ocurrió un error inesperado, vuelve a intentarlo.');
        }

        DB::beginTransaction();
        try {
            //se consigue la fecha actual
            $todayDate = Carbon::now();
            //se crea el comentario
            $comentario = new Comment();
            $comentario->comentario = $request->comentario;
            $comentario->entrie_id = $pid;
            $comentario->user_id = Auth::user()->id;
            $comentario->fecha = $todayDate->toDateTimeString();
            $comentario->save();

            DB::commit();
            // all good
            return redirect()->back()->with('success', 'Comentario creado con éxito.');
        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
            return redirect()->back()->with('error', 'Ocurrió un error inesperado, vuelve a intentarlo.');
        }
    }

    public function update(Request $request, $cid, $mid, $pid)
    {
        $validated = $request->validate([
            'comentario_editado' => 'required|max:280',
        ]);

        //return redirect()->back()->with('error', 'Algo falló aquí  :\'v.');
        $inscrito = Course::leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')->where('course_user.course_id', $cid)->where('course_user.user_id', Auth::id())->first();
        $profe = Course::where([
            ['teacher_id', '=', Auth::id()],
            ['id', '=', $cid],
        ])->first();
        if (!$inscrito && !$profe) {
            return redirect()->back()->with('error', 'Ocurrió un error inesperado, vuelve a intentarlo.');
        }

        DB::beginTransaction();
        try {
            //se consigue la fecha actual
            $todayDate = Carbon::now();
            //se crea el comentario
            $comentario = Comment::findOrFail($request->id_edit);
            $comentario->comentario = $request->comentario_editado;
            $comentario->editado = 1;
            $comentario->fecha = $todayDate->toDateTimeString();
            $comentario->save();

            DB::commit();
            // all good
            return redirect()->back()->with('success', 'Comentario editado con éxito.');
        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
            return redirect()->back()->with('error', 'Ocurrió un error inesperado, vuelve a intentarlo.');
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            //se elimina el comentario
            $comentario = Comment::findOrFail($id);
            $comentario->delete();

            DB::commit();
            // all good
            return redirect()->back()->with('success', 'Comentario eliminado con éxito.');
        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
            return redirect()->back()->with('error', 'Ocurrió un error inesperado, vuelve a intentarlo.');
        }
    }
}