import { first, functionsIn } from 'lodash'
import React from 'react'
import {useState, useEffect } from 'react'

var i=0;

const Create1 = ({ change, values, onChangeTags, errors, changeSwitch}) => {
    
    const [valores, setValues] = useState({
        Lu:false,
        Ma:false,
        Mi:false,
        Jue:false,
        Vie:false,
        Sa:false,
        Do:false,
    })
    
    function addTime() { 
        if(valores.Lu ==true && valores.Ma ==true && valores.Mi ==true 
            && valores.Jue ==true && valores.Vie ==true && valores.Sa ==true && valores.Do ==true){
            alert("Ya has seleccionado todos los días disponibles")
        }
        else {
            var elemento = document.getElementById("div_time"); //obtiene el elemento a clonar
            var newElemento = elemento.cloneNode(true); //clona el elemeno
            var btnLess = newElemento.getElementsByClassName("days")[0];//obtiene el icono de borrar 
            btnLess.onclick = function(){deleteTime()}; //le agrega la función de borrar
            
            var dias = newElemento.getElementsByClassName("group1"); //seleccionamos el grupo de radios 
            var valueDays = ['Lu', 'Ma', 'Mi', 'Jue', 'Vie', 'Sa', 'Do'];
            for (let index = 0; index < dias.length; index++) {//les agregamos el evento
                dias[index].addEventListener("click", onDayChange);        
            }
            
            var contenedor = document.getElementById("div_contenedor");//obtiene el div padre
            contenedor.appendChild(newElemento);  //inserta elemento en div padre
        }
        
    }

    function deleteTime(){
        var contenedor = document.getElementById("div_contenedor");
        if(i>0){
            i--;
            document.getElementById("btnAdd").style.display = "inline";
            var ultimo = contenedor.lastChild;
            contenedor.removeChild(ultimo);
        }  
    }

    function onDayChange(e){
        var dia = e.target.value;

        switch (dia) {
            case "Lu":
                if (valores.Lu){
                    alert("Ya elegiste ese día");
                    e.target.disabled = true;
                }
                else {
                    setValues (valores =>({
                        ... valores,
                        Lu : true,
                    }));
                }
                break;
            
            case "Ma":
                if (valores.Ma){
                    alert("Ya elegiste ese día");
                }
                else {
                    setValues (valores =>({
                        ... valores,
                        Ma : true,
                    }));
                }
                
                break;
            case "Mi":
                if (valores.Mi){
                    alert("Ya elegiste ese día");
                    console.log("Ya elegiste ese día");
                    e.target.disabled = true;
                }
                else {
                    setValues (valores =>({
                        ... valores,
                        Mi : true,
                    }))
                }
                
                break;
        
            case "Jue":
                if (valores.Jue){
                    alert("Ya elegiste ese día");
                }
                else {
                    setValues (valores =>({
                        ... valores,
                        Jue : true,
                    }))

                }
                
                break;
            case "Vie":
                if (valores.Vie){
                    alert("Ya elegiste ese día");
                }
                else {
                    setValues (valores =>({
                        ... valores,
                        Vie : true,
                    }))
                }
                
                break;
            case "Sa":
                if (valores.Sa){
                    alert("Ya elegiste ese día");
                }
                else {
                    setValues (valores =>({
                        ... valores,
                        Sa : true,
                    }))

                }
                
                break;
            case "Do":
                if (valores.Do){
                    alert("Ya elegiste ese día");
                }
                else {
                    setValues (valores =>({
                        ... valores,
                        Do : true,
                    }))
                }
                
                break;
        }
        
    }

    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12" >
            <input disabled={false} id="nombre" type="text" className={errors.nombre ? "validate form-control invalid" : "validate form-control"} name="nombre" required autoComplete="nombre" value={values.nombre} onChange={change} autoFocus maxLength="255" />
                <label htmlFor="nombre">Nombre del curso</label>
                {
                    errors.nombre &&
                    <span className="helper-text" data-error={errors.nombre} style={{ "marginBottom": "10px" }}>{errors.nombre}</span>
                }
            </div>
            
            <div className="input-field col s12">
            <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Tags de búsqueda<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Los tags ayudarán con el filtrado y búsqueda de los cursos (Enter para agregar)" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <div className="chips">
                    <input className="custom-class" id="tags" value={values.tags} required onChange={onChangeTags}  className={errors.tags ? "validate form-control invalid" : "validate form-control"}/>
                    {
                        errors.tags &&
                        <span className="helper-text" data-error={errors.tags} style={{ "marginBottom": "10px" }}>{errors.tags}</span>
                    }
                </div>
                
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="fecha_inicio" value={values.fecha_inicio}  required type="text" className={errors.fecha_inicio ? "validate datepicker invalid" : "validate datepicker"}/>
                <label htmlFor="fecha_inicio">Fecha de inicio de curso</label>
                {
                errors.fecha_inicio &&
                <span className="helper-text" data-error={errors.fecha_inicio} style={{ "marginBottom": "10px" }}>{errors.fecha_inicio}</span>
                }
            </div>
            
            <div className="input-field col s12 m6 l6 xl6">
                <input  id="fecha_final" value={values.fecha_final}  required type="text" className={errors.fecha_final ? "validate datepicker invalid" : "validate datepicker"}/>
                <label htmlFor="fecha_final">Fecha de término de curso</label>
                {
                errors.fecha_final &&
                <span className="helper-text" data-error={errors.fecha_final} style={{ "marginBottom": "10px" }}>{errors.fecha_final}</span>
                }
            </div>
            

            <div className="input-field col s12 m6 l6 xl6">
                <input  id="link" value={values.link} onChange={change} required type="url" className={errors.tags ? "validate form-control invalid" : "validate form-control"}/>
                <label htmlFor="link">Link de videoconferencias</label>
                {
                errors.link &&
                <span className="helper-text" data-error={errors.link} style={{ "marginBottom": "10px" }}>{errors.link}</span>
                }
            </div>

            <div className="input-field col s12 m6 l6 xl6">
                <p style={{"marginTop":"0px", "marginBottom":"8px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Valor curricular</p>
                <div className="switch">
                    <label>
                    Si
                    <input id="vc" value={values.vc} onClick={changeSwitch} type="checkbox"/>
                    <span className="lever" ></span>
                    No
                    </label>
                </div>
            </div>

            <div id="div_contenedor" className="input-field col s12">
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Horario semanal<i id="btnAdd" className="material-icons tiny" onClick={addTime} style={{"color":"#108058", "cursor":"pointer", "marginLeft":"5px"}}>add_circle</i></p>
                <div id="div_time" className="div-row-horario" style={{"marginTop":"5px"}}>
                    <i onClick={deleteTime} className="days material-icons" style={{"color":"#D3766A", "cursor":"pointer", "marginRight":"13px"}}>do_not_disturb_on</i>
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
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
       
}

export default Create1