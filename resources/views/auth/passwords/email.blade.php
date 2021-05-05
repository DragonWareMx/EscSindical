<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recuperar contraseña</title>
    <link rel="icon" href="{{ asset('img/imagenes/LogoNacionalCrop.png') }}">
    {{-- JQuery --}}
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="{{ asset('materialize/css/materialize.min.css') }}">
    <!-- Compiled and minified JavaScript -->
    <script src="{{ asset('materialize/js/materialize.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    {{-- Iconos de google --}}
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    {{-- Fuentes de google - Montserrat --}}
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
</head>

<body>
    <div class="row">
        <div class="divright  hide-on-small-only col s12 m3 l4">
            <div class="row" style="width: 100%">
                <div class="col s12 m12 l12" style="display: block">
                    <ul class="tabs">
                        <li class="tab col xl6 l6 m6"><a href="{{ route('login') }}">Ingresar</a></li>
                        <li class="tab col xl6 l6 m6"><a class="" href="{{ route('register') }}">Registrarse</a></li>
                    </ul>
                </div>
            </div>
            <div class="col s12 head-login forgot left-align">
                <div class="left">
                    <div class="titulo1">Escuela Sindical</div>
                    <div class="titulo2">Sección XX Michoacán</div>
                </div>
                <div class="right">
                    <img src="{{ asset('img/imagenes/LogoSeccional.png') }}" alt="Escuela Sindical" width="80px">
                </div>
            </div>
            <div class="col s12">
                <img src="{{ asset('img/imagenes/forgot-password-cuate.svg') }}" alt="" srcset="">
            </div>
        </div>
        <div class="divleft col s12 m9 l8">
            <div class="col hide-on-med-and-up s12 head-login">
                <div class="left">
                    <div class="titulo1">Escuela Sindical</div>
                    <div class="titulo2">Sección XX Michoacán</div>
                </div>
                <div class="right">
                    <img src="{{ asset('img/imagenes/LogoSeccional.png') }}" alt="Escuela Sindical" width="121px">
                </div>
            </div>
            <div class="col hide-on-small-only s12 head-login">
                <div class="left">
                    <div class="titulo2">RECUPERAR CONTRASEÑA</div>
                </div>
            </div>
            <div class="form-login col s12">
                <h1>RECUPERAR CONTRASEÑA</h1>
                <h2 style="font-size: 16px">Te enviaremos un correo electrónico a la dirección que indiques para que
                    puedas restaurar tu contraseña</h2>
                <form class="col s12" method="POST" action="{{ route('password.email') }}">
                    @csrf
                    <div class="row">
                        <div class="input-field col s12" style="margin-top: 6.5vh; padding:0">
                            <i class="material-icons prefix">face</i>
                            <input id="matricula" type="email" class="validate @error('email') invalid @enderror"
                                id="email" name="email" value="{{ old('email') }}" required autocomplete="email">
                            <label for="matricula">Correo electrónico</label>
                            @error('email')
                            <span class="helper-text" data-error="{{$message}}">{{$message}}</span>
                            @enderror
                            @if (session('status'))
                            <span class="helper-text" data-success="{{session('status')}}">{{session('status')}}</span>
                            @endif
                        </div>
                    </div>
                    <a class="link-forget" href="{{ route('login') }}">Iniciar Sesión</a>
                    <div class="col s12 right-align">
                        <button class="btn waves-effect waves-teal btn-login" type="submit" name="action"
                            style="height: 54px">Enviar correo
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>

            <div class="col s12 footer-login">
                © 2021 Escuela Sindical | &nbsp; <a href="https://dragonware.com.mx" target="_blank"> Desarrollado por
                    DragonWare
                    <img src="{{ asset('img/imagenes/dragonWare.png') }}" alt="DragonWare" width="22px"></a>
            </div>
        </div>
    </div>
</body>

<script>
    $(document).ready(function(){
        $('.tabs').tabs();
    });
</script>

</html>