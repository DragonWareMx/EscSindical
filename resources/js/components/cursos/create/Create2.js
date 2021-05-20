import React from 'react'
import { useEffect, useState } from 'react'

function fechasInscripcion(){
    var input = document.getElementsByClassName('fechas_insc').value;
    alert(input);
}
function initializeChips() {
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems);

    var elems2 = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems2);
}
function initializeDatePicker() {
    var elems = document.querySelectorAll('.datepicker');
    var options = {
        format: 'yyyy-mm-dd',
        setDefaultDate: true,
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
        }
      };
    var instances = M.Datepicker.init(elems, options);

    var elems3 = document.querySelectorAll('select');
    var options3;
    var instances3 = M.FormSelect.init(elems3, options3);
  }

const Create2 = ({ change, values, onValueChange }) => {
    useEffect(() => {
        initializeChips();
    }, [])

    useEffect(() => {
        initializeDatePicker();
    }, [])
    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12">
                {/* <input  id="categorias" value={values.categorias} onChange={change} type="text" className="validate"/>
                <label for="categorias">Categorías de estudiante permitidas</label> */}
                <select multiple id="categorias" onChange={change}>
                    <option value="" disabled selected>Selecciona al menos una opción</option>
                    <option value="1">Categoría 1</option>
                    <option value="2">Categoría 2</option>
                    <option value="3">Categoría 3</option>
                    </select>
                <label>Categorías de estudiante permitidas</label>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Tipo de inscripción al curso<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Tipo de inscripción para los estudiantes a este curso" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <p>
                    <label>
                        <input name="group1" type="radio" value="Automática"  onChange={onValueChange} />
                        <span className="span-radio-courses">Automática</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio"  value="Solicitud" onChange={onValueChange} />
                        <span className="span-radio-courses">Solicitud</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio"  value="Sólo yo" onChange={onValueChange} />
                        <span className="span-radio-courses">Sólo yo puedo inscribir participantes</span>
                    </label>
                </p>
                
            </div>

            <div className="input-field col s12 m6 l6 xl6" style={{"paddingBottom": "10px !important","height":"110px"}}>
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Activar fechas de inscripción<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Plazo de inscripciones permitido" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <div class="switch">
                    <label>
                    Si
                    <input id="active" className="fechas_insc" value={values.active} onChange="fechasInscripcion()" type="checkbox"/>
                    <span class="lever"></span>
                    No
                    </label>
                </div>
            </div>

            <div id="div_fechas_insc" style={{"display":"block"}}>
                <div className="input-field col s12 m6 l6 xl6">
                    <input  id="inscIni" value={values.inscIni} onChange={change} type="text" className="validate datepicker"/>
                    <label for="inscIni">Fecha de inicio de inscripciones</label>
                </div>

                <div className="input-field col s12 m6 l6 xl6">
                    <input  id="inscFin" value={values.inscFin} onChange={change} type="text" className="validate datepicker"/>
                    <label for="inscFin">Fecha de término de inscripciones</label>
                </div>
            </div>
            {/* <div className="col s12" style={{"padding":"0px", "marginTop": "5px"}}>
                <div className="col s2 left ">
                    <a  href="#" className="btn-Next-Modal"><i class="material-icons tiny">chevron_left</i>Regresar </a>
                </div>
                <div className="col s2 right">
                    <a  href="#" className="btn-Next-Modal right">Siguiente <i class="material-icons tiny">chevron_right</i></a>
                </div>
            </div> */}
            
        </div>

    )
       
}

export default Create2