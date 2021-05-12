import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import '../../styles/cursos.css'

export default function InfoAlumno({curso}) {
    console.log(curso)
    return(
        <div className="col s12 m6">
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="col s10 truncate">{curso.nombre}</div>
                        <div className="col s2 center-align"><i className="material-icons">more_vert</i></div>
                        <div className="col s4 red" style={{"marginTop":"10px","padding":"0px"}}>
                            <img style={{"width":"100%"}} src={curso.first_image.length > 0 ? '/storage/imagenes_curso/'+curso.first_image[0].imagen : '/storage/imagenes_curso/default.png' } alt="img" />
                        </div>
                        <div className="col s8 blue">
                            {/* DIV foto y nombre del profesor */}
                            <div className="col s2">
                                <img src="" alt="img" />
                            </div>
                            <div className="col s10 truncate">Jose adolfo lemus magana</div>
                            {/* TXT fechas del curso */}
                            <div className="col s12">
                                <div className="txt-presentation txt-date-course">{curso.fecha_inicio} - {curso.fecha_final}</div>
                            </div>
                            {/* DIV progress bar del curso */}
                            <div className="col s12">
                                <div className="txt-progress-course">Avance 15%</div>
                            </div>
                            <div className="col s12">
                                <div className="progress" style={{"margin": "0px"}}>
                                    <div className="determinate" style={{"width": "70%"}}></div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 

}