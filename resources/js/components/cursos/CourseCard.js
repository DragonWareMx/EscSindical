import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

export default function InfoAlumno({curso}) {
    console.log(curso)
    return(
        <div className="col s12 m6">
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="col s10 truncate">{curso.nombre}</div>
                        <div className="col s2 center-align"><i className="material-icons">more_vert</i></div>
                        <div className="col s5 red" style={{"marginTop":"10px","padding":"0px","height":"150px"}}>
                            <img style={{"width":"100%"}} src={curso.first_image.length > 0 ? '/storage/imagenes_curso/'+curso.first_image[0].imagen : '/storage/imagenes_curso/default.png' } alt="" />
                        </div>
                        <div className="col s7">
                            <div className="col s2">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 

}