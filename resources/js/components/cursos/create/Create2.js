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

const Create2 = ({ change, values, onValueChange, errors}) => {
    useEffect(() => {
        initializeChips();
    }, [])

    const [valores, setValues] = useState({
        dates : true,
    })

    function onViewChange (){
        valores.dates ? (valores.dates = false,  document.getElementById("div_fechas_insc").style.display = "none") : (valores.dates = true, document.getElementById("div_fechas_insc").style.display = "block") 

    }

    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12">
                {/* <input  id="categorias" value={values.categorias} onChange={change} type="text" className="validate"/>
                <label htmlFor="categorias">Categorías de estudiante permitidas</label> */}
                <select multiple id="tipos_de_capacitacion" >
                    <option value="0" disabled selected>Selecciona al menos una opción</option>
                    <option value="1">Capacitación 1</option>
                    <option value="2">Capacitación 2</option>
                    <option value="3">Capacitación 3</option>
                    </select>
                <label>Tipos de capacitación de estudiante permitidas</label>
            </div>

            <div className="input-field col s12">
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Cantidad máxima de alumnos permitidos<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="máximo de alumnos permitidos" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <input  id="maximo" value={values.maximo} onChange={change} type="number" min="0" className={errors.tags ? "validate form-control invalid" : "validate form-control"}/>
                {
                errors.maximo &&
                <span className="helper-text" data-error={errors.maximo} style={{ "marginBottom": "10px" }}>{errors.maximo}</span>
                }
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
                {
                errors.tipo_inscripcion &&
                <span className="helper-text" data-error={errors.tipo_inscripcion} style={{ "marginBottom": "10px" }}>{errors.tipo_inscripcion}</span>
                }
            </div>

            <div className="input-field col s12 m6 l6 xl6" style={{"paddingBottom": "10px !important","height":"110px"}}>
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Activar fechas de inscripción<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Plazo de inscripciones permitido" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <div className="switch">
                    <label>
                    Si
                    <input id="active" className="fechas_insc" value={valores.dates} onClick={onViewChange} type="checkbox"/>
                    <span className="lever"></span>
                    No
                    </label>
                </div>
            </div>

            <div id="div_fechas_insc" style={{"display":"block"}}>
                <div className="input-field col s12 m6 l6 xl6">
                    <input  id="inscIni" value={values.inscIni} type="text" className="validate datepicker"/>
                    <label htmlFor="inscIni">Fecha de inicio de inscripciones</label>
                </div>

                <div className="input-field col s12 m6 l6 xl6">
                    <input  id="inscFin" value={values.inscFin} type="text" className="validate datepicker"/>
                    <label htmlFor="inscFin">Fecha de término de inscripciones</label>
                </div>
            </div>
            {/* <div className="col s12" style={{"padding":"0px", "marginTop": "5px"}}>
                <div className="col s2 left ">
                    <a  href="#" className="btn-Next-Modal"><i className="material-icons tiny">chevron_left</i>Regresar </a>
                </div>
                <div className="col s2 right">
                    <a  href="#" className="btn-Next-Modal right">Siguiente <i className="material-icons tiny">chevron_right</i></a>
                </div>
            </div> */}
            
        </div>

    )
       
}

export default Create2