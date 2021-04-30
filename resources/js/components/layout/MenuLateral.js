import React from 'react';
import { InertiaLink } from "@inertiajs/inertia-react"

export default function MenuLateral(){
    return(
        <div>
            {/* menu lateral */}
            <div>
            <ul id="slide-out" className="sidenav sidenav-fixed" style={{color: 'rgba(38, 50, 56, 0.8)'}}>
                <li>
                <div className="user-view">
                    <div className="background">
                    <img src="imagenes/Classroom/cuate.svg" />
                    </div>
                    <a href="#user"><img className="circle" src="images/yuna.jpg" /></a>
                    <a href="#name"><span className="white-text name">John Doe</span></a>
                    <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                </div>
                </li>
                <li>
                    <InertiaLink className="current-menu" href={route('ejemplo1').url()}>
                        <i className="material-icons current-menu">home</i>Ejemplo 1
                    </InertiaLink>
                </li>
                <li>
                    <InertiaLink className="current-menu" href={route('ejemplo2').url()}>
                        <i className="material-icons current-menu">home</i>Ejemplo 2
                    </InertiaLink>
                </li>
                <li><a href="#!" className="current-menu"><i className="material-icons current-menu">home</i>Inicio</a></li>
                <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">people</i>Usuarios</a></li>
                <li><a className="subheader division-menu">CURSOS</a></li>
                <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">school</i>Mis cursos</a></li>
                <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">timeline</i>Buscar cursos</a></li>
                <li><a className="subheader division-menu">SISTEMA</a></li>
                <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">assignment_late</i>Reportes</a></li>
                <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">history</i>Bitácora</a></li>
                <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">settings</i>Configuración</a></li>
                <li><a href="#!" className="icono-menu"><i className="material-icons icono-menu">logout</i>Cerrar sesión</a></li>
                <li className="green "><a className="btn-floating btn-large waves-effect waves-light purple center-align"><i className="material-icons">arrow_back</i></a></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
        </div>
    );
}