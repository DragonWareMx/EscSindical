<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    //
    public function marcar($id, Request $request)
    {
        $notif = Notification::findOrFail($id);
        if ($notif->user_id != Auth::user()->id) {
            return abort('404');
        }
        $notif->visto = true;
        $notif->save();

        $notificat = Notification::where([
            ['user_id', '=', $request->user()->id],
            ['visto', '=', '0'],
        ])->get();

        if ($request->wantsJson()) {
            return $notificat;
        }
        return $notificat;
    }
}