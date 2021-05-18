import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import '/css/layoutCursos.css'

function initializeMat() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
}

const layoutCursos = ({ layoutCursos }) => {   
    useEffect(() => {
        initializeMat();
    }, [])

    return (
        <>
            <div className="row contenedor">
               <div className="card darken-1" style={{"padding":"5px 25px"}}>
                   <div className="card-content row">
                        <div className="col s11 valign-wrapper LC_title">Programación Lógica y Funcional (Grupo de las 8 am) &nbsp; <i className="material-icons">verified</i></div>
                        <div className="col s1 LC_more"><a className='dropdown-trigger' href='#' data-target='dropdown_LC'><i className="small material-icons" style={{"color":"#727272"}}>more_vert</i></a></div>
                        <ul id='dropdown_LC' className='dropdown-content'>
                            <li><a href="#!">Descargar Reporte del curso</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a href="#!">Solicitar eliminación del curso</a></li>
                        </ul>
                   </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab LC_tab">
                                    <a href="#test1" className="LC_a active">
                                        <i className="material-icons col s3 LC_tab_icons">school</i>
                                        <div className="col s9">Información</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test1" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">book</i>
                                        <div className="col s9">Módulos</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test1" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">backpack</i>
                                        <div className="col s9">Mochila</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test1" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">people</i>
                                        <div className="col s9">Participantes</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test1" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">bar_chart</i>
                                        <div className="col s9">Estadísticas</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}

layoutCursos.layout = page => <Layout children={page} title="Escuela Sindical - Curso" pageTitle="MIS CURSOS" />

export default layoutCursos