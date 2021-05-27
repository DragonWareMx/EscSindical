import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useState, useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react';

import '/css/participantes.css'
import '/css/modulos.css'
import route from 'ziggy-js';

function tooltip(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}



const Solicitudes = ({curso}) => {
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
                SOLICITUDES
            </div>
            <div className="col s12">
                <a className="a-select-all" id="txt-select-all" onClick={seleccionar_todo}>Seleccionar todos</a>
                <a className="a-select-all" id="txt-select-all-not" onClick={seleccionar_todo_not} style={{"display":"none"}}>Descartar selección</a>
            </div>
            

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" name="solicitud" id="optionCheck" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox"  name="solicitud" id="optionCheck" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            <div className="col s12  right">
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Aprobar
                    <i className="material-icons right">task_alt</i>
                </button>
                
                <button type="submit" className="btn-rejacted-soli btn-primary btn waves-effect waves-teal btn-login right  no-uppercase" style={{"height": "40px","backgroundColor":"#D3766A","marginRight":"30px"}}>
                    Rechazar
                    <i className="material-icons right">highlight_off</i>
                </button>
            </div>
        </form>
        </div>
    </>
  )
}

Solicitudes.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="SOLICITUDES">
    <LayoutCursos children={page} />
  </Layout>
)

export default Solicitudes