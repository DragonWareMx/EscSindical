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



const VerReporte = () => {
  

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
                                        <div className="col s12 txt-report">12458</div>
                                    </div>

                                    <div style={{"marginBottom":"20px"}}>
                                        <div className="col s12 txt-title-report">FECHA DE REPORTE</div>
                                        <div className="col s12 txt-report">00/00/2021 00:00</div>
                                    </div>
                                </div>

                                <div className="col s12" style={{"marginBottom":"20px"}}>
                                    <div className="col s12 txt-report">
                                        El usuario <a>Dulce Gabriela Marìn Rendón</a> (ESTUDIANTE) reportó al usuario <a>Oscar Andre Huerta García</a> (PONENTE) con el siguiente motivo
                                    </div>
                                </div>

                                <div className="col s12" style={{"marginBottom":"25px"}}>   
                                    <div className="col s12 txt-title-report">MOTIVO DEL REPORTE REPORTE</div>
                                    <div className="col s12 txt-report">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod</div>
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