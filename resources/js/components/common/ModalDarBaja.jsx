import React, { useEffect, useState } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'

export default function ModalDarBaja({nombre, curso, url}) {

    function initializeModal() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    useEffect(() => {
        initializeModal();
    }, [])

    return (
        <div id="modalDarBaja" className="modal">
            <div className="modal-content">
                <h4 style={{"color":"#c62828"}}>Dar de baja del curso</h4>
                <p>¿Estás seguro de que deseas dar de baja a {nombre} del curso {curso}?</p>
                </div>
                <div className="modal-footer">
                <a className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                <InertiaLink href={url} method="delete" as="button" type="button"  className="modal-close waves-effect waves-green btn-flat" style={{"color":"#c62828"}}>Dar de baja</InertiaLink>
            </div>
        </div>
    )
}
