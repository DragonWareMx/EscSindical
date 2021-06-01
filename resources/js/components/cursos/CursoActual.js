import React from 'react'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { InertiaLink } from '@inertiajs/inertia-react'
//import circlesImg from '../images/circles.png'
//import emptyImg from '../images/empty.png'
import '../../styles/cursos.css'
import route from 'ziggy-js'
import ModalSolicitudBaja from '../common/ModalSolicitudBaja.jsx'

function initializeDROP() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options;
    var instances = M.Dropdown.init(elems, options);
}


export default function CursoActual({cursos, profesor, tags}) {
    useEffect(() => {
        initializeDROP();
    }, [])
        return (
            <div className="row">                
                <div className="col s12">
                    <div className="card ">
                        <div className="card-content">
                            {/* TITULO CARD */}
                            <div className="row" style={{"marginBottom":"0px"}}>
                                <div className="col s12" style={{ "marginBottom": "10px"}}>
                                    <div className="col s11 txt-title-card">CURSOS ACTUALES</div>
                                    <div className="col s1"><a className='dropdown-trigger' href='#' data-target='dropdown-option-student'><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                    <ul id='dropdown-option-student' className='dropdown-content dropdown_LC'>
                                        <li><a className="dropdown-text modal-trigger" data-target="modalSolicitudBaja"><i className="material-icons">error_outline</i>Solicitar baja del curso</a></li>
                                    </ul>
                                </div>

                                {/* CONTENIDO DEL CARD */}
                                    {/* Imagen del curso */}
                                <div className="col s10 m3 l2">
                                    <a href="#!"><img src={cursos.images && cursos.images.length>0 && "/storage/imagenes_curso/"+cursos.images['0'].imagen} className="img-course" style={{"width":"100%"}} /></a>
                                </div>
                                <div className="col s12 m9 l10">
                                    <div className="txt-course-title"><a href={route('cursos.informacion',cursos.id)} className="title-course-hover">{cursos.nombre}</a></div>
                                    <div className="" style={{"display": "flex", "alignItems": "center", "marginTop": "10px"}}>
                                        <div style={{"width": "max-content", "marginRight": "10px"}}><img src={"storage/fotos_perfil/"+profesor.foto} style={{"width": "25px", "height": "25px", "borderRadius": "50%", "objectFit": "cover"}} /></div>
                                        <a className="txt-teacher-name" style={{"width": "max-content"}} href={route('perfil.public',profesor.id)}>{profesor.nombre} {profesor.apellido_p} {profesor.apellido_m}</a>
                                    </div>
                                    {/* Container tags */}
                                    <div className="container-tags">
                                        {tags.map (tag =>
                                            <a key={tag.id} className="div-tag" href="#!">
                                                {tag.nombre}&nbsp;<i className="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                            </a>
                                            )
                                        }
                                    </div>
                                    <div className="txt-presentation">Presentación del curso</div>
                                    <div className="txt-presentation-content">
                                        {cursos.descripcion}                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
                <ModalSolicitudBaja curso = {cursos} url = {'/cursos/deleteRequest/'+cursos.id}/>
            </div>
        )
    }

