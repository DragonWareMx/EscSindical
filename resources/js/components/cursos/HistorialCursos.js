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


export default function HistorialCursos() {
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
                                    <div className="col s12 m6 l6 xl4">
                                        <div className="card">
                                            <div className="card-content">
                                                <a className="dropdown-trigger"  data-target='download-certificate'>
                                                    <i className="material-icons right">more_vert</i>
                                                </a>
                                                {/* DROPDOWN CON OPCIONES */}
                                                <ul id='download-certificate' className='dropdown-content'>
                                                    <li className="options-course-dropdown"><a href="#!"><i className="material-icons tiny" style={{"marginRight":"0px"}}>file_download</i>Descargar certificado</a></li>
                                                </ul>

                                                <div className="txt-title-course-history">
                                                    <a href="#!" className="a-mini-course-hover">Nombre completo del curso terminado, lorem ipsum dolor sit amet</a>
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
                                                            <a className="txt-teacher-name truncate" style={{"width": "max-content", "fontSize":"12px"}} href="#!">José Agustín...</a>
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

                <div className="col s12">
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header">
                                <span className="txt-title-card">SOLICITUDES A CURSOS
                                </span>
                                
                                <span className="badge">2</span>
                            </div>
                            <div className="collapsible-body row" style={{"backgroundColor":"white !important"}}>
                                <div className="col s12 m6 l6 xl4">
                                    <div className="card ">
                                        <div className="card-content">
                                            <a className="dropdown-trigger"  data-target='more-info-history' data-beloworigin='true'>
                                                <i className="material-icons right">more_vert</i>
                                            </a>
                                            {/* DROPDOWN CON OPCIONES */}
                                            <ul id='more-info-history' className='dropdown-content'>
                                                <li className="options-course-dropdown" style={{"cursor":"auto"}}>Fecha de solicitud: 12 Abril 2020</li>
                                                <li className="options-course-dropdown"><a href="#!"><i className="material-icons tiny" style={{"marginRight":"0px"}}>close</i>Cancelar solicitud</a></li>
                                            </ul>

                                            <div className="txt-title-course-history">
                                                <a href="#!" className="a-mini-course-hover">Nombre completo del curso terminado, lorem ipsum dolor sit amet</a>
                                            </div>
                                            <div className="row" style={{"marginTop":"15px", "marginBottom":"5px"}}>
                                                <div className="col s5">
                                                    <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className=""/></a>
                                                </div>  
                                                <div className="col s12 l7 m7 xl7">
                                                    <div className="txt-grade-course" div style={{"width":"max-content", "display":"flex", "alignItems":"center"}}>Estatus:&nbsp;<div className="course-status" style={{"color":"#D14747"}}>RECHAZADO</div></div>
                                                    {/* Datos del profesor */}
                                                    <div className="" style={{"display": "flex", "alignItems": "center", "marginTop": "0px"}}>
                                                        <div style={{"width": "max-content", "marginRight": "8px"}}><img src="images/profile.jpg" style={{"width": "20px", "height": "20px", "borderRadius": "50%", "objectFit": "cover", "marginTop":"5px"}} /></div>
                                                        <a className="txt-teacher-name truncate" style={{"width": "max-content", "fontSize":"12px"}} href="#!">José Agustín...</a>
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

                                <div className="col s12 m6 l6 xl4">
                                    <div className="card ">
                                        <div className="card-content">
                                            <a className="dropdown-trigger"  data-target='more-info-history' data-beloworigin='true'>
                                                <i className="material-icons right">more_vert</i>
                                            </a>
                                            {/* DROPDOWN CON OPCIONES */}
                                            <ul id='more-info-history' className='dropdown-content'>
                                                <li className="options-course-dropdown" style={{"cursor":"auto"}}>Fecha de solicitud: 12 Abril 2020</li>
                                                <li className="options-course-dropdown"><a href="#!"><i className="material-icons tiny" style={{"marginRight":"0px"}}>close</i>Cancelar solicitud</a></li>
                                            </ul>

                                            <div className="txt-title-course-history">
                                                <a href="#!" className="a-mini-course-hover">Nombre completo del curso terminado, lorem ipsum dolor sit amet</a>
                                            </div>
                                            <div className="row" style={{"marginTop":"15px", "marginBottom":"5px"}}>
                                                <div className="col s5">
                                                    <a href="#!"><img src="img/imagenes/Teacher-cuate.svg" className=""/></a>
                                                </div>  
                                                <div className="col s12 l7 m7 xl7">
                                                    <div className="txt-grade-course" div style={{"width":"max-content", "display":"flex", "alignItems":"center"}}>Estatus:&nbsp;<div className="course-status">EN ESPERA</div></div>
                                                    {/* Datos del profesor */}
                                                    <div className="" style={{"display": "flex", "alignItems": "center", "marginTop": "0px"}}>
                                                        <div style={{"width": "max-content", "marginRight": "8px"}}><img src="images/profile.jpg" style={{"width": "20px", "height": "20px", "borderRadius": "50%", "objectFit": "cover", "marginTop":"5px"}} /></div>
                                                        <a className="txt-teacher-name truncate" style={{"width": "max-content", "fontSize":"12px"}} href="#!">José Agustín...</a>
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
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }

