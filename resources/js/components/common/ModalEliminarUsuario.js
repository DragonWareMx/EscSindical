import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import route from 'ziggy-js';

export default function ModalEliminarUsuario({user}) {

    function initializeModal() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    useEffect(() => {
        initializeModal();
    }, [])

    function sendRequest(id) {
        Inertia.delete( route('usuarios.delete',id))
      }

    return (
        <div id="modalEliminarUsuario" class="modal">
            <div class="modal-content">
                <h4 style={{"color":"red"}}>Eliminar usuario {user && user.nombre}</h4>
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                </div>
                <div class="modal-footer">
                <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                <a style={{"color":"red"}} onClick={()=>{sendRequest(user.id)}} class="modal-close waves-effect waves-green btn-flat">Eliminar</a>
            </div>
        </div>
    )
}
