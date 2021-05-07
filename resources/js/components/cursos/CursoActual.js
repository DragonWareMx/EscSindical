import React from 'react'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

//import circlesImg from '../images/circles.png'
//import emptyImg from '../images/empty.png'
import '../../styles/cursos.css'

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
                                    <span className="txt-title-card">CURSOS ACTUALES
                                        <a className="dropdown-trigger"  data-target='dropdown1'>
                                        <i className="material-icons right">more_vert</i>
                                        </a>
                                    </span>
                                </div>
                                <div id='dropdown1' class='dropdown-content' style={{"width":"max-content !important"}}>
                                    <a href="#!">Solicitar baja del curso<i className="material-icons">report_proble</i></a>
                                </div>

                                {/* CONTENIDO DEL CARD */}
                                    {/* Imagen del curso */}
                                <div className="col s10 m3 l2">
                                    <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className="img-course" style={{"width":"100%"}} /></a>
                                </div>
                                <div className="col s12 m9 l10">
                                    <div className="txt-course-title"><a href="#!" className="title-course-hover">{cursos['0'].nombre}</a></div>
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
            </div>
            
        )
    }

