import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import route from 'ziggy-js';

export default function ModalEliminarUsuario({id, nombre}) {

    function initializeModal() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    useEffect(() => {
        initializeModal();
    }, [])

    function sendRequest(id) {
        Inertia.delete( route('usuarios.delete',id),{preserveState:true})
    }

    return (
        <div id="modalEliminarUsuario" className="modal">
            <div className="modal-content">
                <h4 style={{"color":"red"}}>Eliminar usuario {nombre}</h4>
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                </div>
                <div className="modal-footer">
                <a className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                <a style={{"color":"red"}} onClick={()=>{sendRequest(id)}} className="modal-close waves-effect waves-green btn-flat">Eliminar</a>
            </div>
        </div>
    )
}
