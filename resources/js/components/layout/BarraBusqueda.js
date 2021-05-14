import React from 'react';
import { InertiaLink } from "@inertiajs/inertia-react"
import route from 'ziggy-js';

import { usePage } from '@inertiajs/inertia-react'

export default function BarraBusqueda() {
    const { auth } = usePage().props;
    return (
        <div>
            {/* bara de busqueda superior */}
            <div className="main-bar">
                {/* Parte izquierda de la barra superior */}
                <nav className="main-bar-search">
                    <div className="nav-wrapper">
                        <form>
                            <div className="input-field">
                                <input id="search" type="search" required style={{ "border-radius": "4px" }} />
                                <label className="label-icon margin-search-icons" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons margin-search-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
                {/* Parte derecha de la barra superior*/}
                <div className="main-bar-right">
                    <div className="main-bar-right-leftSide">
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
        </div>
    );
}