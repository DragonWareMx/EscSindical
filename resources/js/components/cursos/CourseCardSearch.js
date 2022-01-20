import React, { useEffect, useState } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import '../../styles/cursos.css'
import '/css/courseCardSearch.css'
import Tag from '../common/Tag'

export default function CourseCardSearch({ curso }) {

    function transformaFecha(fecha) {
        let dob
        if(fecha)
            dob = new Date(fecha.replace(/-/g, '\/').replace(/T.+/, ''));
        else
            dob = new Date()
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const day = dob.getDate();
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        return `${day} ${monthNames[monthIndex]} ${year}`;
    }

    function isFinished(finalDate){
        const today = new Date();
        const end = new Date(finalDate.replace(/-/g, '\/').replace(/T.+/, ''));

        today.setHours(0,0,0,0)
        end.setHours(0,0,0,0)

        return today > end ? '(Curso terminado)' : '' 
    }

    return (
        <div className="col s12">
            <div className="card course-card">
                {/* Imagen del curso */}
                <div className="col s12 course-image-container center-align transicion">
                    {/* <img src="/images/monita.jpg" alt="imagen del curso" className="course-image" /> */}
                    <img className="course-image transicion" src={curso.images.length > 0 ? '/storage/imagenes_curso/' + curso.images['0'].imagen : '/storage/imagenes_curso/default.png'} alt="img" />
                </div>
                {/* Informacion sobre el curso */}
                <div className="card-content">
                    <div className="row" style={{ "marginBottom": "0px" }}>
                        {/* Nombre del curso */}
                        <div className="col s12 valign-wrapper transicion course-name" style={{ "marginTop": "7px" }}>
                            {curso.valor_curricular == 1 &&
                                <i className="material-icons verified-icon">verified</i>
                            }
                            <b>{isFinished(curso.fecha_final)}</b> {curso.nombre}
                        </div>
                        {/* Nombre del ponente */}
                        <div className="col s12" style={{ "marginTop": "5px" }}>
                            <span className="course-teacher truncate">
                                {curso.teacher ? 
                                <>
                                    <InertiaLink href={route('perfil.public',curso.teacher.id)} style={{color: "#A6A6A6"}}>
                                        {curso.teacher.nombre} {curso.teacher.apellido_p} {curso.teacher.apellido_m}
                                    </InertiaLink>
                                </>
                                : 
                                <>
                                    Sin profesor asignado
                                </>
                                }
                            </span>
                        </div>
                        {/* Tags del curso */}
                        <div className="col s12 courseCard_tags" style={{ marginTop: "5px", marginBottom: "5px" }}>
                            <div className="container-tags">
                                {curso.tags && curso.tags.length > 0 && curso.tags.map((tag, index) =>
                                    <Tag nombre={tag.nombre} key={index} />
                                )}
                            </div>
                        </div>
                        <div className="col s12">
                            {curso.valor_curricular == 1 &&
                            <div className=" valor-curri valign-wrapper">
                                <i className="material-icons verified-icon">verified</i>
                                VALOR CURRICULAR
                            </div>
                            }
                        </div>
                        <div className="fechas-card transicion">
                            <h3>Inscripciones</h3>
                            {curso.inicio_inscripciones && curso.fecha_limite ?
                                <div>
                                    {transformaFecha(curso.inicio_inscripciones)}-{transformaFecha(curso.fecha_limite)}
                                </div>
                                :
                                <div>Sin fechas de inscripciones</div>
                            }
                            <h3>Fechas del curso</h3>
                            <div>{transformaFecha(curso.fecha_inicio)}-{transformaFecha(curso.fecha_final)} </div>
                        </div>
                        <div className="button-course col s12 transicion" >
                            <button className="btn waves-effect waves-light" name="action">VER CURSO
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}