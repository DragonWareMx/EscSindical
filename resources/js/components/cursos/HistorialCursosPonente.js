import React from 'react'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
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

                                <div className="row">
                                    {/* CARD HISTORIAL */}
                                    <div className="col s12 m6 l6 xl6">
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
                                                    <a href="#!" className="a-mini-course-hover">Nombre completo del curso terminado, lorem ipsum dolor</a>
                                                </div>
                                                <div className="row" style={{"marginTop":"15px", "marginBottom":"5px"}}>
                                                    <div className="col s5">
                                                        <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className=""/></a>
                                                    </div>  
                                                    <div className="col s12 l7 m7 xl7">

                                                        <div className="txt-video-course">
                                                            <i className="material-icons tiny">people
                                                            </i>
                                                            <p style={{"marginLeft": "5px", "color": "#585858 !important"}}>125 participantes</p>
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
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i className="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                                            </a>
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i className="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                                            </a>
                                                            ...
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="right date-course-history">14 Abril 2020 - 14 Agosto 2020</div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* CARD HISTORIAL */}
                                    <div className="col s12 m6 l6 xl6">
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
                                                    <a href="#!" className="a-mini-course-hover">Nombre completo del curso terminado, lorem ipsum dolor</a>
                                                </div>
                                                <div className="row" style={{"marginTop":"15px", "marginBottom":"5px"}}>
                                                    <div className="col s5">
                                                        <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className=""/></a>
                                                    </div>  
                                                    <div className="col s12 l7 m7 xl7">

                                                        <div className="txt-video-course">
                                                            <i className="material-icons tiny">people
                                                            </i>
                                                            <p style={{"marginLeft": "5px", "color": "#585858 !important"}}>125 participantes</p>
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
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i className="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                                            </a>
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i className="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                                            </a>
                                                            ...
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="right date-course-history">14 Abril 2020 - 14 Agosto 2020</div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

