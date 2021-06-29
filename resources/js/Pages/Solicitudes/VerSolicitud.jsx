import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
// Hojas de estilos
import '../../styles/usersStyle.css'
import '/css/participantes.css'
import '/css/modulos.css'
import '/css/reporte.css'
import Solicitudes from './Solicitudes';



const VerSolicitud = ({solicitud, tipo}) => {
        
        function handleSubmit(e) {
            const a = ({respuesta: e.target.id});
            e.preventDefault(),
            tipo == 'delete' ?
            Inertia.post('/solicitudes/bajaCurso/'+solicitud.id, a):
            Inertia.post('/solicitudes/bajaAlumno/'+solicitud.id, a)
        }

        return (
            <>

            <div className="row contenedor">
                <div className="col contenedor s12">
                    <div className="card darken-1 cardUsers">
                        <div className="card-content">
                            <span className="card-title" style={{"display":"flex", "alignItems":"center"}}><InertiaLink  href={route('solicitudes')}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>Solicitudes del sistema</span>
                            
                            <div className="row">

                                <div className="col s12" style={{"padding":"0px 0px 0px 0px"}}>
                                    <div className="col s12 m6"  style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">ID DE SOLICITUD</div>
                                        <div className="col s12 txt-report">#{solicitud.id}</div>
                                    </div>

                                    <div className="col s12 m6" style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">FECHA DE SOLICITUD</div>
                                        <div className="col s12 txt-report">{solicitud.created_at}</div>
                                    </div>
                                </div>

                                <div className="col s12" style={{"padding":"0px 0px 0px 0px"}}>
                                    <div className="col s12 m6" style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">TIPO DE SOLICITUD</div>
                                        { tipo == 'delete' ?
                                            <div className="col s12 txt-report">Solicitud de eliminación del curso {solicitud.course.nombre}</div>
                                        :
                                            <div className="col s12 txt-report">Solicitud de baja del curso</div>
                                        }
                                        
                                    </div>

                                    <div className="col s12 m6" style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">ESTATUS</div>
                                        <div className="col s12 txt-report">{solicitud.status}</div>
                                    </div>
                                </div>

                                <div className="col s12" style={{"marginBottom":"25px"}}>   
                                    <div className="col s12 txt-title-report">COMENTARIOS</div>
                                    <div className="col s12 txt-report">{ tipo == 'delete' ?
                                                                            solicitud.comentario
                                                                        :
                                                                            solicitud.descripcion}</div>
                                </div>


                                <div className="col s12  right">
                                <form onSubmit={handleSubmit} id="true">
                                    <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px", "backgroundColor":"#108058", "marginTop":"10px"}}>
                                        Aprobar
                                        <i className="material-icons right">task_alt</i>
                                    </button>
                                </form>    
                                <form onSubmit={handleSubmit} id="false">
                                    <button type="submit" className="btn-rejacted-soli btn-primary btn waves-effect waves-teal btn-login right  no-uppercase" style={{"height": "40px","backgroundColor":"#D3766A","marginRight":"30px", "marginTop":"10px"}}>
                                        Rechazar
                                        <i className="material-icons right">highlight_off</i>
                                    </button>
                                </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

VerSolicitud.layout = page => <Layout children={page} title="Solicitudes" pageTitle="SOLICITUDES"/>

export default  VerSolicitud