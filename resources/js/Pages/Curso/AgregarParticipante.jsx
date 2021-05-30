import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useState, useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react';

import '/css/participantes.css'
import '/css/modulos.css'
import '../../styles/usersStyle.css'

import Alertas from '../../components/common/Alertas';
import route from 'ziggy-js';

function tooltip(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}

const AgregarParticipante = ({curso}) => {
    useEffect(() => {
        tooltip();
    }, [])

    function seleccionar_todo(){
        for (var i=0;i<document.form_solicitudes.elements.length;i++)
            if(document.form_solicitudes.elements[i].type == "checkbox")
                document.form_solicitudes.elements[i].checked=true;

        document.getElementById("txt-select-all").style.display = "none";
        document.getElementById("txt-select-all-not").style.display = "block";
    }
    
     function seleccionar_todo_not(){
        for (var i=0;i<document.form_solicitudes.elements.length;i++)
            if(document.form_solicitudes.elements[i].type == "checkbox")
                document.form_solicitudes.elements[i].checked=false;

        document.getElementById("txt-select-all").style.display = "block";
        document.getElementById("txt-select-all-not").style.display = "none";
    }

    return (
    <>
        <div className="row"> 
        <form name="form_solicitudes">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                {/* regresar */}
                <InertiaLink  href={route('cursos.participantes', curso.id)}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i class="material-icons">keyboard_backspace</i></InertiaLink>
                AGREGAR PARTICIPANTES
            </div>

            <div className="col s12">
                <nav className="searchUsers" style={{"marginTop":"0px !important"}}>
                    <div className="nav-wrapper nav-busqueda">
                        <div className="col filter-div">
                            {/* Dropdown Structure */}
                            <a className="dropdown-trigger" href="#!" data-target="dropdown-filter"><i className="material-icons">filter_alt</i></a>
                            <ul id="dropdown-filter" className="dropdown-content" style={{ top: "0px" }}>
                                <li><a >Matrícula</a></li>
                                {/* <li><a onClick={() => { filter("rol") }} className={request.filter == "rol" ? "selected" : ""}>Rol</a></li>
                                <li><a onClick={() => { filter("nombre") }} className={request.filter == "nombre" ? "selected" : ""}>Nombre</a></li>
                                <li><a onClick={() => { filter("unidad") }} className={request.filter == "unidad" ? "selected" : ""}>Unidad</a></li>
                                <li><a onClick={() => { filter("categoria") }} className={request.filter == "categoria" ? "selected" : ""}>Categoría</a></li>
                                <li><a onClick={() => { filter("eliminado") }} className={request.filter == "eliminado" ? "selected" : ""}>Eliminado</a></li> */}
                            </ul>
                        </div>
                        <div className="input-field col s11" style={{ marginLeft: "0px" }}>
                            <input id="user_search" className="input-search-user" type="search" placeholder="Buscar usuario" />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="col s12" style={{"marginTop":"15px"}}>
                <a className="a-select-all" id="txt-select-all" onClick={seleccionar_todo}>Seleccionar todos</a>
                <a className="a-select-all" id="txt-select-all-not" onClick={seleccionar_todo_not} style={{"display":"none"}}>Descartar selección</a>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label>
                    <input type="checkbox" name="solicitud" id="optionCheck" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">Disponible</div>
                        </div>
                    </span>
                </label>
            </div>

            <div className="col s12 div-collection-item div-item-solicitudes">
                <label>
                    <input type="checkbox" name="solicitud" id="optionCheck" disabled="disabled" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">No disponible</div>
                        </div>
                    </span>
                </label>
            </div>

            <div className="col s12  right">
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Agregar
                    <i className="material-icons right">control_point</i>
                </button>
            </div>
        </form>
        </div>
    </>
  )
}

AgregarParticipante.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="PARTICIPANTES">
    <LayoutCursos children={page} />
  </Layout>
)

export default AgregarParticipante