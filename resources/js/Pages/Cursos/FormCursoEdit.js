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



const FormCursoEdit = ({capacitaciones, curso}) => {

    function initializeChips() {
    var elems = document.querySelectorAll('.chips');
    instances = M.Chips.init(elems);

    curso.tags.forEach( element => { //SÓLO EN EDITAR, lleno el input de tags con los tags que ya tiene el curso
        instances['0'].addChip({
        tag: element.nombre, 
        });
    });

    var elems2 = document.querySelectorAll('.tooltipped');
    var instancesT = M.Tooltip.init(elems2);

    var elems3 = document.querySelectorAll('select');
    var options3;
    instances3 = M.FormSelect.init(elems3, options3);
    

    var radio = document.getElementById(curso.tipo_acceso);
    radio.checked = true;

    var sw = document.getElementById('vc'); //activo o no el switch de valor curricular, dependiendo de lo que dice el curso a editar
    values.vc ? sw.checked = false : sw.checked = true;     

    
    var sw2 = document.getElementById('active'); //activo o no el switch de fechas de inscripción
    values.inicio_inscripciones == "" ? sw2.checked = true : sw2.checked = false;     

    
    }
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
                setValues (values =>({
                    ... values,
                    fecha_inicio : document.getElementById("fecha_inicio").value,
                    fecha_final : document.getElementById("fecha_final").value,
                    inicio_inscripciones : document.getElementById("inicio_inscripciones").value,
                    final_inscripciones : document.getElementById("final_inscripciones").value,
                }))
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
        nombre : curso.nombre,
        tags : "",
        fecha_inicio : curso.fecha_inicio,
        fecha_final : curso.fecha_final,
        link : curso.link,
        vc: Boolean(curso.valor_curricular),
        tipos_de_capacitacion: [],
        active: true,
        inicio_inscripciones:curso.inicio_inscripciones,
        final_inscripciones: curso.fecha_limite,
        tipo_inscripcion: curso.tipo_acceso,
        descripcion: curso.descripcion,
        imgs: "",
        maximo: curso.max,
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
        var tipo = e.target.value
        setValues (values =>({
            ... values,
            tipo_inscripcion: tipo
        }))
    }

    function onChangeTags(){
        setValues (values =>({
            ... values,
            tags : instances['0'].chipsData
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/updateCourse/'+curso.id, values)
    }

    function changeSwitch() {
        values.vc ? 
        setValues (values =>({
            ... values,
            vc : false,
        })) 
        : 
        setValues (values =>({
            ... values,
            vc : true,
        }))
    }

    function changeCK(description){
        setValues (values =>({
            ... values,
           descripcion : description
        }))
    }

    function changeSelect(){
        setValues (values =>({
            ... values,
            tipos_de_capacitacion: instances3[0].getSelectedValues(),
        }))
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
                                                                            values = {useState, values} 
                                                                            onValueChange ={onValueChange} 
                                                                            errors ={ errors }
                                                                            capacitaciones = {capacitaciones}
                                                                            changeSelect ={changeSelect}/></div>
                                    <div id="create1" className="col s12"><Create1 
                                                                            change = {handleChange} 
                                                                            values = {useState, values} 
                                                                            onChangeTags ={onChangeTags} 
                                                                            // onChangeDateIni ={onChangeDateIni} 
                                                                            changeSwitch = {changeSwitch}
                                                                            errors ={ errors }/></div>
                                    <div id="create3" className="col s12"><Create3 
                                                                            change = {handleChange} 
                                                                            values = {useState, values} 
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

FormCursoEdit.layout = page => <Layout children={page} title="Editar curso" pageTitle="EDITAR CURSO"/>

export default FormCursoEdit