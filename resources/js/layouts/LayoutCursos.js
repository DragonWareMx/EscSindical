import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import '/css/layoutCursos.css'
import route from 'ziggy-js'
import { InertiaLink } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import '../styles/cursos.css'
import Alertas from '../components/common/Alertas'; 

function initializeMat() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}

function isUrl(...urls) {
    let currentUrl = window.location.href.substr(1)
    if (urls[0] === '') {
      return currentUrl === ''
    }
    return urls.filter(url => currentUrl.startsWith(url)).length
  }

// function active(tab){
//     var actual=window.location.href
//     if(actual.includes(tab))
//         return 'LC_a active'
//     else
//         return 'LC_a'
// }

// function active_active(id){
//     var tabs = document.getElementsByClassName('LC_a')
//     Array.from(tabs).forEach((tab)=>{
//         tab.classList.remove('active')
//     })
//     var selected = document.getElementById(id)
//     selected.classList.add('active')
// }


const LayoutCursos = ({children}) => {   

    const {curso} =usePage().props

    useEffect(() => {
        initializeMat();
    }, [])

    return (
        <>  
        <Alertas />
            <div className="row contenedor">
               <div className="card darken-1" style={{"padding":"5px 25px"}}>
                   <div className="card-content row valign-wrapper" style={{"padding":"10px","marginBottom":"0px"}}>
                        <div className="col s11 valign-wrapper LC_title">Programación orientada a objetos&nbsp; <i className="material-icons tooltipped" data-position="top" data-tooltip="Curso con valor curricular">verified</i></div>
                        <div className="col s1 LC_more"><a className='dropdown-trigger' href='#' data-target='dropdown_LC'><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                        <ul id='dropdown_LC' className='dropdown-content'>
                            <li><InertiaLink className="dropdown-text" href="#"><i className="material-icons">error_outline</i>Solicitar baja del curso</InertiaLink></li>
                            <li className="divider" tabIndex="-1"></li>
                            {/* Opciones exclusivas del ponente */}
                            <li><InertiaLink className="dropdown-text" href={route('cursos.edit',1)}><i className="material-icons">edit</i>Editar curso</InertiaLink></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a className="dropdown-text" href="#!"><i className="material-icons">file_download</i>Descargar reporte del curso</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a className="dropdown-text modal-trigger" href="#modalSolicitud"><i className="material-icons">error_outline</i>Solicitar eliminación del curso</a></li>
                        </ul>
                   </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs LC">
                                <li className="tab LC_tab">
                                    <InertiaLink id="tab_informacion" href={route('cursos.informacion', curso.id)}  className={false ? 'LC_a active' : 'LC_a'}  target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">school</i>
                                        <div className="col s9">Información</div>
                                    </InertiaLink>
                                </li>
                                <li className="tab">
                                    <InertiaLink id="tab_modulos" href={route('cursos.modulos', curso.id)} className={true  ? 'LC_a active' : 'LC_a'} target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">book</i>
                                        <div className="col s9">Módulos</div>
                                    </InertiaLink>
                                </li>
                                <li className="tab">
                                    <InertiaLink id="tab_mochila" href={route('cursos.mochila', curso.id)} className="LC_a" target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">backpack</i>
                                        <div className="col s9">Mochila</div>
                                    </InertiaLink>
                                </li>
                                <li className="tab">
                                    <InertiaLink id="tab_participantes" href={route('cursos.participantes', curso.id)} className="LC_a" target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">people</i>
                                        <div className="col s9">Participantes</div>
                                    </InertiaLink>
                                </li>
                                <li className="tab">
                                    <InertiaLink id="tab_estadisticas" href="" className="LC_a" target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">bar_chart</i>
                                        <div className="col s9">Estadísticas</div>
                                    </InertiaLink>
                                </li>
                            </ul>
                        </div>
                        {children}
                    </div> 
               </div>
            </div>
        </>
    )
}

// LayoutCursos.layout = page => <Layout children={page} title="Escuela Sindical - Curso" pageTitle="MIS CURSOS" />

export default LayoutCursos