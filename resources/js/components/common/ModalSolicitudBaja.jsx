import React, { useEffect, useState } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'

export default function ModalEliminar({nombre, tipo, url}) {

    function initializeModal() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    useEffect(() => {
        initializeModal();
    }, [])

    return (
        <div id="modalSolicitud" className="modal">
            <div className="modal-content">
                <div className="modal-close right"><i className="material-icons">close</i></div>
                <form>
                    <div className="row">
                        <span className="txt-title-card">SOLICITAR - DE CURSO</span>  
                        <p className="txt-modal-inst">Ingresa un texto explicando los motivos de tu solicitud de - para el curso <p  style={{"color":"#134E39", "margin":"0px"}}>Nombre completo del curso</p></p> 
                    
                        <div className="input-field col s12" style={{"padding":"0px"}}>
                            <textarea className="materialize-textarea text-area-modal" id="descripcion"></textarea>
                        </div>

                        <div className="info-txt-modal">Un administrador revisará tu solicitud y se te notificará su aprobación o rechazo.</div>
                    
                        <div className="col s12" style={{"padding":"0px", "marginTop": "15px"}}> 
                            <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px","marginTop":"0px"}}>
                                Enviar
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
