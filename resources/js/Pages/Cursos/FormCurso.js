import React, { useState, useEffect } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';

import Create1 from '../../components/cursos/create/Create1.js' 
import Create2 from '../../components/cursos/create/Create2.js' 
import Create3 from '../../components/cursos/create/Create3.js' 
import '../../styles/cursos.css'
import { values } from 'lodash';


function initializeModals() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // TABS
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
}

var instances;
var instancesDate;
var instancesDate2;
var instances3;

function initializeChips() {
    var elems = document.querySelectorAll('.chips');
    instances = M.Chips.init(elems);

    var elems2 = document.querySelectorAll('.tooltipped');
    var instancesT = M.Tooltip.init(elems2);

    var elems3 = document.querySelectorAll('select');
    var options3;
    instances3 = M.FormSelect.init(elems3, options3);
}


const FormCurso = ({capacitaciones}) => {
    //errores de validación 
    const { errors } = usePage().props

    useEffect(() => {
        initializeDatePicker();
    }, [])

    useEffect(() => {
        initializeModals();
    }, [])

    useEffect(() => {
        initializeChips();
    }, [])

    function initializeDatePicker() {
        var elems = document.querySelectorAll('.datepicker');
        var options = {
            format: 'yyyy-mm-dd',
            setDefaultDate: false,
            defaultDate: new Date(2021,0,1),
            i18n: {
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                weekdaysAbbrev: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
                selectMonths: true,
                selectYears: 100, // Puedes cambiarlo para mostrar más o menos años
                today: 'Hoy',
                clear: 'Limpiar',
                close: 'Ok',
                cancel: 'Cancelar',
                labelMonthNext: 'Siguiente mes',
                labelMonthPrev: 'Mes anterior',
                labelMonthSelect: 'Selecciona un mes',
                labelYearSelect: 'Selecciona un año',
            },
            onClose: ()=>{
                values.fecha_inicio =document.getElementById("fecha_inicio").value;
                values.fecha_final =document.getElementById("fecha_final").value;
                values.inscIni =document.getElementById("inscIni").value;
                values.inscFin =document.getElementById("inscFin").value;
            },
          };
        instancesDate = M.Datepicker.init(elems, options);
    
        var elems2 = document.querySelectorAll('.timepicker');
        var options2 ={
            format: 'yyyy-mm-dd',
            i18n: {
                done: 'Ok',
                cancel: 'Cancelar',
            }
          };
        instancesDate2 = M.Timepicker.init(elems2, options2);
    }
    
    const [values, setValues] = useState({
        nombre : "",
        tags : [],
        fecha_inicio : "",
        fecha_final : "",
        link : "",
        vc:true,
        tipos_de_capacitacion: [],
        active: true,
        inscIni:"",
        inscFin: "",
        tipo_inscripcion: "",
        descripcion: "",
        imgs: "",
        maximo: "",
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
        values.tipo_inscripcion = e.target.value
    }

    function onChangeTags(){
        values.tags = instances['0'].chipsData
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/storeCourse', values)
    }

    function changeSwitch() {
        values.vc ? values.vc = false : values.vc = true
    }

    function changeCK(description){
        console.log(description)
        values.descripcion = description
    }

    function changeSelect(){
        values.tipos_de_capacitacion = instances3[0].getSelectedValues();
    }

    return(
        
    <>
        <div className="row">                
            <div className="col s12">
                <div className="card ">
                    <div className="card-content">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="modal-content">
                                <div className="row">
                                    <ul id="tabs-swipe-demo" className="tabs" style={{"marginBottom": "20px"}}>
                                        <li className="tab col s4"><a href="#create1" className="active" >1. Generalidades</a></li>
                                        <li className="tab col s4"><a href="#create2">2. Participantes</a></li>
                                        <li className="tab col s4"><a href="#create3">3. Presentación</a></li>
                                    </ul>

                                    <div id="create2" className="col s12"><Create2 
                                                                            change = {handleChange} 
                                                                            values = {useState} 
                                                                            onValueChange ={onValueChange} 
                                                                            errors ={ errors }
                                                                            capacitaciones = {capacitaciones}
                                                                            changeSelect ={changeSelect}/></div>
                                    <div id="create1" className="col s12"><Create1 
                                                                            change = {handleChange} 
                                                                            values = {useState} 
                                                                            onChangeTags ={onChangeTags} 
                                                                            // onChangeDateIni ={onChangeDateIni} 
                                                                            changeSwitch = {changeSwitch}
                                                                            errors ={ errors }/></div>
                                    <div id="create3" className="col s12"><Create3 
                                                                            change = {handleChange} 
                                                                            values = {useState} 
                                                                            setValues ={setValues}
                                                                            errors ={ errors }
                                                                            changeCK ={changeCK}/></div>
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