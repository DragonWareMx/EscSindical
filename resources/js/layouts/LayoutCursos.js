import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import '/css/layoutCursos.css'
import route from 'ziggy-js'
import { InertiaLink } from '@inertiajs/inertia-react'

function initializeMat() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
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


const LayoutCursos = ({children, id}) => {   
    useEffect(() => {
        initializeMat();
    }, [])

    return (
        <>
            <div className="row contenedor">
               <div className="card darken-1" style={{"padding":"5px 25px"}}>
                   <div className="card-content row valign-wrapper" style={{"padding":"10px","marginBottom":"0px"}}>
                        <div className="col s11 valign-wrapper LC_title">Programación Lógica y Funcional (Grupo de las 8 am) &nbsp; <i className="material-icons">verified</i></div>
                        <div className="col s1 LC_more"><a className='dropdown-trigger' href='#' data-target='dropdown_LC'><i className="small material-icons" style={{"color":"#727272"}}>more_vert</i></a></div>
                        <ul id='dropdown_LC' className='dropdown-content'>
                            <li><span><a className="dropdown-text1" href="#!">Descargar reporte del curso</a></span></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><span><a className="dropdown-text1" href="#!">Solicitar eliminación del curso</a></span></li>
                        </ul>
                   </div>
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs LC">
                                <li className="tab LC_tab">
                                    <InertiaLink id="tab_informacion" href={route('cursos.informacion', id)}  className={false ? 'LC_a active' : 'LC_a'}  target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">school</i>
                                        <div className="col s9">Información</div>
                                    </InertiaLink>
                                </li>
                                <li className="tab">
                                    <InertiaLink id="tab_modulos" href={route('cursos.modulos', id)} className={true  ? 'LC_a active' : 'LC_a'} target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">book</i>
                                        <div className="col s9">Módulos</div>
                                    </InertiaLink>
                                </li>
                                <li className="tab">
                                    <InertiaLink id="tab_mochila" href="" className="LC_a" target="_self">
                                        <i className="material-icons col s3 LC_tab_icons">backpack</i>
                                        <div className="col s9">Mochila</div>
                                    </InertiaLink>
                                </li>
                                <li className="tab">
                                    <InertiaLink id="tab_participantes" href="" className="LC_a" target="_self">
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