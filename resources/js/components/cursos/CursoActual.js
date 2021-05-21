import React from 'react'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { InertiaLink } from '@inertiajs/inertia-react'
//import circlesImg from '../images/circles.png'
//import emptyImg from '../images/empty.png'
import '../../styles/cursos.css'

function initializeDROP() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options;
    var instances = M.Dropdown.init(elems, options);

    var elems1 = document.querySelectorAll('.modal');
    var instances1 = M.Modal.init(elems);
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
                                    <div className="col s1"><a className='dropdown-trigger' href='#' data-target='dropdown-option-student'><i className="material-icons" style={{"color":"#727272", "font-size":"22px"}}>more_vert</i></a></div>
                                    <ul id='dropdown-option-student' className='dropdown-content dropdown_LC'>
                                        <li><span><a className="dropdown-text modal-trigger" href="#modalSolicitud"><i class="material-icons">error_outline</i>Solicitar baja del curso</a></span></li>
                                    </ul>
                                </div>

                                {/* CONTENIDO DEL CARD */}
                                    {/* Imagen del curso */}
                                <div className="col s10 m3 l2">
                                    <a href="#!"><img src="storage/imagenes_curso/curso1.png" className="img-course" style={{"width":"100%"}} /></a>
                                </div>
                                <div className="col s12 m9 l10">
                                    <div className="txt-course-title"><InertiaLink href={route('cursos.informacion',1)} className="title-course-hover">{cursos['0'].nombre}</InertiaLink></div>
                                    <div className="" style={{"display": "flex", "alignItems": "center", "marginTop": "10px"}}>
                                        <div style={{"width": "max-content", "marginRight": "10px"}}><img src="images/profile.jpg" style={{"width": "25px", "height": "25px", "borderRadius": "50%", "objectFit": "cover"}} /></div>
                                        <a className="txt-teacher-name" style={{"width": "max-content"}} href="#!">{profesor.nombre} {profesor.apellido_p} {profesor.apellido_m}</a>
                                    </div>
                                    {/* Container tags */}
                                    <div className="container-tags">
                                        {tags.map (tag =>
                                            <a className="div-tag" href="#!">
                                                {tag.nombre}&nbsp;<i class="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                            </a>
                                            )
                                        }
                                    </div>
                                    <div className="txt-presentation">Presentación del curso</div>
                                    <div className="txt-presentation-content">
                                        {cursos['0'].descripcion}                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>

                <div id="modalSolicitud" className="modal">
                    <div className="modal-content">
                        <div className="modal-close right"><i className="material-icons">close</i></div>
                        <div className="row">
                            <span className="txt-title-card">SOLICITAR BAJA DEL CURSO</span>  
                            <p class="txt-modal-inst">Ingresa un texto explicando los motivos de tu solicitud de baja para el curso <p class="" style={{"color":"#134E39", "margin":"0px"}}>Nombre completo del curso</p></p> 
                        
                            <div className="input-field col s12" style={{"padding":"0px"}}>
                                <textarea class="materialize-textarea text-area-modal" id="descripcion"></textarea>
                            </div>

                            <div class="info-txt-modal">Un administrador revisará tu solicitud y se te notificará su aprobación o rechazo.</div>
                        
                            <div class="col s12" style={{"padding":"0px", "marginTop": "15px"}}> 
                                <div className="col s12 right-align" style={{ "padding": "0%" }}>
                                    <a class="waves-effect waves-light btn" style={{"textTransform": "initial" }}><i class="material-icons right" style={{ "font-size": "18px"}}>send</i>Enviar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            
            
        )
    }

