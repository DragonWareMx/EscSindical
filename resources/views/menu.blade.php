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
            <i class="small material-icons" style="color: #FFFFFF;">search</i>
            <input type="text" class="main-bar-input" placeholder="Ingresa tu búsqueda">
          </form>

          {{-- Parte derecha de la barra superior--}}
          <div class="main-bar-right">
            <div class="main-bar-right-leftSide">
              <i class="small material-icons" style="color:white;">backpack</i>
              <i class="small material-icons" style="color: #FFFFFF;">notifications_none</i>
            </div>
            <div class="main-bar-right-rightSide">
              <div class="main-username">Monse Jocabed Marín Piñón</div>
              <img class="main-userimage" src="{{ asset('/imgPrueba/profile.jpg') }}" 
                  alt="">
            </div>
          </div>
        </div>

        <!-- contenido -->
        <div class="main-bar-background"></div>
    
        
        
        
        <!-- contenido -->
        <div class="content">
          <img src="/icons/add_black_24dp.svg" alt="">
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
        <ul id="slide-out" class="sidenav sidenav-fixed" style="color: rgba(38, 50, 56, 0.8);">
          <li>
            <div class="user-view">
              <div class="background">
                <img src="imagenes/Classroom/cuate.svg">
              </div>
              <a href="#user"><img class="circle" src="images/yuna.jpg"></a>
              <a href="#name"><span class="white-text name">John Doe</span></a>
              <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
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
          
          <li class="green "><a class="btn-floating btn-large waves-effect waves-light purple center-align"><i class="material-icons">arrow_back</i></a></li>
          
          
            
          
          
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