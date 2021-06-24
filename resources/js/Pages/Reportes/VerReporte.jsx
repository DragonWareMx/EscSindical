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



const VerReporte = ({reporte, reported, reporter}) => {
  
    function transformaFecha(fecha) {
        const dob = new Date(fecha);
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
                            <span className="card-title" style={{"display":"flex", "alignItems":"center"}}><InertiaLink  href={route('reportes')}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>Reportes de usuarios</span>
                            
                            <div className="row">

                                <div className="col s12 div-data-reporte">
                                    <div style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">ID DE REPORTE</div>
                                        <div className="col s12 txt-report">{reporte.id}</div>
                                    </div>

                                    <div style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">FECHA DE REPORTE</div>
                                        <div className="col s12 txt-report">{transformaFecha(reporte.created_at)}</div>
                                    </div>
                                </div>

                                <div className="col s12" style={{"marginBottom":"20px"}}>
                                    <div className="col s12 txt-report" style={{"display":"flex", "flexWrap":"wrap"}}>
                                        El usuario &nbsp;<InertiaLink href={route('perfil.public',reporter.id)}>{reporter.nombre}&nbsp;{reporter.apellido_p}&nbsp;{reporter.apellido_m}</InertiaLink>&nbsp;<div className="div-rol-reporte">({reporter.name})&nbsp;</div> reportó al usuario &nbsp;<InertiaLink href={route('perfil.public',reported.id)}>{reported.nombre}&nbsp;{reported.apellido_p}&nbsp;{reported.apellido_m}</InertiaLink>&nbsp; <div className="div-rol-reporte">({reported.name})&nbsp;</div> con el siguiente motivo
                                    </div>
                                </div>

                                <div className="col s12" style={{"marginBottom":"25px"}}>   
                                    <div className="col s12 txt-title-report">MOTIVO DEL REPORTE REPORTE</div>
                                    <div className="col s12 txt-report">{reporte.comentario}</div>
                                </div>


                                <div className="col s12 ">
                                    <form action="#" className="col s12">
                                        <p className="input-check-reporte">
                                        <label>
                                            <input type="checkbox" />
                                            <span className="input-check-reporte-span">Marcar como leído</span>
                                        </label>
                                        </p>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

VerReporte.layout = page => <Layout children={page} title="Reportes" pageTitle="REPORTES"/>

export default  VerReporte