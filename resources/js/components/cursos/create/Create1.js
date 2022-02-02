import { first, functionsIn } from 'lodash'
import React from 'react'
import { useState, useEffect } from 'react'

var i = 0;

const Create1 = ({ change, values, onChangeTags, errors, changeSwitch, changeTime, addSchedule, refreshSchedule }) => {

    return (
        <div className="row" style={{ "marginLeft": "-1.5rem", "marginRight": "-1.5rem" }}>
            <div className="input-field col s12" >
                <input disabled={false} id="nombre" type="text" className={errors.nombre ? "validate form-control invalid" : "validate form-control"} name="nombre" required autoComplete="nombre" value={values.nombre} onChange={change} autoFocus maxLength="255" />
                <label htmlFor="nombre">Nombre del curso</label>
                {
                    errors.nombre &&
                    <span className="helper-text" data-error={errors.nombre} style={{ "marginBottom": "10px" }}>{errors.nombre}</span>
                }
            </div>

            <div className="input-field col s12">
                <p style={{ "marginTop": "0px", "marginBottom": "0px", "fontFamily": "Montserrat", "fontSize": "13px" }}>Tags de búsqueda<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Los tags ayudarán con el filtrado y búsqueda de los cursos (Enter para agregar)" style={{ "color": "rgb(159, 157, 157)", "cursor": "pointer" }}>help_outline</i></p>
                <div className="chips">
                    <input className="custom-class" id="tags" required onChange={onChangeTags} className={errors.tags ? "validate form-control invalid" : "validate form-control"} />
                    {
                        errors.tags &&
                        <span className="helper-text" data-error={errors.tags} style={{ "marginBottom": "10px" }}>{errors.tags}</span>
                    }
                </div>

            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input id="fecha_inicio" value={values.fecha_inicio} required type="text" autoFocus className={errors.fecha_inicio ? "validate datepicker invalid" : "validate datepicker"} />
                <label htmlFor="fecha_inicio">Fecha de inicio de curso</label>
                {
                    errors.fecha_inicio &&
                    <span className="helper-text" data-error={errors.fecha_inicio} style={{ "marginBottom": "10px" }}>{errors.fecha_inicio}</span>
                }
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input id="fecha_final" value={values.fecha_final} required type="text" autoFocus className={errors.fecha_final ? "validate datepicker invalid" : "validate datepicker"} />
                <label htmlFor="fecha_final">Fecha de término de curso</label>
                {
                    errors.fecha_final &&
                    <span className="helper-text" data-error={errors.fecha_final} style={{ "marginBottom": "10px" }}>{errors.fecha_final}</span>
                }
            </div>


            <div className="input-field col s12 m6 l6 xl6">
                <input id="link" value={values.link} onChange={change} autoFocus required type="url" className={errors.tags ? "validate form-control invalid" : "validate form-control"} />
                <label htmlFor="link">Link de videoconferencias</label>
                {
                    errors.link &&
                    <span className="helper-text" data-error={errors.link} style={{ "marginBottom": "10px" }}>{errors.link}</span>
                }
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <p style={{ "marginTop": "0px", "marginBottom": "8px", "fontFamily": "Montserrat", "fontSize": "13px" }}>Valor curricular</p>
                <div className="switch">
                    <label>
                        Sí
                        <input id="vc" value={values.vc} onClick={changeSwitch} type="checkbox" />
                        <span className="lever"></span>
                        No
                    </label>
                </div>
            </div>

            <div id="div_contenedor" className="input-field col s12">
                <p style={{ "marginTop": "0px", "marginBottom": "0px", "fontFamily": "Montserrat", "fontSize": "13px" }}>Horario semanal</p>

                <div id="div_time" className="div-row-horario" style={{ "marginTop": "5px" }}>
                    {/* select para los dias de las semana */}
                    <div className="col s12 m4 l4">
                        <select multiple="multiple" id="dias_de_la_semana" className="schedule" onChange={changeTime}>
                            <option value="0" disabled>Selecciona los días con el mismo horario</option>
                            <option id="lunes" value='lunes'>Lunes</option>
                            <option id="martes" value='martes'>Martes</option>
                            <option id="miercoles" value='miercoles'>Miercoles</option>
                            <option id="jueves" value='jueves'>Jueves</option>
                            <option id="viernes" value='viernes'>Viernes</option>
                            <option id="sabado" value='sabado'>Sabado</option>
                            <option id="domingo" value='domingo'>Domingo</option>
                        </select>
                    </div>
                    {/* div para hora de inicio */}
                    <div className="col s12 m4 l4 center-align">
                        <div className="input-field">
                            <input id="hora_inicio" type="text" className="timepicker input-hora" />
                            <label htmlFor="">Hr inicio</label>
                        </div>
                    </div>
                    {/* div para hora de finalizacion */}
                    <div className="col s12 m4 l4 center-align">
                        <div className="input-field">
                            <input id="hora_final" type="text" className="timepicker input-hora" />
                            <label htmlFor="">Hr fin</label>
                        </div>
                    </div>

                    {/* <i onClick={deleteTime} className="days material-icons" style={{"color":"#D3766A", "cursor":"pointer", "marginRight":"13px"}}>do_not_disturb_on</i>
                    <label>
                        <input className="group1" type="radio" value = "Lu" onClick={onDayChange}/>
                        <span className="span-radio-courses">Lu</span>
                    </label>
                    <label>
                        <input className="group1" type="radio" value = "Ma" onClick={onDayChange}/>
                        <span className="span-radio-courses">Ma</span>
                    </label>
                    <label>
                        <input className="group1" type="radio" value = "Mi" onClick={onDayChange}/>
                        <span className="span-radio-courses">Mi</span>
                    </label>
                    <label>
                        <input className="group1" type="radio" value = "Jue" onClick={onDayChange}/>
                        <span className="span-radio-courses">Jue</span>
                    </label>
                    <label>
                        <input className="group1" type="radio" value = "Vie" onClick={onDayChange}/>
                        <span className="span-radio-courses">Vi</span>
                    </label>
                    <label>
                        <input className="group1" type="radio" value = "Sa" onClick={onDayChange}/>
                        <span className="span-radio-courses">Sa</span>
                    </label>
                    <label>
                        <input className="group1" type="radio" value = "Do" onClick={onDayChange}/>
                        <span className="span-radio-courses">Do</span>
                    </label>

                    <div className="input-field col s6 m3 l3 xl3">
                        <input type="text" className="timepicker input-hora" style={{"width":"100px"}} />
                        <label htmlFor="">Hr inicio</label>
                    </div>
                    <div className="input-field col s6 m3 l3 xl3">
                        <input type="text" className="timepicker input-hora" style={{"width":"100px"}} />
                        <label htmlFor="">Hr fin</label>
                    </div> */}

                </div>

                <div id="div_contenedor" className="input-field col s12">
                    <p style={{ "marginTop": "0px", "marginBottom": "0px", "fontFamily": "Montserrat", "fontSize": "13px" }}>HORARIOS SELECCIONADOS</p>
                    <div id="horario_lunes" style={{ "display": "none" }}></div>
                    <div id="horario_martes" style={{ "display": "none" }}></div>
                    <div id="horario_miercoles" style={{ "display": "none" }}></div>
                    <div id="horario_jueves" style={{ "display": "none" }}></div>
                    <div id="horario_viernes" style={{ "display": "none" }}></div>
                    <div id="horario_sabado" style={{ "display": "none" }}></div>
                    <div id="horario_domingo" style={{ "display": "none" }}></div>
                </div>
                {/* botones para agregar horario y volver a empezar */}
                <div className="col s12 valign-wrapper">
                    Agrega otro horario<i id="btnAdd" className="material-icons" onClick={addSchedule} style={{ "color": "#108058", "cursor": "pointer", "marginLeft": "5px", "fontSize": "16px" }}>add_circle</i>
                </div>
                <div className="col s12 valign-wrapper">
                    Volver a empezar<i onClick={refreshSchedule} className="days material-icons" style={{ "color": "#D3766A", "cursor": "pointer", "marginRight": "13px", "fontSize": "16px" }}>do_not_disturb_on</i>
                </div>

            </div>

        </div>
    )

}

export default Create1