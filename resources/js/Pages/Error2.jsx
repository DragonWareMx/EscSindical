import React from 'react';
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';

import '../styles/errores.css';

export default function ErrorPage({ status }) {
    const title = {
        503: '503: Servicio no disponible',
        500: '500: Server interno',
        404: '404: Página no encontrada',
        403: '403: Prohibido',
    }[status]

    const description = {
        503: 'Lo sentimos, estamos haciendo mantenimiento. Por favor vuelve luego.',
        500: 'Whoops, algo salió mal en nuestros servidores.',
        404: 'Lo sentimos, la página que estás buscando no se pudo encontrar.',
        403: 'Lo sentimos, no tienes permisos para entrar a esta página.',
    }[status]

    return (
        <div className="error-div" style={{ width: "100%" }}>
            <div className="row" style={{ width: "100%", height: "100%" }}>
                <div className="col s12 m9 xl6">
                    <div className="card">
                        <div className="card-content">
                            <img src="/img/imagenes/No-data-cuate.svg" alt="Error" style={{ width: "80%", height: "80%" }} />
                            <span className="card-title" style={{ width: "100%", textAlign: "center" }}>{title}</span>
                            <p>{description}</p>
                        </div>
                        <div className="card-action">
                            <InertiaLink href={route('home')} style={{ color: "#419779" }}>Ir a inicio</InertiaLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}