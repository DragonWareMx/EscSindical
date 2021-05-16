import React from 'react'
import { useEffect, useState } from 'react'


function initializeChips() {
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems);

    var elems2 = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems2);
}

const Create2 = ({ change, values, onValueChange }) => {
    
    
    useEffect(() => {
        initializeChips();
    }, [])
    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12" >
                <input  id="categorias" value={values.categorias} onChange={change} type="text" className="validate"/>
                <label for="categorias">Categorías de estudiante permitidas</label>
            </div>

            {/* <div className="input-field col s12 yellow" style={{"paddingBottom": "10px !important"}}>
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Activar fechas de inscripción</p>
                <div class="switch">
                    <label>
                    Si
                    <input id="active" value={values.active} onChange={change} type="checkbox"/>
                    <span class="lever"></span>
                    No
                    </label>
                </div>
            </div> */}

            <div className="input-field col s6">
                <input  id="inscIni" value={values.inscIni} onChange={change} type="date" className="validate"/>
                <label for="inscIni">Fecha de inicio de inscripciones</label>
            </div>

            <div className="input-field col s6" >
                <input  id="inscFin" value={values.inscFin} onChange={change} type="date" className="validate"/>
                <label for="inscFin">Fecha de término de inscripciones</label>
            </div>

            <div className="input-field col s12">
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Activar fechas de inscripción</p>
                <p>
                    <label>
                    <input tipo="group1" type="radio" value="Automática"  onChange={onValueChange} />
                        <span style={{"width":"100%"}}>Automática</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input tipo="group1"  type="radio" value="Solicitud" onChange={onValueChange} />
                        <span>Solicitud</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input tipo="group1" type="radio" value="Sólo yo" onChange={onValueChange} />
                        <span>Sólo yo puedo inscribir participantes</span>
                    </label>
                </p>
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