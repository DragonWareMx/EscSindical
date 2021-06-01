import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useState, useEffect } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import '/css/alertas.css'


import '/css/participantes.css'
import '/css/modulos.css'
import route from 'ziggy-js';
import Alertas from '../../components/common/Alertas';

function tooltip(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}



const Solicitudes = ({curso}) => {
    //errores de la validacion de laravel
    const { errors } = usePage().props
    //errores de la validacion de laravel
    const { flash } = usePage().props

    useEffect(() => {
        tooltip();
    }, [])

    useEffect(() => {
        openAlert('alert_error');
    }, [errors])

    //valores para formulario
    const [values, setValues] = useState({
        solicitud: [],
        aprobado: null
    })

    function seleccionar_todo(){
        for (var i=0;i<document.form_solicitudes.elements.length;i++)
            if(document.form_solicitudes.elements[i].type == "checkbox")
                document.form_solicitudes.elements[i].checked=true;

        document.getElementById("txt-select-all").style.display = "none";
        document.getElementById("txt-select-all-not").style.display = "block";
     }
    
     function seleccionar_todo_not(){
        for (var i=0;i<document.form_solicitudes.elements.length;i++)
            if(document.form_solicitudes.elements[i].type == "checkbox")
                document.form_solicitudes.elements[i].checked=false;

        document.getElementById("txt-select-all").style.display = "block";
        document.getElementById("txt-select-all-not").style.display = "none";
     }

    //para mostrar la fecha de registro
    function parseFecha(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    function handleCheckboxChange(event){
        const value = event.target.value
        const checked = event.target.checked
        if (checked) {
            if (!values.solicitud.includes(value)) {
                setValues(values => ({ solicitud: [...values.solicitud, value]}))
            }
        } else {
            setValues(values => ({ solicitud: values.solicitud.filter(id => id !== value) }));
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        Inertia.post(route('solicitudes.aprobar', curso.id), values, {onFinish: () => {Inertia.get(route('cursos.solicitudes',curso.id),{preserveState: false, data: {errors: errors, flash: flash}})}})
    }

    function closeAlert(type){
        var divsToHide = document.getElementsByClassName(type); //divsToHide is an array
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.visibility = "hidden"; // or
            divsToHide[i].style.display = "none"; // depending on what you're doing
        }
    }

    function openAlert(type){
        var divsToHide = document.getElementsByClassName(type); //divsToHide is an array
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.visibility = "visible"; // or
            divsToHide[i].style.display = "flex"; // depending on what you're doing
        }
    }

    return (
    <>
        <div className="row">
        <form name="form_solicitudes" onSubmit={handleSubmit}>
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                {/* regresar */}
                <InertiaLink  href={route('cursos.participantes', curso.id)}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                SOLICITUDES
            </div>

            <div className="col s12">
                <Alertas />
            </div>

            {errors.solicitud &&
                <div className="col s12">
                    <div className="errores">
                        <ul>
                            <li className="alert_error">
                                <div className="col s11">No se ha seleccionado ningún usuario.</div>
                                <div onClick={() => {closeAlert('alert_error')}} style={{"cursor":"pointer"}}><i className="col s1 tiny material-icons">clear</i></div>
                            </li>
                        </ul>  
                    </div>
                </div>
            }
            {errors.aprobado &&
                <div className="col s12">
                    <div className="errores">
                        <ul>
                            <li className="alert_error">
                                <div className="col s11">Ha ocurrido un error, vuelva a intentarlo.</div>
                                <div onClick={() => {closeAlert('alert_error')}} style={{"cursor":"pointer"}}><i className="col s1 tiny material-icons">clear</i></div>
                            </li>
                        </ul>  
                    </div>
                </div>
            }
            <div className="col s12">
                <a className="a-select-all" id="txt-select-all" onClick={seleccionar_todo}>Seleccionar todos</a>
                <a className="a-select-all" id="txt-select-all-not" onClick={seleccionar_todo_not} style={{"display":"none"}}>Descartar selección</a>
            </div>
            
            {curso.waiting_requests && curso.waiting_requests.length > 0 &&  curso.waiting_requests.map(usuario => (
                <div className="col s12 div-collection-item div-item-solicitudes" key={usuario.id}>
                    <label className="pink">
                        <input type="checkbox" name="solicitud[]" id={usuario.id} value={usuario.id} onChange={handleCheckboxChange} />
                        <span className="P_collection_item col s12" style={{"display":"flex"}}>
                            <InertiaLink  href={route("perfil.public",usuario.id)}><img className="P_collection_image" width="50" height="50" src={usuario.foto ? "/storage/fotos_perfil/"+usuario.foto : "/storage/fotos_perfil/avatar1.jpg"}></img></InertiaLink>
                            <div style={{"width":"max-content","paddingBottom":"0px"}}>
                                <InertiaLink  href={route("perfil.public",usuario.id)} className="P_collection_title">{usuario.nombre} {usuario.apellido_p} {usuario.apellido_m}</InertiaLink>
                                <div className="P_collection_subtitle">{usuario.pivot && usuario.pivot.created_at && parseFecha(usuario.pivot.created_at)}</div>
                            </div>
                        </span>
                    </label>
                </div>
            ))  
            }
            {
                !curso.waiting_requests ? 
                <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                        Sin solicitudes pendientes
                        </div>
                    </span>
                </label>
            </div> 
            : 
            curso.waiting_requests.length == 0 && 
            <div className="col s12 div-collection-item div-item-solicitudes">
            <label className="pink">
                <span className="P_collection_item col s12" style={{"display":"flex"}}>
                    <div style={{"width":"max-content","paddingBottom":"0px"}}>
                    Sin solicitudes pendientes
                    </div>
                </span>
            </label>
        </div>
            }

            <div className="col s12  right">
                <button type="submit" onClick={
                () => {
                    setValues(values => ({
                    ...values,
                    aprobado: true,
                }))}
                } className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Aprobar
                    <i className="material-icons right">task_alt</i>
                </button>
                
                <button type="submit" onClick={
                () => {
                    setValues(values => ({
                    ...values,
                    aprobado: false,
                }))}
                } className="btn-rejacted-soli btn-primary btn waves-effect waves-teal btn-login right  no-uppercase" style={{"height": "40px","backgroundColor":"#D3766A","marginRight":"30px"}}>
                    Rechazar
                    <i className="material-icons right">highlight_off</i>
                </button>
            </div>
        </form>
        </div>
    </>
  )
}

Solicitudes.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="PARTICIPANTES">
    <LayoutCursos children={page} />
  </Layout>
)

export default Solicitudes