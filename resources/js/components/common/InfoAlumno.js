import React, { useEffect, useState } from 'react'
import '/css/infoAlumno.css'
import '/css/register.css'
import '/css/login.css'
import UserForm from '../../components/common/UserForm'
import CourseCard from '../../components/cursos/CourseCard'

function initializeCollaps() {
    var elems = document.querySelectorAll('.collapsible')
    var instances = M.Collapsible.init(elems)
    var elems = document.querySelectorAll('.modal')
    var instances = M.Modal.init(elems)
}


export default function InfoAlumno({user, categories}) {
    const [edit, setEdit] = useState(false)

    function handleEditChange(newValue) {
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

                                <UserForm user={user} bEdit={edit} categories={categories} onEditChange={handleEditChange}/>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header" style={{"color":"#108058"}}><i className="material-icons">school</i>Cursos</div>
                            <div className="collapsible-body collapsible-padding padding3">

                                <div style={{"fontSize":"17px","color":"#134E39","marginTop":"15px"}}>CURSOS ACTUALES</div>
                                <div className="row">
                                    {!user ? "" :  user.active_courses.length > 0 ? 
                                        user.active_courses.map(curso=>(
                                            <div><CourseCard curso={curso} actuales={true}/></div>
                                        ))
                                    : "Este usuario aún no pertenece a algún curso activo"}
                                </div>

                                <div style={{"fontSize":"17px","color":"#134E39","marginTop":"15px"}}>HISTORIAL DE CURSOS</div>
                                <div className="row">
                                    {!user ? "" :  user.finished_courses.length > 0 ? 
                                        user.finished_courses.map(curso=>(
                                            <div><CourseCard curso={curso} actuales={false}/></div>
                                        ))
                                    : "Este usuario aún no tiene cursos terminados"}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}