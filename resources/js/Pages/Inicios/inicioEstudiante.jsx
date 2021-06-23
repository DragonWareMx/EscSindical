import React, {useEffect, useState} from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import CursoActual from '../../components/cursos/CursoActual';
//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
// Hojas de estilos
import '../../styles/cursos.css'
import '../../styles/inicios.css'
import '/css/participantes.css'
import route from 'ziggy-js';

const inicioEstudiante = ({user, profesor, tags, participantes, entradas}) => {

    var i=0;

    const { auth } = usePage().props;

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
                <div className="col m12 l5">
                    <div className="card ">
                        <div className="card-content">
                            {/* TITULO CARD */}
                            <div className="row" style={{"marginBottom":"0px"}}>
                                <div className="col s12 txt-title-card">PARTICIPANTES</div>
                                <div className="col s12 txt-subtitle-ini">Compañeros de clase </div>
                                
                                {/* ITEM DE COMPAÑERO, solo se muestran 3*/}
                                
                                {participantes && participantes.users.length > 1 ?
                                    participantes.users.map((alumno, index)=>(
                                    <div key={index}>
                                        {i < 3 && alumno.id != auth.user.id &&
                                        <div key={i++} className="col s12 div-collection-item">
                                            <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' data-target={'dropdown-option-classmate'+index}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                            <ul id={'dropdown-option-classmate'+index} className='dropdown-content dropdown_LC'>
                                                <li><a className="dropdown-text" href={"mailto:"+alumno.email}><i className="material-icons">mail</i>Enviar mensaje</a></li>
                                                <li className="divider" tabIndex="-1"></li>
                                                <li><a className="dropdown-text modal-trigger" href="#modalReportar"><i className="material-icons">report_problem</i>Reportar</a></li>
                                            </ul>

                                            {/* Información del usuario */}
                                            <div className=" P_collection_item col s12 m11 l11 xl11 left" style={{"padding":"0px 0px 0px 0px"}}>
                                                <InertiaLink  href={route('perfil.public',alumno.id)}><img className="P_collection_image" width="50" height="50" src={"/storage/fotos_perfil/"+alumno.foto}></img></InertiaLink>
                                                <div>
                                                    <InertiaLink  href={route('perfil.public',alumno.id)} className="P_collection_title">{alumno.nombre} {alumno.apellido_p} {alumno.apellido_m}</InertiaLink>
                                                    <div className="P_collection_subtitle">Estudiante</div>
                                                </div>
                                            </div>    
                                        </div>
                                        }
                                    </div>
                                    ))
                                    :
                                    <><div className="txt-not-found col s12">NO TIENES COMPAÑEROS HASTA AHORA</div></>
                                }
                                {/* Link a la vista de participantes */}
                                <InertiaLink className="col s12 link-ver-mas" href={route('cursos.participantes', user.active_courses['0'].id)}>Ver más</InertiaLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12 m12 l7">
                    <div className="card ">
                        <div className="card-content">
                            {/* TITULO CARD */}
                            <div className="row" style={{"marginBottom":"0px"}}>
                                <div className="col s12 txt-title-card">PRÓXIMAS ACTIVIDADES</div>
                                <div className="col s12 txt-subtitle-ini">Lista de próximas asignaciones</div>
                                
                                <div className="txt-not-found col s12">NO TIENES NUEVAS ASIGNACIONES</div>
                                {/* Solo mostrar 3 registros */}
                                <div className="col s12">
                                    <table className="responsive-table table-activities highlight">
                                        <thead>
                                        <tr>
                                            <th>TIPO </th>
                                            <th>NOMBRE</th>
                                            <th>ESTATUS</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {entradas && entradas.length > 0 &&
                                            entradas.map((entrada , index)=>(
                                            <tr>
                                                <td>{entrada.tipo}</td>
                                                <td>{entrada.titulo}</td>
                                                <td className="status-activity status-cerrado">{}</td>
                                            </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                {/* Link a la mochila */}
                                <InertiaLink className="col s12 link-ver-mas" href={route('cursos.mochila',user.active_courses['0'])}>Ver más</InertiaLink>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

inicioEstudiante.layout = page => <Layout children={page} title="Inicio" pageTitle="INICIO"/>

export default inicioEstudiante