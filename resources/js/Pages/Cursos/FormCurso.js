import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';

import Create1 from '../../components/cursos/create/Create1.js' 
import Create2 from '../../components/cursos/create/Create2.js' 
import Create3 from '../../components/cursos/create/Create3.js' 
import '../../styles/cursos.css'




function initializeModals() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // TABS
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
}

var instances;

function initializeChips() {
    var elems = document.querySelectorAll('.chips');
    instances = M.Chips.init(elems);

    var elems2 = document.querySelectorAll('.tooltipped');
    var instancesT = M.Tooltip.init(elems2);
}


const FormCurso = () => {
    useEffect(() => {
        initializeModals();
    }, [])

    useEffect(() => {
        initializeChips();
    }, [])


    const [values, setValues] = useState({
        nombre : "",
        tags : [],
        dateIni : "",
        dateFin : "",
        link : "",
        vc:true,
        categorias:"",
        active: true,
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

    function onValueChange(e) {
        values.tipo = e.target.value
    }

    function onChangeTags(){
        values.tags = instances['0'].chipsData
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/storeCourse', values)
    }


    return(
        
    <>
        <div className="row">                
            <div className="col s12">
                <div className="card ">
                    <div className="card-content">
                    {/* <div className="fixed-action-btn">
                        <a className="btn-floating btn-large waves-effect waves-light  teal darken-3 modal-trigger" href="#modalAddCourse"><i className="material-icons">add_circle_outline</i></a>
                    </div> */}
                    {/* <div id="modalAddCourse" className="modal little-modal"> */}
                        <form onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <div className="row">
                                    <ul id="tabs-swipe-demo" class="tabs" style={{"marginBottom": "20px"}}>
                                        <li class="tab col s4"><a href="#create1" class="active" >1. Generalidades</a></li>
                                        <li class="tab col s4"><a href="#create2">2. Participantes</a></li>
                                        <li class="tab col s4"><a href="#create3">3. Presentación</a></li>
                                    </ul>

                                    <div id="create2" class="col s12"><Create2 change = {handleChange} values = {useState} onValueChange ={onValueChange}/></div>
                                    <div id="create1" class="col s12"><Create1 change = {handleChange} values = {useState} onChangeTags ={onChangeTags}/></div>
                                    <div id="create3" class="col s12"><Create3 change = {handleChange} values = {useState}/></div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

FormCurso.layout = page => <Layout children={page} title="Agregar curso" pageTitle="AGREGAR CURSO"/>

export default FormCurso