import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import '../../styles/cursos.css'
import '/css/courseCard.css'
import Tag from '../common/Tag'

export default function InfoAlumno({ curso, actuales }) {

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

    function calculaAvance(ini, fin) {
        var start = new Date(ini),
            end = new Date(fin),
            today = new Date(),
            porcentaje = Math.round(((today - start) / (end - start)) * 100)
        if (porcentaje < 0)
            return 0
        else if (porcentaje > 100)
            return 100
        else return porcentaje
    }

    return (
        <div className="col s12 m6">
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="col s10 truncate">{curso.nombre}</div>
                        <div className="col s2 center-align"><i className="material-icons">more_vert</i></div>
                        <div className="col s4 little_course" style={{ "marginTop": "10px", "padding": "0px" }}>
                            <img className="courseCard_image" src={curso.images.length > 0 ? '/storage/imagenes_curso/' + curso.images[0].imagen : '/storage/imagenes_curso/default.png'} alt="img" />
                        </div>
                        <div className="col s8 little_course" style={{ "marginTop": "10px" }}>
                            {/* DIV foto y nombre del profesor */}
                            <div className="col s2 center-align">
                                <img className="courseCard_pp" style={{ "color": "#585858", "fontSize": "12px" }} src={curso.teacher.foto ? '/storage/fotos_perfil/' + curso.teacher.foto : '/storage/fotos_perfil/avatar1.png'} alt="img" />
                            </div>
                            <div className="col s10 truncate" style={{ "height": "30px", "display": "flex", "alignItems": "center" }}>{curso.teacher.nombre} {curso.teacher.apellido_p} {curso.teacher.apellido_m}</div>
                            <div className="col s12 courseCard_tags" >
                                <div className="container-tags">
                                    {curso.tags && curso.tags.length > 0 && curso.tags.map((tag, index)=>
                                        <Tag nombre={tag.nombre} key={index} />
                                    )}
                                </div>

                            </div>
                            {/* TXT fechas del curso */}
                            <div className="col s12">
                                <div className="txt-presentation txt-date-course" style={{ "color": "#263238", "fontSize": "11px" }}>{transformaFecha(curso.fecha_inicio)} - {transformaFecha(curso.fecha_final)}</div>
                            </div>
                            {actuales &&
                                <div>
                                    <div className="col s12">
                                        <div className="txt-progress-course">Avance {calculaAvance(curso.fecha_inicio, curso.fecha_final)}%</div>
                                    </div>
                                    <div className="col s12">
                                        <div className="progress" style={{ "margin": "0px" }}>
                                            <div className="determinate" style={{ "width": calculaAvance(curso.fecha_inicio, curso.fecha_final) + "%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}