import React from 'react'
import Layout from '../layouts/Layout';
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink } from '@inertiajs/inertia-react';

function ErrorPage({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    return (
        <div className="error-div" style={{ width: "100%", height: "70vh" }}>
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

ErrorPage.layout = page => <Layout children={page} title="Escuela Sindical - Error" pageTitle="ERROR" />

export default ErrorPage