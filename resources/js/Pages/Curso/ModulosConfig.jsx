import React, {useEffect} from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'

import '/css/participantes.css'
import '/css/modulos.css'

//componentes
import ModalEliminar from '../../components/common/ModalEliminarDD'
import route from 'ziggy-js';
import { Modal } from 'bootstrap';

// Default SortableJS
import Sortable from 'sortablejs';

const ModulosConfig = ({curso}) => {

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
        //  aqui se inicializa el sortable
        var el = document.getElementById('items');
        var sortable = Sortable.create(el,{
            handle: '.my-handle',
            animation: 150,
            group: "localStorage-example",
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? order.split('|') : [];
                },

                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    localStorage.setItem(sortable.options.group.name, order.join('|'));
                    Inertia.post(route('cursos.modulos.order',curso.id), {order:order});
                }
            }
        });
    }



    useEffect(() => {
        initializeMaterialize();
      }, [])


  return (
    <>
        <div className="row">
            <div className="col s12 titulo-modulo left" style={{"marginTop":"15px"}}>
                <div className="col s12">
                    M??DULOS
                </div>
            </div>
            <ul id="items" className="col s12">
            {curso.modules && curso.modules.length>0 &&
                <>
                    {curso.modules.map((modulo) =>
                        <li data-id={modulo.id} key={modulo.id} className="valign-wrapper">
                            {/* icono para mover el modulo */}
                            <span className="material-icons my-handle">drag_indicator</span>

                            <div className="col s12 div-modulo-config">
                                <div className="col s12">
                                    <div className="div-info-modulo-c">
                                        <InertiaLink href={route('cursos.modulo',[curso.id,modulo.id])} className="col s12 m11 l11 xl11 txt-titulo-modulo-card">M??dulo {modulo.numero}.{modulo.nombre}</InertiaLink>
                                        <div className="col s12 m1 l1 xl1"><a  className="dropdown-trigger right" data-target={'dropdown-option-module'+modulo.id}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                        {/* Dropdown modulos */}
                                        <ul id={'dropdown-option-module'+modulo.id} className='dropdown-content dropdown_LC'>
                                            <li><a className="dropdown-text modal-trigger" href={route('module.edit',modulo.id)}><i className="material-icons">edit</i>Editar m??dulo</a></li>
                                            <li><a className="dropdown-text modal-trigger" data-target={'modalEliminar'+modulo.nombre} href=""><i className="material-icons">clear</i>Eliminar m??dulo</a></li>
                                        </ul>

                                    </div>
                                    <div className="col s12 txt-titulo-objetivo">OBJETIVO</div>
                                    <div className="col s12 txt-objetivo">{modulo.objetivo}</div>
                                </div>
                            </div>
                            <ModalEliminar nombre={modulo.nombre} tipo={'modulo'} url = {route('module.delete', modulo.id)}/>
                        </li>
                    )}
                </>
            }
            </ul>
            {curso.modules && curso.modules.length==0 &&
                <p className="col s12 text-ins-module">A??n no hay m??dulos en este curso.</p>
            }

            {/* esto es una prueba */}
            {/* <div className="col s12">
                <ul id="items2">
                    <li data-id="1" className="list-group-item valign-wrapper orange"><span className="material-icons my-handle">home</span> item 1</li>
                    <li data-id="2" className="list-group-item valign-wrapper red"><span className="material-icons my-handle">home</span>item 2</li>
                    <li data-id="3" className="list-group-item valign-wrapper purple"><span className="material-icons my-handle">home</span>item 3</li>
                </ul>

            </div> */}


        </div>

    </>
  )
}

ModulosConfig.layout = page => (
  <Layout title="Formaci??n XX Mich - Curso" pageTitle="M??dulos">
    <LayoutCursos children={page} />
  </Layout>
)

export default ModulosConfig