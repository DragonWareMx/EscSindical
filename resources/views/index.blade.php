<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Formación XX Mich</title>

        <link rel="icon" href="{{asset('img/imagenes/LogoNacionalCrop.png')}}"/>

        {{-- ELIMINAR SI NO SE UTILIZA --}}
        <link href="{{asset('css/app.css')}}" rel="stylesheet" />

        <!-- css del menu -->
    <link rel="stylesheet" href="{{ asset('/css/menuStyle.css') }}">

        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="{{ asset('materialize/css/materialize.min.css') }}">
        <!-- Compiled and minified JavaScript -->
        <script src="{{ asset('materialize/js/materialize.min.js') }}"></script>

        {{-- Iconos de google --}}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        {{-- Fuentes de google - Montserrat --}}
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet">
    </head>
    <body>
        <div id="app"></div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>