import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';

//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
import ModalRestaurar from '../../components/common/ModalRestaurar';

// Hojas de estilos
import '../../styles/usersStyle.css'
import '/css/participantes.css'
import '/css/modulos.css'
import '/css/reporte.css'




const VerSolicitud = ({solicitud, tipo, curso, relacion}) => {
        
        function handleSubmit(e) {
            const a = ({respuesta: e.target.id});
            e.preventDefault(),
            tipo == 'delete' ?
            Inertia.post('/solicitudes/bajaCurso/'+solicitud.id, a):
            Inertia.post('/solicitudes/bajaAlumno/'+solicitud.id, a)
        }

        function transformaFecha(fecha) {
            let dob
            if(fecha)
                dob = new Date(fecha.replace(/-/g, '\/').replace(/T.+/, ''));
            else
                dob = new Date()
            const monthNames = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
            const day = dob.getDate();
            const monthIndex = dob.getMonth();
            const year = dob.getFullYear();
            let hour = ("0" + dob.getHours()).slice(-2);
            const minutes = ("0" + dob.getMinutes()).slice(-2);
            let formato
    
            if(hour > 12){
                hour = hour - 12
                formato = "pm"
            }
            else
                formato = "am"
    
            return `${day} de ${monthNames[monthIndex]} de ${year} a las ${hour}:${minutes} ${formato}`;
        }

        return (
            <>

            <div className="row contenedor">
                <div className="col contenedor s12">
                    <div className="card darken-1 cardUsers">
                        <div className="card-content">
                            <span className="card-title" style={{"display":"flex", "alignItems":"center"}}><InertiaLink  href={tipo == 'delete' ? route('solicitudes') : route('solicitudes.alumno')}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>Solicitudes del sistema</span>
                            <Alertas />
                            <div className="row">
                                {!solicitud.course && tipo == 'delete' &&
                                <div className="errores">
                                    <ul>
                                        <li className="alert_message">
                                            <div className="col s11">Este curso ha sido eliminado</div>
                                            <button data-target="modalRestaurar" type="button" className="col s3 m2 center-align modal-trigger" style={{ "border": "none", "backgroundColor": "transparent", "color": "#515B60", "cursor": "pointer", marginLeft: "3%", marginRight: "auto" }}>Restaurar</button>
                                        </li>
                                    </ul>  
                                </div>
                                }
                                {(!relacion && tipo == 'drop') &&
                                <div className="errores">
                                    <ul>
                                        <li className="alert_message">
                                            <div className="col s11">Este alumno fue dado de baja del curso</div>
                                            <button data-target="modalRestaurar" type="button" className="col s3 m2 center-align modal-trigger" style={{ "border": "none", "backgroundColor": "transparent", "color": "#515B60", "cursor": "pointer", marginLeft: "3%", marginRight: "auto" }}>Restaurar</button>
                                        </li>
                                    </ul>  
                                </div>
                                }
                                <div className="col s12" style={{"padding":"0px 0px 0px 0px"}}>
                                    <div className="col s12 m6"  style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">ID DE SOLICITUD</div>
                                        <div className="col s12 txt-report">#{solicitud.id}</div>
                                    </div>

                                    <div className="col s12 m6" style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">FECHA DE SOLICITUD</div>
                                        <div className="col s12 txt-report">{solicitud.created_at ? transformaFecha(solicitud.created_at) : "Sin fecha"}</div>
                                    </div>
                                </div>

                                <div className="col s12" style={{"padding":"0px 0px 0px 0px"}}>
                                    <div className="col s12 m6" style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">TIPO DE SOLICITUD</div>
                                        { tipo == 'delete' ?
                                            <div className="col s12 txt-report">{solicitud.course? "Solicitud de eliminación del curso "+solicitud.course.nombre : "Solicitud de eliminación del curso "+curso.nombre }</div>
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

                                {solicitud.status == 'En espera' &&
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
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            { tipo == 'delete' ?
                <ModalRestaurar url={route('cursos.restore', !curso ? 1 : curso.id )} nombre={curso.nombre} tipo="curso" />
            :
                <ModalRestaurar url={route('alumnos.restore', solicitud.id )} nombre={solicitud.user.nombre} tipo="alumno" />
            }
            
        </>)
}

VerSolicitud.layout = page => <Layout children={page} title="Solicitudes" pageTitle="SOLICITUDES"/>

export default  VerSolicitud