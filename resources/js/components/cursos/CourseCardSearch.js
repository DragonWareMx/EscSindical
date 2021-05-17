import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import '../../styles/cursos.css'
import '/css/courseCardSearch.css'

export default function CourseCardSearch({ curso }) {

    function transformaFecha(fecha) {
        const dob = new Date(fecha);
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const day = dob.getDate();
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        return `${day} ${monthNames[monthIndex]} ${year}`;
    }

    return (
        <div className="col s12">
            <div className="card course-card">
                {/* Imagen del curso */}
                <div className="col s12 course-image-container center-align transicion">
                    {/* <img src="/images/monita.jpg" alt="imagen del curso" className="course-image" /> */}
                    <img className="course-image transicion" src={curso.first_image.length > 0 ? '/storage/imagenes_curso/' + curso.first_image[0].imagen : '/storage/imagenes_curso/default.png'} alt="img" />
                </div>
                {/* Informacion sobre el curso */}
                <div className="card-content">
                    <div className="row" style={{ "marginBottom": "0px" }}>
                        {/* Nombre del curso */}
                        <div className="col s12 valign-wrapper transicion course-name" style={{ "marginTop": "7px" }}>
                            <i className="material-icons verified-icon">verified</i>
                            {curso.nombre}
                        </div>
                        {/* Nombre del ponente */}
                        <div className="col s12" style={{ "marginTop": "5px" }}>
                            <span className="course-teacher truncate">{curso.teacher.nombre} {curso.teacher.apellido_p} {curso.teacher.apellido_m}</span>
                        </div>
                        {/* Tags del curso */}
                        <div className="col s12 courseCard_tags" style={{ marginTop: "5px", marginBottom: "5px" }}>
                            <div className="container-tags">
                                {curso.tags.map((tag, index) =>
                                    <a className="div-tag" href="#!" key={index}>
                                        {tag.nombre} <i className="material-icons" style={{ "fontSize": "12px" }}>local_offer</i>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="fechas-card transicion">
                            <h3>Inscripciones</h3>
                            <div>{transformaFecha(curso.inicio_inscripciones)}-{transformaFecha(curso.fecha_limite)} </div>
                            <h3>Fechas del curso</h3>
                            <div>{transformaFecha(curso.fecha_inicio)}-{transformaFecha(curso.fecha_final)} </div>
                        </div>
                        <div className="button-course col s12 transicion" >
                            <button className="btn waves-effect waves-light" name="action">Inscribirme
                                <i className="material-icons right">add_circle</i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}