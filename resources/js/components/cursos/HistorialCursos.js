import React from 'react'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import '../../styles/cursos.css'

function initializeDROP() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options;
    var instances = M.Dropdown.init(elems, options);
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

                                <div classNme="row">
                                    {/* CARD HISTORIAL */}
                                    <div className="col s12 m6 l6 xl4">
                                        <div className="card">
                                            <div className="card-content">
                                                <a className="dropdown-trigger"  data-target='download-certificate'>
                                                    <i className="material-icons right">more_vert</i>
                                                </a>
                                                <div id='download-certificate' class='dropdown-content' style={{"width":"max-content !important"}}>
                                                    <a href="#!"><i className="material-icons">file_download</i>Descargar certificado</a>
                                                </div>
                                                <div className="txt-title-course-history">
                                                    Nombre completo del curso terminado, lorem ipsum dolor sit amet
                                                </div>
                                                <div className="row" style={{"marginTop":"15px", "marginBottom":"5px"}}>
                                                    <div className="col s5">
                                                        <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className=""/></a>
                                                    </div>  
                                                    <div className="col s12 l7 m7 xl7">
                                                        <div className="txt-grade-course">CALIFICACIÓN: <b>100</b></div>
                                                        {/* Datos del profesor */}
                                                        <div className="" style={{"display": "flex", "alignItems": "center", "marginTop": "0px"}}>
                                                            <div style={{"width": "max-content", "marginRight": "8px"}}><img src="images/profile.jpg" style={{"width": "20px", "height": "20px", "borderRadius": "50%", "objectFit": "cover", "marginTop":"5px"}} /></div>
                                                            <a className="txt-teacher-name" style={{"width": "max-content", "fontSize":"12px"}} href="#!">José Agustín...</a>
                                                        </div>
                                                        {/* Tags del curso */}
                                                        <div className="container-tags">
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i class="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                                            </a>
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i class="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
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

                <div className="col s12">
                    <ul class="collapsible">
                        <li>
                            <div class="collapsible-header">
                                <span className="txt-title-card">SOLICITUDES A CURSOS
                                </span>
                                
                                <span class="badge">10</span>
                            </div>
                            <div class="collapsible-body row">
                            <div className="col s12 m6 l6 xl4">
                                        <div className="card">
                                            <div className="card-content">
                                                <a className="dropdown-trigger"  data-target='download-certificate'>
                                                    <i className="material-icons right">more_vert</i>
                                                </a>
                                                <div id='download-certificate' class='dropdown-content' style={{"width":"max-content !important"}}>
                                                    <a href="#!"><i className="material-icons">file_download</i>Descargar certificado</a>
                                                </div>
                                                <div className="txt-title-course-history">
                                                    Nombre completo del curso terminado, lorem ipsum dolor sit amet
                                                </div>
                                                <div className="row" style={{"marginTop":"15px", "marginBottom":"5px"}}>
                                                    <div className="col s5">
                                                        <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className=""/></a>
                                                    </div>  
                                                    <div className="col s12 l7 m7 xl7">
                                                        <div className="txt-grade-course" div style={{"width":"max-content", "display":"flex", "alignItems":"center"}}>Estatus:&nbsp;<div className="course-status-rejectec" style={{"width":"max-content"}}>Rechazado</div></div>
                                                        {/* Datos del profesor */}
                                                        <div className="" style={{"display": "flex", "alignItems": "center", "marginTop": "0px"}}>
                                                            <div style={{"width": "max-content", "marginRight": "8px"}}><img src="images/profile.jpg" style={{"width": "20px", "height": "20px", "borderRadius": "50%", "objectFit": "cover", "marginTop":"5px"}} /></div>
                                                            <a className="txt-teacher-name" style={{"width": "max-content", "fontSize":"12px"}} href="#!">José Agustín...</a>
                                                        </div>
                                                        {/* Tags del curso */}
                                                        <div className="container-tags">
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i class="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
                                                            </a>
                                                            <a className="div-tag" href="#!">
                                                                course tag&nbsp;<i class="material-icons" style={{"fontSize": "12px"}}>local_offer</i>
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
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }

