import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';

import Edit1 from '../../components/cursos/edit/Edit1.js' 
import Edit2 from '../../components/cursos/edit/Edit2.js' 
import Edit3 from '../../components/cursos/edit/Edit3.js' 
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


const FormCursoEdit = () => {
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
                        <form onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <div className="row">
                                    <ul id="tabs-swipe-demo" class="tabs" style={{"marginBottom": "20px"}}>
                                        <li class="tab col s4"><a href="#edit1" class="active" >1. Generalidades</a></li>
                                        <li class="tab col s4"><a href="#edit2">2. Participantes</a></li>
                                        <li class="tab col s4"><a href="#edit3">3. Presentación</a></li>
                                    </ul>

                                    <div id="edit2" class="col s12"><Edit2 change = {handleChange} values = {useState} onValueChange ={onValueChange}/></div>
                                    <div id="edit1" class="col s12"><Edit1 change = {handleChange} values = {useState} onChangeTags ={onChangeTags}/></div>
                                    <div id="edit3" class="col s12"><Edit3 change = {handleChange} values = {useState}/></div>
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

FormCursoEdit.layout = page => <Layout children={page} title="Editar curso" pageTitle="EDITAR CURSO"/>

export default FormCursoEdit