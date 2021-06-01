import { Inertia } from '@inertiajs/inertia'
import React, { useState, useEffect } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'


export default function ModalSolicitudBaja({curso, url}) {

    function initializeModal() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    useEffect(() => {
        initializeModal();
    }, [])

    const { errors } = usePage().props

    //valores para formulario
    const [values, setValues] = useState({
        descripcion: "",
    
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(url, values);
        setValues(values => ({
            ...values,
            descripcion: "" ,
        }));
    }

    return (
        <div id="modalSolicitudBaja" className="modal">
            <div className="modal-content">
                <div className="modal-close right"><i className="material-icons">close</i></div>
                <form onSubmit = {handleSubmit}>
                    <div className="row">
                        <span className="txt-title-card">Solicitar baja de curso</span>  
                        <p className="txt-modal-inst">Ingresa un texto explicando los motivos de tu solicitud de eliminación para el curso <p  style={{"color":"#134E39", "margin":"0px"}}>{curso.nombre}</p></p> 
                    
                        <div className="input-field col s12" style={{"padding":"0px"}}>
                            <textarea className="materialize-textarea text-area-modal" id="descripcion" value={values.descripcion} onChange={handleChange}></textarea>
                        </div>

                        <div className="info-txt-modal">Un administrador revisará tu solicitud y se te notificará su aprobación o rechazo.</div>
                    
                        <div className="col s12" style={{"padding":"0px", "marginTop": "15px"}}> 
                            <button type="submit" className="modal-close btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px","marginTop":"0px"}}>
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
