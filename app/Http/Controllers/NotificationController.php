<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //
    public function marcar($id, Request $request)
    {
        if ($id != $request->id_notif) {
            return abort('404');
        }
        $notif = Notification::findOrFail($request->id_notif);
        $notif->visto = true;
        $notif->save();
    }
}