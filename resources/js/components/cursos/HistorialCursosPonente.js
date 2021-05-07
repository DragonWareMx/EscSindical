import React from 'react'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import '../../styles/cursos.css'

function initializeDROP() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options;
    var instances = M.Dropdown.init(elems, options);
}


export default function HistorialCursosPonente() {
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
                                <div className="col m12 l6 div-cousers-teacher">
                                    {/* Imagen del curso */}
                                    <div className="col s10 m3 l3">
                                        <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className="img-course" style={{"width":"100%"}} /></a>
                                    </div>
                                    <div className="col s12 m9 l9">
                                        <div className="txt-course-title txt-course-title-teacher"><a href="#!" className="title-course-hover">Programación Lógica y Funcional (Grupo de las 8 am)</a></div>                                   
                                        
                                        {/* TXT fechas del curso */}
                                        <div className="txt-presentation txt-date-course">Inicio 15 Marzo 2021, Fin 15 Agosto 2021</div>
                                        
                                        {/* DIV progress bar del curso */}
                                        <div className="row" style={{"display":"flex", "alignItems": "center", "marginBottom": "0px"}}>
                                            <div className="col s5">
                                                <div className="progress" style={{"margin": "0px"}}>
                                                    <div className="determinate" style={{"width": "70%"}}></div>
                                                </div>
                                            </div>
                                            <div className="col s7">
                                                <div className="txt-progress-course">Avance 15%</div>
                                            </div>
                                        </div>
                                        
                                        {/* Div total de participantes */}
                                        <div className="txt-video-course">
                                            <i className="material-icons tiny">people
                                            </i>
                                            <p style={{"marginLeft": "5px", "color": "#585858 !important"}}>125 participantes</p>
                                        </div>
                                        
                                        {/* Div link videconferencias */}
                                        <a href="#!" className="txt-video-course">
                                            <i className="material-icons tiny">videocam</i>
                                            <p style={{"marginLeft": "5px", "textDecoration": "underline"}}>Videoconferencias</p>
                                        </a>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

