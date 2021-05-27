import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink } from '@inertiajs/inertia-react';

import '/css/participantes.css'
import '/css/modulos.css'

const Participantes = ({curso}) => {
  return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>PARTICIPANTES</div>
            <div className="col s12 m3 l2 xl2 right" style={{"textAlign":"right"}}><InertiaLink href={route('cursos.solicitudes', curso.id)} className="link-solicitudes">Solicitudes<i class="material-icons tiny" style={{"marginLeft":"10px","marginRight":"5px"}}>mail</i>3</InertiaLink></div>
            <div className="col s12 P_sub" style={{marginTop:"15px"}}>Ponente</div>
            
            {/* Row de ponente */}
            <div className="col s12 div-collection-item ">
                {/* btn de opciones, solo aparece para los estudiantes*/}
                <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target='dropdown-option-student'><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                <ul id='dropdown-option-student' className='dropdown-content dropdown_LC'>
                    {/* Opciones solo para el estudiante */}
                    <li><a className="dropdown-text modal-trigger" href="mailto: correo@ejemplo.com"><i class="material-icons">mail</i>Enviar mensaje</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><a className="dropdown-text modal-trigger" href="#modalReportar"><i class="material-icons">report_problem</i>Reportar</a></li>
                </ul>
                {/* Información del usuario */}
                <div className=" P_collection_item col s12 m11 l11 xl11 left">
                    <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                    <div>
                        <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                        <div className="P_collection_subtitle">Ponente</div>
                    </div>
                </div>
            </div>

            <div className="col s12 P_sub" style={{marginTop:"15px"}}>Compañeros de clase</div>
            
            {/* Row de estudiante */}
            <div className="col s12 div-collection-item ">
                {/* btn de opciones */}
                <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target='dropdown-option-student'><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                <ul id='dropdown-option-student' className='dropdown-content dropdown_LC'>
                    <li><a className="dropdown-text modal-trigger" href="mailto: correo@ejemplo.com"><i class="material-icons">mail</i>Enviar mensaje</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    {/* Opción exclusiva para el ponente */}
                    <li><a className="dropdown-text modal-trigger" href="#modalEliminar"><i class="material-icons">error_outline</i>Dar de baja del curso</a></li>
                    
                    <li className="divider" tabIndex="-1"></li>
                    <li><a className="dropdown-text modal-trigger" href="#modalReportar"><i class="material-icons">report_problem</i>Reportar</a></li>
                </ul>
                {/* Información del usuario */}
                <div className=" P_collection_item col s12 m11 l11 xl11 left">
                    <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://pm1.narvii.com/6417/9b21a494d74d84ff21064f2fa0b72d294bd7a96f_hq.jpg"></img></InertiaLink>
                    <div>
                        <InertiaLink  href="#!" className="P_collection_title">Óscar André Huerta García</InertiaLink>
                        <div className="P_collection_subtitle">Estudiante</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

Participantes.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="PARTICIPANTES">
    <LayoutCursos children={page} />
  </Layout>
)

export default Participantes