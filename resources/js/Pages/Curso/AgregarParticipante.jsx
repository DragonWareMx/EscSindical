import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useState, useEffect } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'

import '/css/participantes.css'
import '/css/modulos.css'
import '../../styles/usersStyle.css'

import Alertas from '../../components/common/Alertas';
import route from 'ziggy-js';
import Paginacion from '../../components/common/Paginacion';

function tooltip(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);

    var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
}

const AgregarParticipante = ({curso, users, request}) => {
    //errores de la validacion de laravel
    const { errors } = usePage().props
    //errores de la validacion de laravel
    const { flash } = usePage().props

    const [state, setState] = useState({
        typingTimeout: 0,
        filter: request.filter ?? "nombre"
    })

    //valores para formulario
    const [values, setValues] = useState({
        solicitud: []
    })

    useEffect(() => {
        tooltip();

        //si hay una busqueda en el url se pone en el input
        if (request.user_search) {
            const elem = document.getElementById('user_search');
            elem.value = request.user_search;
        }
    }, [])

    useEffect(() => {
        openAlert('alert_error');
    }, [errors])

    function seleccionar_todo(){
        for (var i=0;i<document.form_solicitudes.elements.length;i++)
            if(document.form_solicitudes.elements[i].type == "checkbox" && document.form_solicitudes.elements[i].disabled == "true")
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

    //realiza la búsqueda cada vez que se escribe en el input
    function changeName(event) {
        if (state.typingTimeout) {
            clearTimeout(state.typingTimeout);
        }

        let search = event.target.value
        let data;

        setState(state => ({
            ...state,
            typingTimeout: setTimeout(function () {
                data = {
                    user_search: search
                }
                data.filter = state.filter
                Inertia.reload({ data: data, only: ['users'] })
            }, 250)
        }));
    }

    //filtros de busqueda
    function filter(filtro) {
        state.filter = filtro
        let data
        switch (filtro) {
            case "matricula":
                //se inicializan los datos del request
                data = {
                    filter: "matricula"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('cursos.agregarParticipante',curso.id).url(),
                    {
                        data: data,
                        only: ['users'],
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "nombre":
                //se inicializan los datos del request
                data = {
                    filter: "nombre"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                    Inertia.replace(route('cursos.agregarParticipante',curso.id).url(),
                        {
                            data: data,
                            only: ['users'],
                            preserveScroll: true,
                            preserveState: true,
                        })
                break;
            case "email":
                //se inicializan los datos del request
                data = {
                    filter: "email"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                    Inertia.replace(route('cursos.agregarParticipante',curso.id).url(),
                        {
                            data: data,
                            only: ['users'],
                            preserveScroll: true,
                            preserveState: true,
                        })
                break;
            default:
                break;
        }
    }

    //checa si el usuario ya está en el curso o no
    function enElCurso(cursos){
        let enCurso = false
        if(cursos.length > 0){
            cursos.forEach(cursoF => {
                if(cursoF.id == curso.id)
                    enCurso = true
            });
            return enCurso
        }
        return false
    }

    function handleSubmit(e){
        e.preventDefault()
        Inertia.post(route('cursos.addStudent', curso.id), values
        , {onFinish: () => {Inertia.get(route('cursos.agregarParticipante',curso.id),{preserveState: false, data: {errors: errors, flash: flash}})}}
        )
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
        <form name="form_solicitudes"  onSubmit={handleSubmit}>
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                {/* regresar */}
                <InertiaLink  href={route('cursos.participantes', curso.id)}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                AGREGAR PARTICIPANTES
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

            <div className="col s12">
                <nav className="searchUsers" style={{"marginTop":"0px !important"}}>
                    <div className="nav-wrapper nav-busqueda">
                        <div className="col filter-div">
                            {/* Dropdown Structure */}
                            <a className="dropdown-trigger" href="#!" data-target="dropdown-filter"><i className="material-icons">filter_alt</i></a>
                            <ul id="dropdown-filter" className="dropdown-content" style={{ top: "0px" }}>
                                <li><a onClick={() => { filter("matricula") }} className={state.filter == "matricula" ? "selected" : ""}>Matrícula</a></li>
                                <li><a onClick={() => { filter("nombre") }} className={request.hasOwnProperty('filter') ? state.filter == "nombre" ? "selected" : "" : "selected"}>Nombre</a></li>
                                <li><a onClick={() => { filter("email") }} className={state.filter == "email" ? "selected" : ""}>Email</a></li>
                            </ul>
                        </div>
                        <div className="input-field col s11" style={{ marginLeft: "0px" }}>
                            <input id="user_search" className="input-search-user" type="search" placeholder="Buscar usuario" onChange={changeName} autoComplete="off"/>
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="col s12" style={{"marginTop":"15px"}}>
                <a className="a-select-all" id="txt-select-all" onClick={seleccionar_todo}>Seleccionar todos</a>
                <a className="a-select-all" id="txt-select-all-not" onClick={seleccionar_todo_not} style={{"display":"none"}}>Descartar selección</a>
            </div>

            {users && users.data && users.data.length > 0 && users.data.map(usuario => (
                <div className="col s12 div-collection-item div-item-solicitudes" key={usuario.id}>
                    <label className="pink">
                        <input type="checkbox" name="solicitud[]" id={usuario.id} value={usuario.id} onChange={handleCheckboxChange} disabled={enElCurso(usuario.courses) ? "disabled" : usuario.active_courses && usuario.active_courses.length == 0 ? "" : "disabled"} />
                        <span className="P_collection_item col s12" style={{"display":"flex"}}>
                            <InertiaLink  href={route("perfil.public",usuario.id)}><img className="P_collection_image" width="50" height="50" src={usuario.foto ? "/storage/fotos_perfil/"+usuario.foto : "/storage/fotos_perfil/avatar1.jpg"}></img></InertiaLink>
                            <div style={{"width":"max-content","paddingBottom":"0px"}}>
                                <InertiaLink  href={route("perfil.public",usuario.id)} className="P_collection_title">{state.filter == "email" && usuario.email + " - "}{state.filter == "matricula" && usuario.matricula + " - "}{usuario.nombre} {usuario.apellido_p} {usuario.apellido_m}</InertiaLink>
                                <div className="P_collection_subtitle">
                                    {enElCurso(usuario.courses) ? "Alumno ya agregado en el curso" : usuario.active_courses && usuario.active_courses.length == 0 ? "Disponible" : "No disponible"}
                                    </div>
                            </div>
                        </span>
                    </label>
                </div>
            ))
            }
            {
                !users ?
                <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                        Inserte una búsqueda
                        </div>
                    </span>
                </label>
            </div>
            :
            !users.data || users.data.length == 0 &&
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                        No se han encontrado resultados
                        </div>
                    </span>
                </label>
            </div>
            }

                <div className="col s12 center-align">
                    <Paginacion links={users.links} />
                </div>

            <div className="col s12  right">
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Agregar
                    <i className="material-icons right">control_point</i>
                </button>
            </div>
        </form>
        </div>
    </>
  )
}

AgregarParticipante.layout = page => (
  <Layout title="Formación XX Mich - Curso" pageTitle="PARTICIPANTES">
    <LayoutCursos children={page} />
  </Layout>
)

export default AgregarParticipante