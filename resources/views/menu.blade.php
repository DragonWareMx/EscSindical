<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- css del menu -->
    <link rel="stylesheet" href="{{ asset('/css/menuStyle.css') }}">
    <!-- iconos -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="{{ asset('materialize/css/materialize.min.css') }}">
    <!-- Compiled and minified JavaScript -->
    <script src="{{ asset('materialize/js/materialize.min.js') }}"></script>
    
    <title>@yield('title')</title>
</head>
<body>
    
    <!-- derecha -->
    <div>
        <!-- bara de busqueda superior -->
        <div class="main-bar">

          {{-- Parte izquierda de la barra superior --}}
          <form action="#" method="post" class="main-bar-search">
            @csrf
            <div class="row">
              <div class="col s1" style="padding:10px;">
                <i class="small material-icons" style="color: #FFFFFF;">search</i>
              </div>
              <div class="col s11">
                <input type="text" class="" placeholder="Ingresa tu búsqueda" style="color:white;">
              </div>
            </div>
            
          </form>

          {{-- Parte derecha de la barra superior--}}
          <div class="main-bar-right">
            <div class="main-bar-right-leftSide">
              <img src="/img/icons/mochila blanca.png" alt="Mochila" class="icono-mochila">
              <i class="small material-icons" style="color: #FFFFFF;">notifications_none</i>
            </div>
            <div class="main-bar-right-rightSide">
              <div> <span class="main-username">Monse Jocabed Marín Piñón</span> </div>
              <img class="main-userimage" src="{{ asset('/imgPrueba/profile.jpg') }}" 
                  alt="">
            </div>
          </div>
        </div>

        <!-- contenido -->
        <div class="main-bar-background"></div>
    
        
        
        
        <!-- contenido -->
        <div class="content">
          
            <div class="row">
                <div class="col s12 m6">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">Card Title</span>
                      <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s12 m6">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">Card Title</span>
                      <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s12 m6">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">Card Title</span>
                      <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s12 m6">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">Card Title</span>
                      <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                  </div>
                </div>
              </div>
    
        </div>-->
    </div>

    <!-- menu lateral -->
    <div>
        <ul id="slide-out" class="sidenav sidenav-fixed scroll-menu" style="color: rgba(38, 50, 56, 0.8); ">
          <li>
            <div>
              <div class="center-align" style="z-index: 100; height:150px">
                <img src="img/imagenes/Classroom-cuate.svg" style="position: relative;height:150px">
              </div>
              <div class="menu-profile-info">
                
                <img src="{{ asset('/img/imagenes/1703234.png') }}" class="main-userimage">
                
                
              </div>
            </div>
          </li>
          <li><a href="#!" class="current-menu"><i class="material-icons current-menu">home</i>Inicio</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">people</i>Usuarios</a></li>
          <li><a class="subheader division-menu">CURSOS</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">school</i>Mis cursos</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">timeline</i>Buscar cursos</a></li>
          <li><a class="subheader division-menu">SISTEMA</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">assignment_late</i>Reportes</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">history</i>Bitácora</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">settings</i>Configuración</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">logout</i>Cerrar sesión</a></li>
          <div class="center-align" style="margin-top: 25px">
            <a class="btn-floating btn-large waves-effect waves-light" style="background-color: #108058"><i class="material-icons">arrow_back</i></a>
          </div>
          <div class="row" style="margin-top: 50px">
            <div class="col s5 center-align">
              <img src="/img/imagenes/LogoNacional2.png" alt="logo">
            </div>
            <div class="col s7 valign-wrapper" style="height: 64px;">
              Escuela Sindical
            </div>
            
            
          </div>
          
          
          
            
          
          
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        
    </div>



    

    
    
</body>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var options;
        var instances = M.Sidenav.init(elems, options);
    });
</script>
</html>