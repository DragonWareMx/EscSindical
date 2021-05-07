import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import Create1 from '../Create1.js' 
import Create2 from '../Create2.js' 
import Create3 from '../Create3.js' 
import '../../styles/cursos.css'

function initializeModals() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // TABS
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
}



const FormCurso = () => {
    useEffect(() => {
        initializeModals();
    }, [])
    const [values, setValues] = useState({
        nombre : "",
        tags : "",
        dateIni : "",
        dateFin : "",
        link : "",
        vc:0,
        categorias:"",
        active: false,
        inscIni:"",
        inscFin: "",
        tipo: "",
        descripcion: "",
        imgs: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/storeCourse', values)
    }

    
    
    return(
        
    <>
        <div>
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large waves-effect waves-light  teal darken-3 modal-trigger" href="#modalAddCourse"><i className="material-icons">add_circle_outline</i></a>
            </div>
            <div id="modalAddCourse" className="modal little-modal">
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-close right"><i className="material-icons">close</i></div>
                        <div className="row">
                            <span className="txt-title-card">AGREGAR CURSO</span>  
                            <ul id="tabs-swipe-demo" class="tabs" style={{"marginBottom": "20px"}}>
                                <li class="tab col s4"><a href="#test-swipe-2" class="active" >1. Generalidades</a></li>
                                <li class="tab col s4"><a href="#test-swipe-1">2. Participantes</a></li>
                                <li class="tab col s4"><a href="#test-swipe-3">3. Presentación</a></li>
                            </ul>

                            <div id="test-swipe-1" class="col s12"><Create2 change = {handleChange} values = {useState}/></div>
                            <div id="test-swipe-2" class="col s12"><Create1 change = {handleChange} values = {useState}/></div>
                            <div id="test-swipe-3" class="col s12"><Create3 change = {handleChange} values = {useState}/></div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
            
    </>
    )
}

export default FormCurso