import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import Paginacion from '../../components/common/Paginacion';
import FlotanteAyuda from '../../components/common/FlotanteAyuda';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import route from 'ziggy-js';
import '../../styles/buscarCursos.css';

import CourseCardSearch from '../../components/cursos/CourseCardSearch'
import CourseCardSearchHover from '../../components/cursos/CourseCardSearchHover'

function initializeMat() {
}

const BuscarCursos = ({ cursos }) => {

    useEffect(() => {
        //initializeMat();
    }, [])

    const responsive = {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 4,
        }
    }

    console.log(cursos)

    return (
        <>
            <div className="row contenedor">
                {/* Contenedor Cursos para ti */}
                <div className="col contenedor s12">
                    <div className="card darken-1 card-buscar-cursos">
                        <div className="card-content">
                            <h1>CURSOS PARA TI</h1>
                            <OwlCarousel className='owl-theme' loop margin={36} nav autoplay responsive={responsive}>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                                <div className='item'>
                                    <img src="/storage/fotos_perfil/avatar1.jpg" />
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
                {/* Contenedor Más Cursos */}
                <div className="col contenedor s12">
                    <div className="card darken-1 card-buscar-cursos">
                        <div className="card-content">
                            <h1>MÁS CURSOS</h1>
                            <div className="row">
                                {cursos.map(curso=>
                                    <div className="col s12 m6 l3">
                                        {/* Aqui va el componente */}
                                        <CourseCardSearch curso={curso} />
                                    </div>
                                )}
                                <CourseCardSearchHover />
                            </div>
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