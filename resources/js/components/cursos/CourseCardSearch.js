import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import '../../styles/cursos.css'
import '/css/courseCardSearch.css'

export default function InfoAlumno({ curso }) {

    return (
        <div className="col s12">
            <div className="card">
                {/* Imagen del curso */}
                <div className="col s12 course-image-container center-align">
                    {/* <img src="/images/monita.jpg" alt="imagen del curso" className="course-image" /> */}
                    <img className="course-image" src={curso.first_image.length > 0 ? '/storage/imagenes_curso/' + curso.first_image[0].imagen : '/storage/imagenes_curso/default.png'} alt="img" />
                </div>
                {/* Informacion sobre el curso */}
                <div className="card-content">
                    <div className="row">
                        {/* Nombre del curso */}
                        <div className="col s12 valign-wrapper" style={{"marginTop":"7px"}}>
                            <i class="material-icons verified-icon">verified</i>
                            <span className="course-name truncate">{curso.nombre}</span>
                        </div>
                        {/* Nombre del ponente */}
                        <div className="col s12" style={{"marginTop":"5px"}}>
                            <span className="course-teacher truncate">{curso.teacher.nombre} {curso.teacher.apellido_p} {curso.teacher.apellido_m}</span>
                        </div>
                        {/* Tags del curso */}
                        <div className="col s12 courseCard_tags" style={{"marginTop":"5px"}}>
                            <div className="container-tags">
                                {curso.tags.map(tag=>
                                    <a className="div-tag" href="#!">
                                        {tag.nombre} <i class="material-icons" style={{ "fontSize": "12px" }}>local_offer</i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}