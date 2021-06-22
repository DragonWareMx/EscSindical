import React, {useEffect} from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import CursoActual from '../../components/cursos/CursoActual';
//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
// Hojas de estilos
import '../../styles/cursos.css'
import '../../styles/inicios.css'
import '/css/participantes.css'

const inicioEstudiante = ({user, profesor, tags}) => {

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    useEffect(() => {
        initializeMaterialize();
      }, [])
  
        return (
            <>
            <Alertas />
            <CursoActual 
            cursos = {user.active_courses['0']}
            profesor = {profesor}
            tags = {tags}
            />

            <div className="row">                
                <div className="col s5">
                    <div className="card ">
                        <div className="card-content">
                            {/* TITULO CARD */}
                            <div className="row" style={{"marginBottom":"0px"}}>
                                <div className="col s12 txt-title-card">PARTICIPANTES</div>
                                <div className="col s12 txt-subtitle-ini">Compañeros de clase </div>

                                <div className="txt-not-found col s12">NO TIENES COMPAÑEROS HASTA AHORA</div>
                                
                                {/* ITEM DE COMPAÑERO, solo se muestran 3*/}
                                <div className="col s12 div-collection-item">
                                    {/* btn de opciones */}
                                    {/* <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target={'dropdown-option-classmate'+index}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div> */}
                                    <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target='dropdown-option-classmate'><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                    {/* <ul id={'dropdown-option-classmate'+index} className='dropdown-content dropdown_LC'> */}
                                    <ul id="dropdown-option-classmate" className='dropdown-content dropdown_LC'>
                                        {/* <li><a className="dropdown-text" href={"mailto:"+user.email}><i className="material-icons">mail</i>Enviar mensaje</a></li> */}
                                        <li><a className="dropdown-text" href="#!"><i className="material-icons">mail</i>Enviar mensaje</a></li>
                                        <li className="divider" tabIndex="-1"></li>
                                        <li><a className="dropdown-text modal-trigger" href="#modalReportar"><i className="material-icons">report_problem</i>Reportar</a></li>
                                    </ul>

                                    {/* Información del usuario */}
                                    <div className=" P_collection_item col s12 m11 l11 xl11 left" style={{"padding":"0px 0px 0px 0px"}}>
                                        {/* <InertiaLink  href={route('perfil.public',user.id)}><img className="P_collection_image" width="50" height="50" src={"/storage/fotos_perfil/"+user.foto}></img></InertiaLink> */}
                                        <InertiaLink  href="#!"><img className="P_collection_image" width="30" height="30" src="/img/avatar1.png"></img></InertiaLink>
                                        <div>
                                            {/* <InertiaLink  href={route('perfil.public',user.id)} className="P_collection_title">{user.nombre} {user.apellido_p} {user.apellido_m}</InertiaLink> */}
                                            <InertiaLink  href="#!" className="P_collection_title" style={{"fontSize":"12px"}}>José Agustín Aguilar Solórzano</InertiaLink>
                                            <div className="P_collection_subtitle">Estudiante</div>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEM DE COMPAÑERO */}
                                <div className="col s12 div-collection-item">
                                    {/* btn de opciones */}
                                    {/* <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target={'dropdown-option-classmate'+index}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div> */}
                                    <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target='dropdown-option-classmate'><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                    {/* <ul id={'dropdown-option-classmate'+index} className='dropdown-content dropdown_LC'> */}
                                    <ul id="dropdown-option-classmate" className='dropdown-content dropdown_LC'>
                                        {/* <li><a className="dropdown-text" href={"mailto:"+user.email}><i className="material-icons">mail</i>Enviar mensaje</a></li> */}
                                        <li><a className="dropdown-text" href="#!"><i className="material-icons">mail</i>Enviar mensaje</a></li>
                                        <li className="divider" tabIndex="-1"></li>
                                        <li><a className="dropdown-text modal-trigger" href="#modalReportar"><i className="material-icons">report_problem</i>Reportar</a></li>
                                    </ul>

                                    {/* Información del usuario */}
                                    <div className=" P_collection_item col s12 m11 l11 xl11 left" style={{"padding":"0px 0px 0px 0px"}}>
                                        {/* <InertiaLink  href={route('perfil.public',user.id)}><img className="P_collection_image" width="50" height="50" src={"/storage/fotos_perfil/"+user.foto}></img></InertiaLink> */}
                                        <InertiaLink  href="#!"><img className="P_collection_image" width="30" height="30" src="/img/avatar1.png"></img></InertiaLink>
                                        <div>
                                            {/* <InertiaLink  href={route('perfil.public',user.id)} className="P_collection_title">{user.nombre} {user.apellido_p} {user.apellido_m}</InertiaLink> */}
                                            <InertiaLink  href="#!" className="P_collection_title" style={{"fontSize":"12px"}}>José Agustín Aguilar Solórzano</InertiaLink>
                                            <div className="P_collection_subtitle">Estudiante</div>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEM DE COMPAÑERO */}
                                <div className="col s12 div-collection-item">
                                    {/* btn de opciones */}
                                    {/* <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target={'dropdown-option-classmate'+index}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div> */}
                                    <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target='dropdown-option-classmate'><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                    {/* <ul id={'dropdown-option-classmate'+index} className='dropdown-content dropdown_LC'> */}
                                    <ul id="dropdown-option-classmate" className='dropdown-content dropdown_LC'>
                                        {/* <li><a className="dropdown-text" href={"mailto:"+user.email}><i className="material-icons">mail</i>Enviar mensaje</a></li> */}
                                        <li><a className="dropdown-text" href="#!"><i className="material-icons">mail</i>Enviar mensaje</a></li>
                                        <li className="divider" tabIndex="-1"></li>
                                        <li><a className="dropdown-text modal-trigger" href="#modalReportar"><i className="material-icons">report_problem</i>Reportar</a></li>
                                    </ul>

                                    {/* Información del usuario */}
                                    <div className=" P_collection_item col s12 m11 l11 xl11 left" style={{"padding":"0px 0px 0px 0px"}}>
                                        {/* <InertiaLink  href={route('perfil.public',user.id)}><img className="P_collection_image" width="50" height="50" src={"/storage/fotos_perfil/"+user.foto}></img></InertiaLink> */}
                                        <InertiaLink  href="#!"><img className="P_collection_image" width="30" height="30" src="/img/avatar1.png"></img></InertiaLink>
                                        <div>
                                            {/* <InertiaLink  href={route('perfil.public',user.id)} className="P_collection_title">{user.nombre} {user.apellido_p} {user.apellido_m}</InertiaLink> */}
                                            <InertiaLink  href="#!" className="P_collection_title" style={{"fontSize":"12px"}}>José Agustín Aguilar Solórzano</InertiaLink>
                                            <div className="P_collection_subtitle">Estudiante</div>
                                        </div>
                                    </div>
                                </div>

                                {/* <InertiaLink className="col s12 link-ver-mas" href={route('cursos.participantes', curso.id)}>Ver más</InertiaLink> */}
                                <InertiaLink className="col s12 link-ver-mas" href="#!">Ver más</InertiaLink>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s7">
                    <div className="card ">
                        <div className="card-content">
                            {/* TITULO CARD */}
                            <div className="row" style={{"marginBottom":"0px"}}>
                                <div className="col s12 txt-title-card">PRÓXIMAS ACTIVIDADES</div>
                                <div className="col s12 txt-subtitle-ini">Lista de próximas asignaciones</div>
                                
                                <div className="txt-not-found col s12">NO TIENES NUEVAS ASIGNACIONES</div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

inicioEstudiante.layout = page => <Layout children={page} title="Inicio" pageTitle="INICIO"/>

export default inicioEstudiante