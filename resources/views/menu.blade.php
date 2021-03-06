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
    {{-- Fuente montserrat --}}
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    <title>@yield('title')</title>
</head>
<body>

    <!-- derecha -->
    <div>
        <!-- bara de busqueda superior -->
        <div class="main-bar">

          {{-- Parte izquierda de la barra superior --}}

          <nav class="main-bar-search">
            <div class="nav-wrapper">
              <form>
                <div class="input-field">
                  <input id="search" type="search" required>
                  <label class="label-icon margin-search-icons" for="search"><i class="material-icons">search</i></label>
                  <i class="material-icons margin-search-icons">close</i>
                </div>
              </form>
            </div>
          </nav>
         {{-- <form action="#" method="post" class="main-bar-search">
            @csrf
            <div class="row">
              <div class="col s1" style="padding:10px;">
                <i class="small material-icons" style="color: #FFFFFF;">search</i>
              </div>
              <div class="col s11">
                <input type="text" class="main-bar-input" placeholder="Ingresa tu b??squeda" style="color:white;">
              </div>
            </div>

          </form> --}}

          {{-- Parte derecha de la barra superior--}}
          <div class="main-bar-right">
            <div class="main-bar-right-leftSide">
              <img src="/img/icons/mochila blanca.png" alt="Mochila" class="icono-mochila">
              <i class="small material-icons" style="color: #FFFFFF;">notifications_none</i>
            </div>
            <div class="main-bar-right-rightSide">
              <div> <span class="main-username">Monse Jocabed Mar??n Pi????n</span> </div>
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

        </div>
    </div>

    <!-- menu lateral extendido -->
    <div id="menu-grande" class="">
        <ul id="slide-out" class="sidenav sidenav-fixed scroll-menu" style="color: rgba(38, 50, 56, 0.8); ">
          <li>
            <div>
              <div class="center-align" style="z-index: 100; height:150px">
                <img src="img/imagenes/Classroom-cuate.svg" style="position: relative;height:150px">
              </div>
              <div class="menu-profile-info">
                <img style="margin-left:10px;" src="{{ asset('/img/imagenes/1703234.png') }}" class="main-userimage">
                <div class="profile-info-name truncate">Monse Jocabed Mar??n P??????n</div>
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
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">history</i>Bit??cora</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">settings</i>Configuraci??n</a></li>
          <li><a href="#!" class="icono-menu"><i class="material-icons icono-menu">logout</i>Cerrar sesi??n</a></li>
          <div class="center-align" style="margin-top: 25px">
            <a  onclick="closeNav()" href="#!" class="btn-floating btn-large waves-effect waves-light sidenav-close" style="background-color: #108058"><i class="material-icons">arrow_back</i></a>
          </div>
          <div class="row" style="margin-top: 50px">
            <div class="col s5 center-align">
              <img src="/img/imagenes/LogoNacional2.png" alt="logo">
            </div>
            <div class="col s7 valign-wrapper" style="height: 64px;">
              Formaci??n XX Mich
            </div>
          </div>
        </ul>
    </div>

    <!-- menu lateral comprimido -->
    <div class="menu-compacto center-align">
      <div class="col s12">
        <img src="/img/imagenes/LogoNacional2.png" alt="logo" class="imagen-menu-compacto">
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto current-menu">home</i>
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto icono-menu">people</i>
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto icono-menu">school</i>
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto icono-menu">timeline</i>
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto icono-menu">assignment_late</i>
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto icono-menu">history</i>
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto icono-menu">settings</i>
      </div>
      <div class="col s12">
        <i class="material-icons icono-menu-compacto icono-menu">logout</i>
      </div>

      <div class="col s12 center-align" style="margin-top: 10px;" >
        <a onclick="openNav()"  data-target="slide-out" class="btn-floating btn-medium waves-effect waves-light sidenav-trigger" style="background-color: #108058"><i class="material-icons">arrow_forward</i></a>
      </div>
    </div>
</body>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var options;
        var instances = M.Sidenav.init(elems, options);
    });

  function closeNav() {
    var menu = document.getElementById("slide-out");
    menu.classList.add("menu-cerrado");
    menu.classList.remove("menu-abierto");
    document.body.style.transition = "ease-in-out";
    document.body.style.transitionDuration = "500ms";
    document.body.style.paddingLeft = "60px";
  }

  function openNav() {
    var menu = document.getElementById("slide-out");
    menu.classList.remove("menu-cerrado");
    menu.classList.add("menu-abierto");
    document.body.style.transition = "ease-in-out";
    document.body.style.transitionDuration = "500ms";
    if(window.innerWidth>992)
      document.body.style.paddingLeft = "300px";
    else
    document.body.style.paddingLeft = "60px"
  }

  window.addEventListener('resize', closeNav2);

  function closeNav2(){
    var elems = document.querySelectorAll('.sidenav');
    openNav();
    closeNav();
  }

</script>
</html>