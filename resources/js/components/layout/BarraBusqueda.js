import React from 'react';
import { InertiaLink } from "@inertiajs/inertia-react"
import route from 'ziggy-js';
import FlotanteAyuda from '../../components/common/FlotanteAyuda';
import FlotanteProfe from '../../components/common/FlotanteProfe';
import FlotanteAdmin from '../../components/common/FlotanteAdmin';
import { usePage } from '@inertiajs/inertia-react'


function openNav() {
    var menu = document.getElementById("slide-out");
    var amburger = document.getElementById("amburger");

    menu.classList.remove("menu-cerrado");
    menu.classList.add("menu-abierto");
    document.body.style.transition = "ease-in-out";
    document.body.style.transitionDuration = "500ms";
    if (window.innerWidth > 992) {
        document.body.style.paddingLeft = "300px";
        amburger.style.display = "none";
    }
}

function closeNav() {
    var menu = document.getElementById("slide-out");
    var amburger = document.getElementById("amburger");

    menu.classList.add("menu-cerrado");
    menu.classList.remove("menu-abierto");
    document.body.style.transition = "ease-in-out";
    document.body.style.transitionDuration = "500ms";
    if (window.innerWidth > 992)
        document.body.style.paddingLeft = "60px";
    else {
        document.body.style.paddingLeft = "0px";
        amburger.style.display = "block";
    }
}

function growSearchBar() {
    if (window.innerWidth <= 600) {
        var barraRight = document.getElementById('main-bar-backNoti');
        barraRight.classList.add('hide');
        var barraRightFoto = document.getElementById('main-bar-right');
        barraRightFoto.classList.add('main-bar-right-grown');
        var barraSearch = document.getElementById('main-bar-search');
        barraSearch.classList.add('barraSearch-grown');
        var enter = document.getElementById('enter-search');
        enter.classList.remove('hide-on-small-only');
    }
}

function shrinkSearchBar() {
    if (window.innerWidth <= 600) {
        var barraRight = document.getElementById('main-bar-backNoti');
        barraRight.classList.remove('hide');
        var barraRightFoto = document.getElementById('main-bar-right');
        barraRightFoto.classList.remove('main-bar-right-grown');
        var barraSearch = document.getElementById('main-bar-search');
        barraSearch.classList.remove('barraSearch-grown');
        var enter = document.getElementById('enter-search');
        enter.classList.add('hide-on-small-only');
    }
}

export default function BarraBusqueda() {
    const { auth } = usePage().props;
    return (
        <div>
            {/* bara de busqueda superior */}
            <div className="main-bar">

                <a id="amburger" onClick={openNav} data-target="slide-out" className="menu-celular waves-effect waves-light sidenav-trigger"><i className="material-icons">menu</i></a>

                {/* Parte izquierda de la barra superior */}
                <nav className="main-bar-search" id="main-bar-search" onClick={growSearchBar}>
                    <div className="nav-wrapper nav-flex row">
                        <div className="input-field col s12" style={{ marginLeft: "0px", padding: "0px" }}>
                            <input className="main-bar-search-2" id="search" type="search" required style={{ "borderRadius": "4px" }} onBlur={shrinkSearchBar} />
                            <label className="label-icon margin-search-icons" htmlFor="search"><i className="material-icons">search</i></label>
                        </div>
                        <div className="col enter-div hide-on-small-only" id="enter-search">
                            <a className="" href="#!"><i className="material-icons">chevron_right</i></a>
                        </div>
                    </div>
                </nav>
                {/* Parte derecha de la barra superior*/}
                <div className="main-bar-right" id="main-bar-right">
                    <div className="main-bar-right-leftSide" id="main-bar-backNoti">
                        <i className="material-icons icono-notificaciones">backpack</i>
                        <i className="material-icons icono-notificaciones">notifications</i>
                    </div>

                    <div className="main-bar-right-rightSide">
                        <div className="truncate">
                            <InertiaLink href={route('perfil').url()}>
                                <span className="main-username">{auth.user.nombre} {auth.user.apellido_p} {auth.user.apellido_m}</span>
                            </InertiaLink>
                        </div>
                        <div>
                            <InertiaLink href={route('perfil').url()}>
                                <img className="main-userimage" src={"/storage/fotos_perfil/" + auth.user.foto} alt="" />
                            </InertiaLink>
                        </div>
                    </div>
                </div>
            </div>
            {/* contenido */}
            <div className="main-bar-background" /> 
            {/* Los botonsitos */}
            {auth.roles[0].slug == 'alumno' && <FlotanteAyuda />}
            {auth.roles[0].slug == 'ponente' && <FlotanteProfe />}
            {auth.roles[0].slug == 'admin' && <FlotanteAdmin />}
        </div>
    );
}