import React, {useEffect} from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react'

import '/css/participantes.css'
import '/css/modulos.css'
import route from 'ziggy-js';

const Calificaciones = ({curso}) => {

    const { auth } = usePage().props;

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    useEffect(() => {
        initializeMaterialize();
      }, [])


  return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{"marginTop":"15px"}}>CALIFICACIONES</div>
            
            
        </div>
    </>
  )
}

Calificaciones.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Calificaciones">
    <LayoutCursos children={page} />
  </Layout>
)

export default Calificaciones