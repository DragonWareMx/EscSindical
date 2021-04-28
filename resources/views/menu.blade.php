<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="{{ asset('/css/menuStyle.css') }}">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="{{ asset('materialize/css/materialize.min.css') }}">
    <!-- Compiled and minified JavaScript -->
    <script src="{{ asset('materialize/js/materialize.min.js') }}"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
        <ul id="slide-out" class="sidenav sidenav-fixed">
        <li><a href="#!">First Sidebar Link</a></li>
        <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger">MENU</a>
    </div>



    

    
    
</body>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, options);
    });
</script>
</html>