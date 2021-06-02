import Layout from '../../../layouts/Layout';
import LayoutCursos from '../../../layouts/LayoutCursos';
import React, { useState, useEffect } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'


import '/css/participantes.css'
import '/css/modulos.css'
import '/css/asignaciones.css'
import route from 'ziggy-js';

function tooltip(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}



const Asignacion = ({curso}) => {
    useEffect(() => {
        tooltip();
    }, [])

    return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                {/* regresar al módulo, hay que cambiar este link por el bueno*/}
                <InertiaLink  href={route('cursos.participantes', curso.id)}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                MÓDULO 1. Nombre completo del módulo
            </div>
            {/* Recuadro de la asignacion */}
            <div className="col s12 div_asignacion_mod">
                {/* nombre de la asignacion e icono de comentarios */}
                <div className="col s12 div_cabecera">
                    <div className="col s12 m11 l11 xl11 text-name-as">
                        <i className="material-icons" style={{"marginRight":"10px"}}>edit_note</i>
                        Nombre completo de la asignación
                        {/* Link visible solo para el ponente, para editar asignación */}
                        <InertiaLink href="#!" className="link-edit-as"><i className="material-icons" style={{"fontSize":"16px","marginRight":"5px"}}>edit</i>Editar</InertiaLink>
                    </div>
                    <a className="col s12 m1 l1 xl1 div-comments tooltipped" data-position="top" data-tooltip="Comentarios"><i className="material-icons">forum</i>3</a>
                </div>
                {/* fecha de la asignacion */}
                <div className="col s12 txt-date-as">Publicado el 24 de Abril de 2021 a las 12:05 pm </div>
                {/* contenido de la asignación, con formato del ckeditor */}
                {/* esto es un ejemplo */}
                <div className="col s12 txt-ejm-as" style={{"marginTop":"15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</div>
                {/* Estatus de la asignación */}
                <div className="col s12 txt-status-as">ESTATUS DE LA ASIGNACIÓN</div>

                {/* row de info */}
                <div className="col s12 padding-40px row-extatus">
                    <div className="col s3 txt-title-estatus">Estatus</div>
                    <div className="col s9 txt-content-estatus">Abierto</div>
                </div>
                <div className="col s12 padding-40px row-extatus">
                    <div className="col s3 txt-title-estatus">Fecha de entrega</div>
                    <div className="col s9 txt-content-estatus">27 de Abril de 2021 a las 23:59</div>
                </div>
                <div className="col s12 padding-40px row-extatus">
                    <div className="col s3 txt-title-estatus">Tiempo restante</div>
                    <div className="col s9 txt-content-estatus">3 días y 3 horas</div>
                </div>
                <div className="col s12 padding-40px row-extatus">
                    <div className="col s3 txt-title-estatus">Estatus de calificación</div>
                    <div className="col s9 txt-content-estatus">Sin calificar</div>
                </div>
            </div>
            


            

            
        </div>
    </>
  )
}

Asignacion.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="ASIGNACIÓN">
    <LayoutCursos children={page} />
  </Layout>
)

export default Asignacion