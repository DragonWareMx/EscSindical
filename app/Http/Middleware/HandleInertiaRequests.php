<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    // public function share(Request $request)
    // {
    //     return array_merge(parent::share($request), [
    //         //
    //     ]);
    // }
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [

            // Synchronously
            'appName' => config('app.name'),

            // Lazily
            'auth.user' => fn () => $request->user()
                ? $request->user()
                : null,

            // Lazily
            'auth.roles' => fn () => $request->user() ?
                $request->user()->roles()->get()
                ? $request->user()->roles()->get()
                : null
                : null,
            // 'flash' => [
            //     'message' => $request->session()->get('message'),
            //     'error' => $request->session()->get('error'),
            //     'success'=> $request->session()->get('success')
            // ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                    'message' => $request->session()->get('message')
                ];
            },

            'notificat' => fn () => $request->user() ?
                Notification::where([
                    ['user_id', '=', $request->user()->id],
                    ['visto', '=', '0'],
                ])->orderBy('created_at', 'desc')->get()
                : null,

            'busqueda' => fn () => $request->busqueda,
        ]);
    }
}