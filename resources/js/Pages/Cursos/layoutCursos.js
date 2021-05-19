import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import '/css/layoutCursos.css'

function initializeMat() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}

const layoutCursos = ({ layoutCursos }) => {   
    useEffect(() => {
        initializeMat();
    }, [])

    return (
        <>
            <div className="row contenedor">
               <div className="card darken-1" style={{"padding":"5px 25px"}}>
                   <div className="card-content row valign-wrapper" style={{"padding":"10px","marginBottom":"0px"}}>
                        <div className="col s11 valign-wrapper LC_title">Programación Lógica y Funcional (Grupo de las 8 am) &nbsp; <i className="material-icons">verified</i></div>
                        <div className="col s1 LC_more"><a className='dropdown-trigger' href='#' data-target='dropdown_LC'><i className="small material-icons" style={{"color":"#727272"}}>more_vert</i></a></div>
                        <ul id='dropdown_LC' className='dropdown-content'>
                            <li><span><a className="dropdown-text1" href="#!">Descargar reporte del curso</a></span></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><span><a className="dropdown-text1" href="#!">Solicitar eliminación del curso</a></span></li>
                        </ul>
                   </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab LC_tab">
                                    <a href="#test1" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">school</i>
                                        <div className="col s9">Información</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test2" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">book</i>
                                        <div className="col s9">Módulos</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test3" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">backpack</i>
                                        <div className="col s9">Mochila</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test4" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">people</i>
                                        <div className="col s9">Participantes</div>
                                    </a>
                                </li>
                                <li className="tab">
                                    <a href="#test5" className="LC_a">
                                        <i className="material-icons col s3 LC_tab_icons">bar_chart</i>
                                        <div className="col s9">Estadísticas</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div id="test1" class="col s12">Test 1</div>
                        <div id="test2" class="col s12">Test 2</div>
                        <div id="test3" class="col s12">Test 3</div>
                        <div id="test4" class="col s12">Test 4</div>
                        <div id="test5" class="col s12">Test 5</div>
                    </div>
               </div>
            </div>
        </>
    )
}

layoutCursos.layout = page => <Layout children={page} title="Escuela Sindical - Curso" pageTitle="MIS CURSOS" />

export default layoutCursos