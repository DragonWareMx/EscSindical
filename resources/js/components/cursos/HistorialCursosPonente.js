import { map } from 'jquery';
import React from 'react'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import route from 'ziggy-js';
import '../../styles/cursos.css'

function initializeDROP() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options;
    var instances = M.Dropdown.init(elems, ({inDuration: 300,
        outDuration: 225,
        constrainWidth: false,
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        stopPropogation: true})
    );
    var elems2 = document.querySelectorAll('.collapsible');
    var instances2 = M.Collapsible.init(elems2, options);
}


export default function HistorialCursosPonente({finishedCourses}) {
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
                                    <span className="txt-title-card">HISTORIAL DE CURSOS
                                    </span>
                                </div>

                                {/* CONTENIDO DEL CARD */}
                                {/* DIV CURSO */}

                                <div className="row">
                                    {finishedCourses.map ((course) => 
                                    <div key={course.id} className="col s12 m6 l6 xl6">
                                        <div className="card">
                                            <div className="card-content">
                                                <a className="dropdown-trigger"  data-target='download-report'>
                                                    <i className="material-icons right">more_vert</i>
                                                </a>
                                                {/* DROPDOWN CON OPCIONES */}
                                                <ul id='download-report' className='dropdown-content'>
                                                    <li className="options-course-dropdown"><a href="#!"><i className="material-icons tiny" style={{"marginRight":"0px"}}>file_download</i>Descargar reporte</a></li>
                                                </ul>

                                                <div className="txt-title-course-history">
                                                    <a href={route('cursos.informacion',course.id)} className="a-mini-course-hover">{course.nombre}</a>
                                                </div>
                                                <div className="row" style={{"marginTop":"15px", "marginBottom":"5px"}}>
                                                    <div className="col s5">
                                                        <a href="#!"><img src={course.images && course.images.length>0 && "/storage/imagenes_curso/"+course.images['0'].imagen} className="img-course" style={{"width":"100%"}} /></a>
                                                    </div>  
                                                    <div className="col s12 l7 m7 xl7">

                                                        <div className="txt-video-course">
                                                            <i className="material-icons tiny">people
                                                            </i>
                                                            <p style={{"marginLeft": "5px", "color": "#585858 !important"}}>{course.users.length}</p>
                                                        </div>

                                                        <div className="txt-grade-course" style={{"fontSize":"11px", "marginTop":"5px"}}>Calificación grupal: 100</div>
                                                        <div className="txt-grade-course" style={{"fontSize":"11px", "marginTop":"3px"}}>Porcentaje de aprobación</div>
                                                        {/* DIV progress bar del curso */}
                                                        <div className="row" style={{"display":"flex", "alignItems": "center", "marginBottom": "0px"}}>
                                                            <div className="col s9">
                                                                <div className="progress" style={{"margin": "0px"}}>
                                                                    <div className="determinate" style={{"width": "85%"}}></div>
                                                                </div>
                                                            </div>
                                                            <div className="col s3">
                                                                <div className="txt-progress-course">85%</div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Tags del curso */}
                                                        
                                                        <div className="container-tags">
                                                            {course.tags.map((tag) =>
                                                            <a key={tag.id} className="div-tag" href="#!">
                                                            {tag.nombre}&nbsp;<i className="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                                            </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="right date-course-history">{course.fecha_inicio} - {course.fecha_final}</div>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

