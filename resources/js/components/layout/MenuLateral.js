import React, { useEffect } from 'react';
import { InertiaLink, usePage } from "@inertiajs/inertia-react"
import route from 'ziggy-js';

function openNav() {
  var menu = document.getElementById("slide-out");
  menu.classList.remove("menu-cerrado");
  menu.classList.add("menu-abierto");
  document.body.style.transition = "ease-in-out";
  document.body.style.transitionDuration = "500ms";
  if (window.innerWidth > 992)
    document.body.style.paddingLeft = "300px";
  else
    document.body.style.paddingLeft = "60px"
}

function closeNav() {
  var menu = document.getElementById("slide-out");
  menu.classList.add("menu-cerrado");
  menu.classList.remove("menu-abierto");
  document.body.style.transition = "ease-in-out";
  document.body.style.transitionDuration = "500ms";
  document.body.style.paddingLeft = "60px";
}

function closeNav2() {
  var elems = document.querySelectorAll('.sidenav');
  openNav();
  closeNav();
}

function handleContentLoaded() {
  var elems = document.querySelectorAll('.sidenav');
  var options;
  var instances = M.Sidenav.init(elems, options);
}

export default function MenuLateral() {
  const { auth } = usePage().props;
  useEffect(() => {
    handleContentLoaded();
    window.addEventListener('resize', closeNav2);
  }, [])
  return (
    <div>
      {/* menu lateral extendido */}
      <div id="menu-grande">
        <ul id="slide-out" className="sidenav sidenav-fixed scroll-menu" style={{ color: 'rgba(38, 50, 56, 0.8)' }}>
          <li>
            <div>
              <div className="center-align" style={{ zIndex: 100, height: '150px' }}>
                <img src="img/imagenes/Classroom-cuate.svg" style={{ position: 'relative', height: '150px' }} />
              </div>
              <div className="menu-profile-info">
                <img style={{ marginLeft: '10px' }} src={"/storage/fotos_perfil/" + auth.user.foto} className="main-userimage" />
                <div className="profile-info-name truncate"> {auth.user.nombre} {auth.user.apellido_p} {auth.user_apellido_m}</div>
              </div>
            </div>
          </li>
          <li>
            <InertiaLink href={route('ejemplo1').url()} className="icono-menu">
              <i className="material-icons current-menu">home</i>
                    Inicio
                </InertiaLink>
          </li>
          <li>
            <InertiaLink href={route('usuarios').url()} className="icono-menu">
              <i className="material-icons icono-menu">people</i>
                    Usuarios
                </InertiaLink>
            </li>
            <li><a className="subheader division-menu">CURSOS</a></li>
            <li><a href={route('cursos').url()} className="icono-menu"><i className="material-icons icono-menu">school</i>Mis cursos</a></li>
            <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">timeline</i>Buscar cursos</a></li>
            <li><a className="subheader division-menu">SISTEMA</a></li>
            <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">assignment_late</i>Reportes</a></li>
            <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">history</i>Bitácora</a></li>
            <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">settings</i>Configuración</a></li>
            <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">logout</i>Cerrar sesión</a></li>
            <div className="center-align" style={{marginTop: '25px'}}>
              <a onClick={closeNav} href="#!" className="btn-floating btn-large waves-effect waves-light sidenav-close" style={{backgroundColor: '#108058'}}><i className="material-icons">arrow_back</i></a>
            </div>
            <div className="row" style={{ marginTop: '50px' }}>
              <div className="col s5 center-align">
                <img src="/img/imagenes/LogoNacional2.png" alt="logo" />
              </div>
              <div className="col s7 valign-wrapper" style={{ height: '64px' }}>
                Escuela Sindical
                </div>
            </div>
        </ul>
      </div>
      {/* menu lateral comprimido */}
      <div className="menu-compacto center-align">
        <div className="col s12">
          <img src="/img/imagenes/LogoNacional2.png" alt="logo" className="imagen-menu-compacto" />
        </div>
        <div className="col s12">
          <InertiaLink href={route('ejemplo1').url()} className="icono-menu">
            <i className="material-icons icono-menu-compacto current-menu">home</i>
          </InertiaLink>
        </div>
        <div className="col s12">
          <InertiaLink href={route('usuarios').url()} className="icono-menu">
            <i className="material-icons icono-menu-compacto current-menu">people</i>
          </InertiaLink>
        </div>
        <div className="col s12">
          <i className="material-icons icono-menu-compacto icono-menu">school</i>
        </div>
        <div className="col s12">
          <i className="material-icons icono-menu-compacto icono-menu">timeline</i>
        </div>
        <div className="col s12">
          <i className="material-icons icono-menu-compacto icono-menu">assignment_late</i>
        </div>
        <div className="col s12">
          <i className="material-icons icono-menu-compacto icono-menu">history</i>
        </div>
        <div className="col s12">
          <i className="material-icons icono-menu-compacto icono-menu">settings</i>
        </div>
        <div className="col s12">
        <InertiaLink href="/logout" method="post" className="icono-menu"><i className="material-icons icono-menu-compacto icono-menu">logout</i></InertiaLink>
        </div>
        <div className="col s12 center-align" style={{ marginTop: '10px' }}>
          <a onClick={openNav} data-target="slide-out" className="btn-floating btn-medium waves-effect waves-light sidenav-trigger" style={{ backgroundColor: '#108058' }}><i className="material-icons">arrow_forward</i></a>
        </div>
      </div>
    </div>
  );
}