import React, {useEffect} from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';

import '/css/participantes.css'
import '/css/modulos.css'

// Default SortableJS
import Sortable from 'sortablejs';

// Core SortableJS (without default plugins)
// import Sortable from 'sortablejs/modular/sortable.core.esm.js';

// // Complete SortableJS (with all plugins)
// import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

const ModulosConfig = ({curso}) => {

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);

        // var el = document.getElementById('items');
        // var sortable = Sortable.create(el);
        Sortable.create(items, {
            group: {
              name: 'items',
              pull: true
            },
            animation: 200,
            easing: "cubic-bezier(1, 0, 0, 1)",
          });
    }

    

    useEffect(() => {
        initializeMaterialize();
      }, [])


  return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>MÓDULOS</div>
            
            
            
            
            <ul id="items" className="col s12">
                <li>
                    <div className="col s12 div-modulo-config">
                        <div className="col s1">
                            A
                        </div>
                        <div className="col s11">
                            <div className="col s12 txt-titulo-modulo-card">1. Nombre completo del módulo</div>
                            <div className="col s12 txt-titulo-objetivo">OBJETIVO</div>
                            <div className="col s12 txt-objetivo">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="col s12 div-modulo-config">
                        <div className="col s1">
                            B
                        </div>
                        <div className="col s11">
                            <div className="col s12 txt-titulo-modulo-card">1. Nombre completo del módulo</div>
                            <div className="col s12 txt-titulo-objetivo">OBJETIVO</div>
                            <div className="col s12 txt-objetivo">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="col s12 div-modulo-config">
                        <div className="col s1">
                            C
                        </div>
                        <div className="col s11">
                            <div className="col s12 txt-titulo-modulo-card">1. Nombre completo del módulo</div>
                            <div className="col s12 txt-titulo-objetivo">OBJETIVO</div>
                            <div className="col s12 txt-objetivo">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</div>
                        </div>
                    </div>
                </li>
            </ul>
            

        </div>
    </>
  )
}

ModulosConfig.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="MÓDULOS">
    <LayoutCursos children={page} />
  </Layout>
)

export default ModulosConfig