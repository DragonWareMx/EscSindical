import React from 'react'
import { useEffect } from 'react'

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
        }
      };
    var instances = M.Datepicker.init(elems, options);
  }


const Create1 = ({ change, values, onChangeTags }) => {
    useEffect(() => {
        initializeDatePicker();
    }, [])

    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12" >
                <input  id="nombre" value={values.nombre} onChange={change} type="text" required className="validate"/>
                <label for="nombre">Nombre del curso</label>
            </div>

            <div className="input-field col s12">
            <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Tags de búsqueda<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Los tags ayudarán con el filtrado y búsqueda de los cursos (Enter para agregar)" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <div className="chips">
                    <input className="custom-class" id="tags" value={values.tags} required onChange={onChangeTags}  className="validate"/>
                </div>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="dateIni" value={values.dateIni} onChange={change} required type="text" className="validate datepicker"/>
                <label for="dateIni">Fecha de inicio de curso</label>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="dateFin" value={values.dateFin} onChange={change} required type="text" className="validate datepicker"/>
                <label for="dateFin">Fecha de término de curso</label>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="link" value={values.link} onChange={change} required type="url" className="validate"/>
                <label for="link">Link de videoconferencias</label>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <p style={{"marginTop":"0px", "marginBottom":"8px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Valor curricular</p>
                <div class="switch">
                    <label>
                    Si
                    <input id="vc" value={values.vc} onChange={change} required type="checkbox"/>
                    <span class="lever"></span>
                    No
                    </label>
                </div>
            </div>

            <div className="input-field col s12">
            <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Horario semanal<i className="material-icons tiny" style={{"color":"#108058", "cursor":"pointer", "marginLeft":"5px"}}>control_point</i></p>
            </div>
            
        </div>

       

        //     {/*falta lo de los horarios  */}
        //     <label>Siguiente</label>
    )
       
}

export default Create1