import React from 'react';

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
                                <input id="search" type="search" required />
                                <label className="label-icon margin-search-icons" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons margin-search-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
                {/* Parte derecha de la barra superior*/}
                <div className="main-bar-right">
                    <div className="main-bar-right-leftSide">
                        <img src="/img/icons/mochila blanca.png" alt="Mochila" className="icono-mochila" />
                        <i className="small material-icons" style={{ color: '#FFFFFF' }}>notifications_none</i>
                    </div>
                    <div className="main-bar-right-rightSide">
                        <div>
                            <span className="main-username"> {auth.user.nombre} {auth.user.apellido_p} {auth.user_apellido_m}</span>
                        </div>
                        <img className="main-userimage" src={"/storage/fotos_perfil/" + auth.user.foto} alt="" />
                    </div>
                </div>
            </div>
            {/* contenido */}
            <div className="main-bar-background" />
        </div>
    );
}