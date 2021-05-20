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
import axios from 'axios';
import { debounce } from 'lodash';

function initializeMat() {
}

const BuscarCursos = ({ cursos, cursosParaTi }) => {

    const [state, setState] = useState({
        cursos: cursos
    })

    useEffect(() => {
        //initializeMat();
        window.addEventListener('scroll', debounce((e) => {
            let pixelsFromBottom = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;
            if (pixelsFromBottom < 200) {
                axios.get(cursos.next_page_url).then(response => {
                    setState(state => ({
                        ...state,
                        cursos: {
                            ...response.data,
                            data: [...state.cursos.data, ...response.data.data]
                        }
                    }))
                });
            }
        }, 100));
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

                {cursosParaTi && cursosParaTi.length > 0 &&
                <div className="col contenedor s12">
                    <div className="card darken-1 card-buscar-cursos">
                        <div className="card-content">
                            <h1>CURSOS PARA TI</h1>
                            <OwlCarousel className='owl-theme' loop margin={8} nav autoplay responsive={responsive}>
                                {cursosParaTi.map((curso, index) => (
                                    <div className='item' key={index}>
                                        <CourseCardSearch curso={curso} />
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
                }
                {/* Contenedor Más Cursos */}
                <div className="col contenedor s12">
                    <div className="card darken-1 card-buscar-cursos">
                        <div className="card-content">
                            <h1>MÁS CURSOS</h1>
                            <div className="row">
                                {state.cursos.data && state.cursos.data.length > 0 ? state.cursos.data.map(curso =>
                                    <div className="col s12 m6 l3" key={curso.id} style={{ "padding": "0px" }}>
                                        {/* Aqui va el componente */}
                                        <CourseCardSearch curso={curso} />
                                    </div>
                                ) :
                                   <div className="col s12 m6 l3">No se encontraron cursos</div>
                                }
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