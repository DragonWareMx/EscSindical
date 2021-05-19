import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import '../../styles/cursos.css'

function initializeModals() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
}

const Prueba = () => {
    useEffect(() => {
        initializeModals();
    }, [])
  return (
    <>
    
    <a className="btn-floating btn-large waves-effect waves-light  teal darken-3 modal-trigger" href="#modalSolicitud"><i className="material-icons">add_circle_outline</i></a>
    <div id="modalSolicitud" className="modal little-modal">
        <div className="modal-content">
            <div className="modal-close right"><i className="material-icons">close</i></div>
            <div className="row">
                <span className="txt-title-card">SOLICITAR ELIMINACIÓN DE CURSO</span>  
                <p class="txt-modal-inst">Ingresa un texto explicando los motivos de tu solicitud de eliminación para el curso <p class="" style={{"color":"#134E39", "margin":"0px"}}>Nombre completo del curso</p></p> 
            
                <div className="input-field col s12" style={{"padding":"0px"}}>
                    <textarea class="materialize-textarea text-area-modal" id="descripcion"></textarea>
                </div>

                <div class="info-txt-modal">Un administrador revisará tu solicitud y se te notificará su aprobación o rechazo.</div>
            
                <div class="col s12" style={{"padding":"0px", "marginTop": "15px"}}> 
                    <div className="col s12 right-align" style={{ "padding": "0%" }}>
                        <a class="waves-effect waves-light btn" style={{"textTransform": "initial" }}><i class="material-icons right" style={{ "font-size": "18px"}}>send</i>Enviar</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

Prueba.layout = page => <Layout children={page} title="Prueba" pageTitle="PRUEBA"/>

export default Prueba