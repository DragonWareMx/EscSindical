import React, { useEffect, useState } from 'react'
import '/css/infoAlumno.css'
import '/css/register.css'
import '/css/login.css'
import UserForm from '../../components/common/UserForm';

function initializeCollaps() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
}


export default function InfoAlumno({user}) {
    const [edit, setEdit] = useState(false)

    function handleEditChange(newValue) {
        console.log("se cambia el edit")
        setEdit(newValue)
    }

    function closeModal(){
        setEdit(false)
    }

    useEffect(() => {
        initializeCollaps();
    }, [])

    return (
        <div>
            <div id="modalInfoAlumno" className="modal">
                <div className="modal-content">
                    <div className="modal-close right" onClick={closeModal}><i className="material-icons">close</i></div>
                    <div style={{"color":"#134E39","fontSize":"16px","fontStyle": "normal"}}>VER USUARIO</div>
                    <ul className="collapsible">
                        <li className="active">
                            <div className="collapsible-header" style={{"color":"#108058"}}><i className="material-icons">person</i>Información personal</div>
                            <div className="collapsible-body collapsible-padding">

                                <UserForm user={user} bEdit={edit} onEditChange={handleEditChange}/>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">person</i>Second</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}