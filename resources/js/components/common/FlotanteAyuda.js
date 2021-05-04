import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
//import circlesImg from '../images/circles.png'
//import emptyImg from '../images/empty.png'
//import './styles/Card.css'


function initializeModals() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
}

export default function FlotanteAyuda() {
    useEffect(() => {
        initializeModals();
    }, [])
    return (
        <div>
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large waves-effect waves-light green-sind modal-trigger" href="#modalHelp"><i class="material-icons">help_outline</i></a>
            </div>

            <div id="modalHelp" className="modal">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </div>
    );
}