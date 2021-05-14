import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import Paginacion from '../../components/common/Paginacion';
import FlotanteAyuda from '../../components/common/FlotanteAyuda';

import '/js/jquery-3.6.0.min.js';

import route from 'ziggy-js';
import '../../styles/buscarCursos.css';

function initializeMat() {
}

const BuscarCursos = () => {

    useEffect(() => {
        //initializeMat();
    }, [])

    const options = {
        items: 1,
        nav: true,
        rewind: true,
        autoplay: true
    };

    const events = {

    };

    return (
        <>
            <div className="row contenedor">
                {/* Contenedor Cursos para ti */}
                <div className="col contenedor s12">
                    <div className="card darken-1 card-buscar-cursos">
                        <div className="card-content">
                            <h1>CURSOS PARA TI</h1>

                        </div>
                    </div>
                </div>
                {/* Contenedor Más Cursos */}
                <div className="col contenedor s12">
                    <div className="card darken-1 card-buscar-cursos">
                        <div className="card-content">
                            <h1>MÁS CURSOS</h1>
                        </div>
                    </div>
                </div>
            </div>
            <FlotanteAyuda />
        </>
    )
}

BuscarCursos.layout = page => <Layout children={page} title="Escuela Sindical - Buscar Cursos" pageTitle="BUSCAR CURSOS" />

export default BuscarCursos