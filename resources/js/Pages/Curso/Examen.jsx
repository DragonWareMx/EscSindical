import { Inertia } from '@inertiajs/inertia';
import { InertiaLink , usePage   } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react'
import route from 'ziggy-js';
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/modulos.css'
import '/css/asignaciones.css'


const Examen = ({curso , modulo, asignacion}) => {
    
    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems);
      }
      
      useEffect(() => {
        initializeMaterialize();
      }, [])

      
    return (
        <>
        <div className="row">
            {/* NOMBRE DEL MODULO */}
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                <InertiaLink  href={route('cursos.modulo', [curso.id, modulo.id])}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                MÓDULO. {modulo.nombre}
            </div>
            <iframe src={asignacion.link} width='100%' height='1000px'></iframe>
        </div>
        </>
    )

}

Examen.layout = page => (
    <Layout title="Escuela sindical - Modulo" pageTitle="Examen">
      <LayoutCursos children={page} />
    </Layout>
  )
  
  export default Examen