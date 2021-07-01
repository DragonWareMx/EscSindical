import React, { useState, useEffect } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

export default function ModalReportar({nombre, id, url}) {

    function initializeModal() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

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
    // Enviar el formulario
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('CrearReporte',id), values,
            {
                onError: () => {
                    // Inertia.reload({ only: ['cursos'], data: { regime: values.regimen } })
                }
            }
        )
    }


    useEffect(() => {
        initializeModal();
    }, [])

    return (
        <div id={'modalReportar'+id} className="modal">
            <div className="modal-content">
                <div className="modal-close right"><i className="material-icons">close</i></div>
                <form onSubmit={handleSubmit}>   
                    <div className="row">
                        <span className="txt-title-card">REPORTAR USUARIO</span>  
                        <p className="txt-modal-inst">Ingresa un texto explicando los motivos de tu reporte hacia el usuario <InertiaLink href={route('perfil.public',id)}  style={{"color":"#134E39", "margin":"0px"}}>{nombre}</InertiaLink></p> 
                    
                        <div className="input-field col s12" style={{"padding":"0px"}}>
                            <textarea className="materialize-textarea text-area-modal" id="descripcion" value={values.descripcion} onChange={handleChange}></textarea>
                        </div>

                        <div className="info-txt-modal">Un administrador revisará tu reporte.</div>
                    
                        <div className="col s12" style={{"padding":"0px", "marginTop": "15px"}}> 
                            <button type="submit"  className="modal-close btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px","marginTop":"0px"}}>
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
