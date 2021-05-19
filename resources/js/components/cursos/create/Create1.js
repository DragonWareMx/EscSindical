import React from 'react'
import { useEffect } from 'react'




const Create1 = ({ change, values, onChangeTags }) => {

    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12" >
                <input  id="nombre" value={values.nombre} onChange={change} type="text" className="validate"/>
                <label for="nombre">Nombre del curso</label>
            </div>

            <div className="input-field col s12">
            <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Tags de búsqueda<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Los tags ayudarán con el filtrado y búsqueda de los cursos (Enter para agregar)" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <div className="chips">
                    <input className="custom-class" id="tags" value={values.tags} onChange={onChangeTags}  className="validate"/>
                </div>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="dateIni" value={values.dateIni} onChange={change} type="date" className="validate"/>
                <label for="dateIni">Fecha de inicio de curso</label>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="dateFin" value={values.dateFin} onChange={change} type="date" className="validate"/>
                <label for="dateFin">Fecha de término de curso</label>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="link" value={values.link} onChange={change} type="url" className="validate"/>
                <label for="link">Link de videoconferencias</label>
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <p style={{"marginTop":"0px", "marginBottom":"8px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Valor curricular</p>
                <div class="switch">
                    <label>
                    Si
                    <input id="vc" value={values.vc} onChange={change} type="checkbox"/>
                    <span class="lever"></span>
                    No
                    </label>
                </div>
            </div>
            {/* <div className="col s12" style={{"padding":"0px", "marginTop": "5px"}}>
                <div className="col s2 left hide">
                    <a  href="#" className="btn-Next-Modal"><i class="material-icons tiny">chevron_left</i>Regresar </a>
                </div>
                <div className="col s2 right">
                    <a  href="#" className="btn-Next-Modal right">Siguiente <i class="material-icons tiny">chevron_right</i></a>
                </div>
            </div> */}
            
        </div>

       

        //     {/*falta lo de los horarios  */}
        //     <label>Siguiente</label>
    )
       
}

export default Create1