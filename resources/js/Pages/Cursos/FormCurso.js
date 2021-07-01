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


const FormCurso = ({capacitaciones}) => {
    
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

    useEffect(() => {
        initializeTimePicker();
        initializeSelects();
    }, [])

    function initializeChips() {
        var elems = document.querySelectorAll('.chips');
        instances = M.Chips.init(elems);
    
        var elems2 = document.querySelectorAll('.tooltipped');
        var instancesT = M.Tooltip.init(elems2);
    }
    
    function initializeSelects(){
        var elems3 = document.querySelectorAll('select');
        var options3;
        instances3 = M.FormSelect.init(elems3, options3);
    }
    
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
    }

    function initializeTimePicker() {
        var elems2 = document.querySelectorAll('.timepicker');
        var options2 ={
            i18n: {
                done: 'Ok',
                cancel: 'Cancelar',
            },
            onCloseEnd: ()=>{
                var dias = instances3[1].getSelectedValues();
                
                    dias.forEach(dia => {
                        if(!document.getElementById(dia).disabled){
                                document.getElementById('horario_'+dia).innerHTML="";
                        }
                        if (!document.getElementById(dia).disabled){
                        switch (dia) {
                            case 'lunes':
                            setValues (values =>({
                                ... values,
                                lunes : document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value,
                            }))
                                document.getElementById('horario_lunes').innerHTML = "<p> Lunes: "+ document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value+"</p>";
                                document.getElementById('horario_lunes').style.display= 'block';
                                break;
                            case 'martes':
                            setValues (values =>({
                                ... values,
                                martes : document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value,
                            }))   
                                document.getElementById('horario_martes').innerHTML = "<p> Martes: "+ document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value+"</p>";
                                document.getElementById('horario_martes').style.display= 'block'; 
                                break;
                            case 'miercoles':
                            setValues (values =>({
                                ... values,
                                miercoles : document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value,
                            }))
                                document.getElementById('horario_miercoles').innerHTML = "<p> Miercoles: "+ document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value+"</p>";
                                document.getElementById('horario_miercoles').style.display= 'block';
                            break;
                            case 'jueves':
                            setValues (values =>({
                                ... values,
                                jueves : document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value,
                            }))
                                document.getElementById('horario_jueves').innerHTML = "<p> Jueves: "    + document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value+"</p>";
                                document.getElementById('horario_jueves').style.display= 'block';    
                            
                            break;
                            case 'viernes':
                            setValues (values =>({
                                ... values,
                                viernes : document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value,
                            }))
                                document.getElementById('horario_viernes').innerHTML = "<p> Viernes: "+ document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value+"</p>";
                                document.getElementById('horario_viernes').style.display= 'block';
                            break;
                            case 'sabado':
                            setValues (values =>({
                                ... values,
                                sabado : document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value,
                            }))
                            document.getElementById('horario_sabado').innerHTML = "<p> Sábado: "+ document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value+"</p>";
                            document.getElementById('horario_sabado').style.display= 'block';
                            break;
                            case 'domingo':
                            setValues (values =>({
                                ... values,
                                domingo : document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value,
                            }))
                            document.getElementById('horario_domingo').innerHTML = "<p> Domingo: "+ document.getElementById("hora_inicio").value +" - "+ document.getElementById("hora_final").value+"</p>";
                            document.getElementById('horario_domingo').style.display= 'block';
                            break;
                            default:
                                break;
                        }
                        }
                    });
                
            },
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
        inicio_inscripciones:"",
        final_inscripciones: "",
        tipo_inscripcion: "",
        descripcion: "",
        imgs: "",
        maximo: "",
        lunes:"",
        martes:"",
        miercoles:"",
        jueves:"",
        viernes:"",
        sabado:"",
        domingo:"",
        lu:false,
        ma:false,
        mi:false,
        jue:false,
        vie:false,
        sa:false,
        do:false,
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
        Inertia.post('/storeCourse', values)
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
       console.log(instances3),
        setValues (values =>({
            ... values,
            tipos_de_capacitacion: instances3[0].getSelectedValues(),
        }))
   }

   function changeTime() {
        setValues (values =>({
            ... values,
            lu:false,
            ma:false,
            mi:false,
            jue:false,
            vie:false,
            sa:false,
            do:false, 
        }));
        var dias = instances3[1].getSelectedValues();
        
        dias.forEach(dia => {
            switch (dia) {
                case 'lunes':
                    setValues (values =>({
                        ... values,
                        lu : true,
                    }))
                    break;
                case 'martes':
                    setValues (values =>({
                        ... values,
                        ma: true,
                    }))
                    break;
                    case 'miercoles':
                setValues (values =>({
                    ... values,
                    mi : true,
                }))
                break;
                case 'jueves':
                setValues (values =>({
                    ... values,
                    jue : true,
                }))
                break;
                case 'viernes':
                setValues (values =>({
                    ... values,
                    vie : true,
                }))
                break;
                case 'sabado':
                setValues (values =>({
                    ... values,
                    sa : true,
                }))
                break;
                case 'domingo':
                setValues (values =>({
                    ... values,
                    do : true,
                }))
                break;
                default:
                    break;
            }
        });
    }

   function addSchedule() {
        var dias = instances3[1].getSelectedValues();
        instances3[1] ="";
        document.getElementById('dias_de_la_semana').value ="";
        dias.forEach(dia => {
            document.getElementById(dia).disabled = true;
        });
        initializeSelects();
   }

   function refreshSchedule(){
    setValues (values =>({
        ... values,
        lunes:"",
        martes:"",
        miercoles:"",
        jueves:"",
        viernes:"",
        sabado:"",
        domingo:"",
        lu:false,
        ma:false,
        mi:false,
        jue:false,
        vie:false,
        sa:false,
        do:false, 
    }));
    document.getElementById('horario_lunes').innerHTML="";
    document.getElementById('horario_martes').innerHTML="";
    document.getElementById('horario_miercoles').innerHTML="";
    document.getElementById('horario_jueves').innerHTML="";
    document.getElementById('horario_viernes').innerHTML="";
    document.getElementById('horario_sabado').innerHTML="";
    document.getElementById('horario_domingo').innerHTML="";

    document.getElementById('lunes').disabled = false;
    document.getElementById('martes').disabled = false;
    document.getElementById('miercoles').disabled = false;
    document.getElementById('jueves').disabled = false;
    document.getElementById('viernes').disabled = false;
    document.getElementById('sabado').disabled = false;
    document.getElementById('domingo').disabled = false;
    document.getElementById('dias_de_la_semana').value ="";
    initializeSelects();
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
                                                                            changeTime ={changeTime}
                                                                            changeSwitch = {changeSwitch}
                                                                            addSchedule ={addSchedule}
                                                                            refreshSchedule={refreshSchedule}
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