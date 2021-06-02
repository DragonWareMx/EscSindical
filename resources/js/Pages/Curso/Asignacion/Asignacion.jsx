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
            <div className="col s12 div_asignacion_mod">
                <div className="col s11">Nombre completo de la asignación</div>
                <div className="col s1">A A</div>
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