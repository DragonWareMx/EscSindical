import React, {useEffect} from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';

import '/css/participantes.css'
import '/css/modulos.css'

// Default SortableJS
import Sortable from 'sortablejs';
//componentes
import ModalEliminar from '../../components/common/ModalEliminarDD'
import route from 'ziggy-js';
import { Modal } from 'bootstrap';

// Core SortableJS (without default plugins)
// import Sortable from 'sortablejs/modular/sortable.core.esm.js';

// // Complete SortableJS (with all plugins)
// import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

const ModulosConfig = ({curso}) => {
    console.log (curso);
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
            <p className="col s12 text-ins-module">Es posible reordenar los módulos arrastrandolos, este orden será visible para todos los participantes dentro del curso</p>
            
            
            
            <ul id="items" className="col s12">
                {curso.modules.map((modulo) =>
                <li key={modulo.id}>
                    <div className="col s12 div-modulo-config">
                        <div className="col s1">
                            <i className="material-icons" style={{"cursor":"move"}}>drag_handle</i>
                        </div>
                        <div className="col s11">
                            <div className="div-info-modulo-c">
                                <div className="col s12 m11 l11 xl11 txt-titulo-modulo-card">{modulo.nombre}</div>
                                <div className="col s12 m1 l1 xl1"><a  className="dropdown-trigger right" data-target={'dropdown-option-module'+modulo.id}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                {/* Dropdown modulos */}
                                <ul id={'dropdown-option-module'+modulo.id} className='dropdown-content dropdown_LC'>
                                    <li><a className="dropdown-text modal-trigger" href={route('module.edit',modulo.id)}><i className="material-icons">edit</i>Editar módulo</a></li>
                                    <li><a className="dropdown-text modal-trigger" data-target={'modalEliminar'+modulo.nombre} href=""><i className="material-icons">clear</i>Eliminar módulo</a></li>
                                </ul>
                            
                            </div>
                            <div className="col s12 txt-titulo-objetivo">OBJETIVO</div>
                            <div className="col s12 txt-objetivo">{modulo.objetivo}</div>
                        </div>
                    </div>
                    <ModalEliminar nombre={modulo.nombre} tipo={'modulo'} url = {route('module.delete', modulo.id)}/>
                </li>
                )}
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