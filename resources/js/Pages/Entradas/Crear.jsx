import React, { useEffect, useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import Layout from '../../layouts/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../styles/crearEntradas.css'

function initializeMat() {
    M.updateTextFields();
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

}

const Crear = () => {
    useEffect(() => {
        initializeMat();
    }, [])

    //errores de la validacion de laravel
    const { errors } = usePage().props

    //valores para formulario
    const [values, setValues] = useState({
        tipo: "",
        titulo: "",
        contenido: "",
        visible: "",
        notificacion: "",
        link: "",
        link_del_examen: ""
    })

    //actualiza los hooks cada vez que se modifica un input
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function ocultarTodos() {
        var input = document.getElementById("link-div");
        input.style.display = "none";
        var input = document.getElementById("link-examen-div");
        input.style.display = "none";
        var input = document.getElementById("ckeditor-div");
        input.style.display = "none";
        var input = document.getElementById("file-div");
        input.style.display = "none";
        var input = document.getElementById("fecha-a-div");
        input.style.display = "none";
        var input = document.getElementById("fecha-e-div");
        input.style.display = "none";
        var input = document.getElementById("switch-envios-div");
        input.style.display = "none";
    }

    function mostrarAviso() {
        ocultarTodos();
        var input = document.getElementById("ckeditor-div");
        input.style.display = "block";
        var input = document.getElementById("file-div");
        input.style.display = "block";
    }

    function mostrarEnlace() {
        ocultarTodos();
        var input = document.getElementById("link-div");
        input.style.display = "block";
    }

    function mostrarArchivo() {
        ocultarTodos();
        var input = document.getElementById("file-div");
        input.style.display = "block";
    }

    function mostrarAsignacion() {
        ocultarTodos();
        var input = document.getElementById("ckeditor-div");
        input.style.display = "block";
        var input = document.getElementById("file-div");
        input.style.display = "block";
        var input = document.getElementById("fecha-a-div");
        input.style.display = "block";
        var input = document.getElementById("fecha-e-div");
        input.style.display = "block";
        var input = document.getElementById("switch-envios-div");
        input.style.display = "block";
    }

    function mostrarExamen() {
        ocultarTodos();
        var input = document.getElementById("link-examen-div");
        input.style.display = "block";
        var input = document.getElementById("ckeditor-div");
        input.style.display = "block";
        var input = document.getElementById("fecha-a-div");
        input.style.display = "block";
        var input = document.getElementById("fecha-e-div");
        input.style.display = "block";
        var input = document.getElementById("switch-envios-div");
        input.style.display = "block";
    }

    function cambiarForm() {
        var tipo = document.getElementById("tipo").value;
        switch (tipo) {
            case "Aviso":
                mostrarAviso();
                break;
            case "Informacion":
                mostrarAviso();
                break;
            case "Enlace":
                mostrarEnlace();
                break;
            case "Archivo":
                mostrarArchivo();
                break;
            case "Asignacion":
                mostrarAsignacion();
                break;
            case "Examen":
                mostrarExamen();
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content card-entradas">
                                <span className="card-title">AGREGAR ENTRADA</span>
                                <form action="">
                                    <div className="row">
                                        {/* aqui va el input del select tipo */}
                                        <div className="input-field col s12 m6">
                                            <select id="tipo" name="tipo" value={values.tipo} onChange={handleChange, cambiarForm}>
                                                <option value disabled value={""}>Elige una opción</option>
                                                <option value={"Aviso"}>Aviso</option>
                                                <option value={"Informacion"}>Información</option>
                                                <option value={"Enlace"}>Enlace (Link)</option>
                                                <option value={"Archivo"}>Archivo</option>
                                                <option value={"Asignacion"}>Asignación</option>
                                                <option value={"Examen"}>Examen</option>
                                            </select>
                                            <label>Tipo de recurso</label>
                                        </div>
                                        {/* Aqui va el input del titulo */}
                                        <div className="input-field col s12 m6">
                                            <input id="titulo" name="titulo" type="text" className="validate" value={values.titulo} onChange={handleChange} />
                                            <label htmlFor="titulo">Título de la entrada</label>
                                        </div>
                                        {/* Aqui va el input del link */}
                                        <div id="link-div" className="input-field col s12" style={{ display: "none" }}>
                                            <input id="link" name="link" type="text" className="validate" value={values.link} onChange={handleChange} />
                                            <label htmlFor="link">Link de la entrada</label>
                                        </div>
                                        {/* Aqui va el input del link del examen */}
                                        <div id="link-examen-div" className="input-field col s12" style={{ display: "none" }}>
                                            <input id="link_del_examen" name="link_del_examen" type="text" className="validate" value={values.link} onChange={handleChange} />
                                            <label htmlFor="link">Link del examen</label>
                                        </div>
                                        {/* Aqui va el CKeditor */}
                                        <div id="ckeditor-div" className="col s12" style={{ display: "none" }}>
                                            <h2 className="ck-titulo">Contenido</h2>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data=""
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    console.log({ event, editor, data });
                                                }}
                                                onBlur={(event, editor) => {
                                                    console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    console.log('Focus.', editor);
                                                }}
                                            />
                                        </div>
                                        {/* -- INPUT FILE -- */}
                                        <div id="file-div" className="col s12" style={{ marginBottom: "2%", marginTop: "2%", display: "none" }}>
                                            <p style={{ "marginTop": "0px", "fontFamily": "Montserrat", "fontSize": "13px", color: "rgb(159, 157, 157)" }}>Adjuntar archivos (Opcional)</p>
                                            <div className="file-field input-field" style={{ "border": "1px dashed rgba(159, 157, 157, 0.6)", boxSizing: "border-box", borderRadius: "4px" }}>
                                                <div className="col s12">
                                                    <span style={{ fontSize: "12px", textAlign: "center", paddingTop: "10px" }} className="col s12">Arrastre aquí los archivos o <b>clic</b> para seleccionarlos</span>
                                                    <input type="file" multiple className="form-control" id="archivos" name="archivos" />
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate" type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* fecha de apertura */}
                                        <div id="fecha-a-div" className="col s12 m6" style={{ display: "none" }}>
                                            aqui va el input
                                        </div>
                                        {/* fecha de entrega */}
                                        <div id="fecha-e-div" className="col s12 m6" style={{ display: "none" }}>
                                            aqui va el input
                                        </div>
                                        {/* primer switch */}
                                        <div className="col s12 m4 l3" style={{ display: "none" }}>
                                            <h2 className="ck-titulo">Visible dentro del curso</h2>
                                            <div className="switch">
                                                <label>
                                                    No
                                                <input type="checkbox" />
                                                    <span className="lever" />
                                                    Si
                                            </label>
                                            </div>
                                        </div>
                                        {/* segundo switch */}
                                        <div className="col s12 m4 l3" style={{ display: "none" }}>
                                            <h2 className="ck-titulo">Notificar a los participantes</h2>
                                            <div className="switch">
                                                <label>
                                                    No
                                                <input type="checkbox" />
                                                    <span className="lever" />
                                                    Si
                                            </label>
                                            </div>
                                        </div>
                                        {/* tercer switch envios retrasados */}
                                        <div id="switch-envios-div" className="col s12 m4 l3" style={{ display: "none" }}>
                                            <h2 className="ck-titulo">Permitir envios retrasados</h2>
                                            <div className="switch">
                                                <label>
                                                    No
                                                <input type="checkbox" />
                                                    <span className="lever" />
                                                    Si
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Aqui empieza el div flex donde esta el boton que submitea el form */}
                                    <div className="row" style={{ marginBottom: "0px" }}>
                                        <div className="col s12" style={{ display: "flex" }}>
                                            <button className="btn waves-effect waves-light btn-submit" type="submit" name="action">Agregar
                                            <i className="material-icons right">save</i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Crear.layout = page => <Layout children={page} title="Escuela Sindical - Entrada" pageTitle="AGREGAR ENTRADA" />

export default Crear