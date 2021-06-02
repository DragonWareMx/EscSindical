import React, { useEffect, useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import Layout from '../../layouts/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import Alertas from '../../components/common/Alertas';

import '../../styles/crearEntradas.css'

const Crear = ({ cursos }) => {
    //errores de la validacion de laravel
    const { errors } = usePage().props

    //valores para formulario
    const [values, setValues] = useState({
        curso: "",
        modulo: "",
        tipo: "",
        titulo: "",
        contenido: "",
        archivos: null,
        visible: false,
        notificacion: false,
        permitir_envios_retrasados: false,
        link: "",
        fecha_de_apertura: "",
        fecha_de_entrega: "",
        hora_de_apertura: "",
        hora_de_entrega: "",
        max_calif: "",
    })

    var optionsDate = {
        format: "yyyy-mm-dd",
        i18n: {
            months:
                [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                ],
            monthsShort: [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Ago',
                'Sep',
                'Oct',
                'Nov',
                'Dic'
            ],
            weekdays: [
                'Domingo',
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado'
            ],
            weekdaysShort: [
                'Dom',
                'Lun',
                'Mar',
                'Mie',
                'Jue',
                'Vie',
                'Sab'
            ],
            weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            selectMonths: true,
            selectYears: 5, // Puedes cambiarlo para mostrar más o menos años
            today: 'Hoy',
            clear: 'Limpiar',
            close: 'Ok',
            cancel: 'Cancelar',
            labelMonthNext: 'Siguiente mes',
            labelMonthPrev: 'Mes anterior',
            labelMonthSelect: 'Selecciona un mes',
            labelYearSelect: 'Selecciona un año',
        },
        setDefaultDate: false,
        defaultDate: new Date(),
        onClose: () => {
            setValues(values => ({
                ...values,
                fecha_de_apertura: document.getElementById("fecha_de_apertura").value,
            }))
        },
    };

    var optionsDate2 = {
        format: "yyyy-mm-dd",
        i18n: {
            months:
                [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                ],
            monthsShort: [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Ago',
                'Sep',
                'Oct',
                'Nov',
                'Dic'
            ],
            weekdays: [
                'Domingo',
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado'
            ],
            weekdaysShort: [
                'Dom',
                'Lun',
                'Mar',
                'Mie',
                'Jue',
                'Vie',
                'Sab'
            ],
            weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            selectMonths: true,
            selectYears: 5, // Puedes cambiarlo para mostrar más o menos años
            today: 'Hoy',
            clear: 'Limpiar',
            close: 'Ok',
            cancel: 'Cancelar',
            labelMonthNext: 'Siguiente mes',
            labelMonthPrev: 'Mes anterior',
            labelMonthSelect: 'Selecciona un mes',
            labelYearSelect: 'Selecciona un año',
        },
        setDefaultDate: false,
        defaultDate: new Date(),
        onClose: () => {
            setValues(values => ({
                ...values,
                fecha_de_entrega: document.getElementById("fecha_de_entrega").value,
            }))
        },
    };

    var optionsTime = {
        twelveHour: false,
        i18n: {
            clear: 'Limpiar',
            close: 'Ok',
            done: 'Ok',
            cancel: 'Cancelar',
        },
        onCloseEnd: () => {
            setValues(values => ({
                ...values,
                hora_de_apertura: document.getElementById("hora_de_apertura").value,
            }))
        },
    };

    var optionsTime2 = {
        twelveHour: false,
        i18n: {
            clear: 'Limpiar',
            close: 'Ok',
            done: 'Ok',
            cancel: 'Cancelar',
        },
        onCloseEnd: () => {
            setValues(values => ({
                ...values,
                hora_de_entrega: document.getElementById("hora_de_entrega").value,
            }))
        },
    };

    function initializeMat() {
        M.updateTextFields();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        var date1 = document.getElementById("fecha_de_apertura");
        var date2 = document.getElementById("fecha_de_entrega");
        var instances = M.Datepicker.init(date1, optionsDate);
        var instances = M.Datepicker.init(date2, optionsDate2);
        var hora1 = document.getElementById("hora_de_apertura");
        var hora2 = document.getElementById("hora_de_entrega");
        var instances = M.Timepicker.init(hora1, optionsTime);
        var instances = M.Timepicker.init(hora2, optionsTime2);
    }

    useEffect(() => {
        initializeMat();
    }, [])


    function ocultarTodos() {
        var input = document.getElementById("fecha-a-div");
        input.style.display = "none";
        var input = document.getElementById("fecha-e-div");
        input.style.display = "none";
    }

    function mostrarAsignacion() {
        ocultarTodos();
        var input = document.getElementById("fecha-a-div");
        input.style.display = "block";
        var input = document.getElementById("fecha-e-div");
        input.style.display = "block";
    }

    function mostrarExamen() {
        ocultarTodos();
        var input = document.getElementById("fecha-a-div");
        input.style.display = "block";
        var input = document.getElementById("fecha-e-div");
        input.style.display = "block";
    }

    function cambiarForm(e) {
        handleChange(e);
        var tipo = document.getElementById("tipo").value;
        switch (tipo) {
            case "Asignacion":
                mostrarAsignacion();
                break;
            case "Examen":
                mostrarExamen();
                break;
            default:
                ocultarTodos();
                break;
        }
    }

    //actualiza los hooks cada vez que se modifica un input
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleVisible() {
        setValues(values => ({
            ...values,
            visible: !values.visible,
        }))
    }

    function handleNotificacion() {
        setValues(values => ({
            ...values,
            notificacion: !values.notificacion,
        }))
    }

    function handleEnvio() {
        setValues(values => ({
            ...values,
            permitir_envios_retrasados: !values.permitir_envios_retrasados,
        }))
    }

    function changeModulos(e) {
        handleChange(e);
        var curso = document.getElementById("curso").value;
        var modulos = cursos[curso - 1].modules;
        var arrOptions = [];
        arrOptions.push(" <option value disabled value=''>Elige una opción</option>");
        if (modulos.length > 0) {
            modulos.forEach(function (modulo, indice, array) {
                arrOptions.push("<option value='" + modulo.id + "' key='" + indice + "'>Modulo " + modulo.nombre + "</option>");
            });
        }
        document.getElementById("modulo").innerHTML = arrOptions.join();
        document.getElementById("modulo").value = "";
        setValues(values => ({
            ...values,
            modulo: "",
        }))
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }

    function changeArchivos(e) {
        var inputArchivos = document.getElementById('archivos');
        if (inputArchivos.files && inputArchivos.files.length > 0) {
            setValues(values => ({
                ...values,
                archivos: inputArchivos.files,
            }))
        }
    }

    function changeArchivo(e) {
        var inputArchivos = document.getElementById('archivos');
        if (inputArchivos.files && inputArchivos.files[0]) {
            setValues(values => ({
                ...values,
                archivos: inputArchivos.files[0],
            }))
        }
    }

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('entrada.create'), values,
            {
                onError: () => {
                    // Inertia.reload({ only: ['cursos'], data: { regime: values.regimen } })
                }
            }
        )
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content card-entradas">
                                <span className="card-title">AGREGAR ENTRADA</span>
                                <Alertas />
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* aqui va el input del select del curso */}
                                        <div className="input-field col s12 m6">
                                            <select id="curso" name="curso" value={values.curso} onChange={changeModulos} className={errors.curso ? "input-field invalid" : "input-field"}>
                                                <option value disabled value={""}>Elige una opción</option>
                                                {cursos && cursos.length > 0 && cursos.map((curso, index) =>
                                                    <option value={curso.id} key={index}>{curso.nombre}</option>
                                                )}
                                            </select>
                                            <label>Selecciona el curso</label>
                                            {
                                                errors.curso &&
                                                <span className="helper-text" data-error={errors.curso} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.curso}</span>
                                            }
                                        </div>
                                        {/* aqui va el input del modulo */}
                                        <div className="input-field col s12 m6">
                                            <select id="modulo" name="modulo" value={values.modulo} onChange={handleChange} className={errors.modulo ? "input-field invalid" : "input-field"}>
                                                <option value disabled value={""}>Elige una opción</option>
                                            </select>
                                            <label>Selecciona el modulo</label>
                                            {
                                                errors.modulo &&
                                                <span className="helper-text" data-error={errors.modulo} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.modulo}</span>
                                            }
                                        </div>
                                        {/* aqui va el input del select tipo */}
                                        <div className="input-field col s12 m6">
                                            <select id="tipo" name="tipo" value={values.tipo} onChange={cambiarForm} className={errors.tipo ? "input-field invalid" : "input-field"}>
                                                <option value disabled value={""}>Elige una opción</option>
                                                <option value={"Aviso"}>Aviso</option>
                                                <option value={"Informacion"}>Información</option>
                                                <option value={"Enlace"}>Enlace (Link)</option>
                                                <option value={"Archivo"}>Archivo</option>
                                                <option value={"Asignacion"}>Asignación</option>
                                                <option value={"Examen"}>Examen</option>
                                            </select>
                                            <label>Tipo de recurso</label>
                                            {
                                                errors.tipo &&
                                                <span className="helper-text" data-error={errors.tipo} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.tipo}</span>
                                            }
                                        </div>
                                        {/* Aqui va el input del titulo */}
                                        <div className="input-field col s12 m6" required>
                                            <input id="titulo" name="titulo" type="text" className={errors.titulo ? "validate form-control invalid" : "validate form-control"} value={values.titulo} onChange={handleChange} />
                                            <label htmlFor="titulo">Título de la entrada</label>
                                            {
                                                errors.titulo &&
                                                <span className="helper-text" data-error={errors.titulo} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.titulo}</span>
                                            }
                                        </div>
                                        {/* Aqui va el input del link normal y del examen */}
                                        {values.tipo == "Examen" ?
                                            <div id="link-examen-div" className="input-field col s12" >
                                                <input id="link" name="link" type="text" className={errors.link ? "validate form-control invalid" : "validate form-control"} value={values.link} onChange={handleChange} required />
                                                <label htmlFor="link">Link del examen</label>
                                                {
                                                    errors.link &&
                                                    <span className="helper-text" data-error={errors.link} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.link}</span>
                                                }
                                            </div>
                                            : values.tipo == "Enlace" &&
                                            <div id="link-examen-div" className="input-field col s12" >
                                                <input id="link" name="link" type="text" className={errors.link ? "validate form-control invalid" : "validate form-control"} value={values.link} onChange={handleChange} required />
                                                <label htmlFor="link">Link de la entrada</label>
                                                {
                                                    errors.link &&
                                                    <span className="helper-text" data-error={errors.link} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.link}</span>
                                                }
                                            </div>
                                        }
                                        {/* Aqui va el input de max calif */}
                                        {values.tipo == "Examen" ?
                                            <div className="input-field col s12 m6">
                                                <input id="max_calif" name="max_calif" type="number" className={errors.max_calif ? "validate form-control invalid" : "validate form-control"} value={values.max_calif} onChange={handleChange} required />
                                                <label htmlFor="max_calif">Calificación máxima</label>
                                                {
                                                    errors.max_calif &&
                                                    <span className="helper-text" data-error={errors.max_calif} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.max_calif}</span>
                                                }
                                            </div>
                                            : values.tipo == "Asignacion" &&
                                            <div className="input-field col s12 m6">
                                                <input id="max_calif" name="max_calif" type="number" className={errors.max_calif ? "validate form-control invalid" : "validate form-control"} value={values.max_calif} onChange={handleChange} required />
                                                <label htmlFor="max_calif">Calificación máxima</label>
                                                {
                                                    errors.max_calif &&
                                                    <span className="helper-text" data-error={errors.max_calif} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.max_calif}</span>
                                                }
                                            </div>
                                        }
                                        {/* Aqui va el CKeditor */}
                                        {values.tipo == "Aviso" ?
                                            <div id="ckeditor-div" className="col s12">
                                                <h2 className="ck-titulo">Contenido {
                                                    errors.contenido &&
                                                    <span className="helper-text" data-error={errors.contenido} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.contenido}</span>
                                                }</h2>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={values.contenido}
                                                    onReady={editor => {

                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setValues(values => ({
                                                            ...values,
                                                            contenido: data,
                                                        }))
                                                    }}
                                                    onBlur={(event, editor) => {

                                                    }}
                                                    onFocus={(event, editor) => {

                                                    }}
                                                />
                                            </div>
                                            : values.tipo == "Informacion" ?
                                                <div id="ckeditor-div" className="col s12" >
                                                    <h2 className="ck-titulo">Contenido {
                                                        errors.contenido &&
                                                        <span className="helper-text" data-error={errors.contenido} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.contenido}</span>
                                                    }</h2>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={values.contenido}
                                                        onReady={editor => {

                                                        }}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setValues(values => ({
                                                                ...values,
                                                                contenido: data,
                                                            }))
                                                        }}
                                                        onBlur={(event, editor) => {

                                                        }}
                                                        onFocus={(event, editor) => {

                                                        }}
                                                    />
                                                </div>
                                                : values.tipo == "Asignacion" ?
                                                    <div id="ckeditor-div" className="col s12" >
                                                        <h2 className="ck-titulo">Contenido {
                                                            errors.contenido &&
                                                            <span className="helper-text" data-error={errors.contenido} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.contenido}</span>
                                                        }</h2>
                                                        {
                                                            errors.contenido &&
                                                            <span className="helper-text" data-error={errors.contenido} style={{ "marginBottom": "10px" }}>{errors.contenido}</span>
                                                        }
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={values.contenido}
                                                            onReady={editor => {

                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setValues(values => ({
                                                                    ...values,
                                                                    contenido: data,
                                                                }))
                                                            }}
                                                            onBlur={(event, editor) => {

                                                            }}
                                                            onFocus={(event, editor) => {

                                                            }}
                                                        />
                                                    </div>
                                                    : values.tipo == "Examen" &&
                                                    <div id="ckeditor-div" className="col s12" >
                                                        <h2 className="ck-titulo">Información (Opcional) {
                                                            errors.contenido &&
                                                            <span className="helper-text" data-error={errors.contenido} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.contenido}</span>
                                                        }</h2>
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={values.contenido}
                                                            onReady={editor => {

                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setValues(values => ({
                                                                    ...values,
                                                                    contenido: data,
                                                                }))
                                                            }}
                                                            onBlur={(event, editor) => {

                                                            }}
                                                            onFocus={(event, editor) => {

                                                            }}
                                                        />
                                                    </div>
                                        }
                                        {/* -- INPUT FILE -- */}
                                        {values.tipo == "Aviso" ?
                                            <div id="file-div" className="col s12" style={{ marginBottom: "2%", marginTop: "2%" }}>
                                                <p style={{ "marginTop": "0px", "fontFamily": "Montserrat", "fontSize": "13px", color: "rgb(159, 157, 157)" }}>Adjuntar archivos (Opcional)
                                                {
                                                        errors.archivos &&
                                                        <span className="helper-text" data-error={errors.arrchivos} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.archivos}</span>
                                                    }
                                                </p>
                                                <div className="file-field input-field" style={{ "border": "1px dashed rgba(159, 157, 157, 0.6)", boxSizing: "border-box", borderRadius: "4px" }}>
                                                    <div className="col s12">
                                                        <span style={{ fontSize: "12px", textAlign: "center", paddingTop: "10px" }} className="col s12">Arrastre aquí los archivos o <b>clic</b> para seleccionarlos</span>
                                                        <input type="file" multiple className="form-control" id="archivos" name="archivos" onChange={changeArchivos} />
                                                    </div>
                                                    <div className="file-path-wrapper">
                                                        <input className="file-path validate" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            : values.tipo == "Informacion" ?
                                                <div id="file-div" className="col s12" style={{ marginBottom: "2%", marginTop: "2%" }}>
                                                    <p style={{ "marginTop": "0px", "fontFamily": "Montserrat", "fontSize": "13px", color: "rgb(159, 157, 157)" }}>Adjuntar archivos (Opcional)
                                                    {
                                                            errors.archivos &&
                                                            <span className="helper-text" data-error={errors.arrchivos} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.archivos}</span>
                                                        }
                                                    </p>
                                                    <div className="file-field input-field" style={{ "border": "1px dashed rgba(159, 157, 157, 0.6)", boxSizing: "border-box", borderRadius: "4px" }}>
                                                        <div className="col s12">
                                                            <span style={{ fontSize: "12px", textAlign: "center", paddingTop: "10px" }} className="col s12">Arrastre aquí los archivos o <b>clic</b> para seleccionarlos</span>
                                                            <input type="file" multiple className="form-control" id="archivos" name="archivos" onChange={changeArchivos} />
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input className="file-path validate" type="text" />
                                                        </div>
                                                    </div>
                                                </div>
                                                : values.tipo == "Recurso" ?
                                                    <div id="file-div" className="col s12" style={{ marginBottom: "2%", marginTop: "2%" }}>
                                                        <p style={{ "marginTop": "0px", "fontFamily": "Montserrat", "fontSize": "13px", color: "rgb(159, 157, 157)" }}>Adjuntar archivos (Opcional)
                                                        {
                                                                errors.archivos &&
                                                                <span className="helper-text" data-error={errors.arrchivos} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.archivos}</span>
                                                            }
                                                        </p>
                                                        <div className="file-field input-field" style={{ "border": "1px dashed rgba(159, 157, 157, 0.6)", boxSizing: "border-box", borderRadius: "4px" }}>
                                                            <div className="col s12">
                                                                <span style={{ fontSize: "12px", textAlign: "center", paddingTop: "10px" }} className="col s12">Arrastre aquí los archivos o <b>clic</b> para seleccionarlos</span>
                                                                <input type="file" multiple className="form-control" id="archivos" name="archivos" onChange={changeArchivos} />
                                                            </div>
                                                            <div className="file-path-wrapper">
                                                                <input className="file-path validate" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : values.tipo == "Archivo" ?
                                                        <div id="file-div" className="col s12" style={{ marginBottom: "2%", marginTop: "2%" }}>
                                                            <p style={{ "marginTop": "0px", "fontFamily": "Montserrat", "fontSize": "13px", color: "rgb(159, 157, 157)" }}>Adjuntar archivo
                                                            {
                                                                    errors.archivos &&
                                                                    <span className="helper-text" data-error={errors.arrchivos} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.archivos}</span>
                                                                }
                                                            </p>
                                                            <div className="file-field input-field" style={{ "border": "1px dashed rgba(159, 157, 157, 0.6)", boxSizing: "border-box", borderRadius: "4px" }}>
                                                                <div className="col s12">
                                                                    <span style={{ fontSize: "12px", textAlign: "center", paddingTop: "10px" }} className="col s12">Arrastre aquí el archivo o <b>clic</b> para seleccionarlo</span>
                                                                    <input type="file" className="form-control" id="archivos" name="archivos" onChange={changeArchivo} />
                                                                </div>
                                                                <div className="file-path-wrapper">
                                                                    <input className="file-path validate" type="text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : values.tipo == "Asignacion" &&
                                                        <div id="file-div" className="col s12" style={{ marginBottom: "2%", marginTop: "2%" }}>
                                                            <p style={{ "marginTop": "0px", "fontFamily": "Montserrat", "fontSize": "13px", color: "rgb(159, 157, 157)" }}>Adjuntar archivos (Opcional)
                                                            {
                                                                    errors.archivos &&
                                                                    <span className="helper-text" data-error={errors.arrchivos} style={{ marginBottom: "10px", fontSize: "12px", color: "rgb(244, 67, 54)", marginLeft: "5px" }}>{errors.archivos}</span>
                                                                }
                                                            </p>
                                                            <div className="file-field input-field" style={{ "border": "1px dashed rgba(159, 157, 157, 0.6)", boxSizing: "border-box", borderRadius: "4px" }}>
                                                                <div className="col s12">
                                                                    <span style={{ fontSize: "12px", textAlign: "center", paddingTop: "10px" }} className="col s12">Arrastre aquí los archivos o <b>clic</b> para seleccionarlos</span>
                                                                    <input type="file" multiple className="form-control" id="archivos" name="archivos" onChange={changeArchivos} />
                                                                </div>
                                                                <div className="file-path-wrapper">
                                                                    <input className="file-path validate" type="text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                        }
                                        {/* Div que contiene los campos de fechas */}
                                        <div>
                                            {/* fecha de apertura */}
                                            <div id="fecha-a-div" className="col s12 m6" style={{ display: "none", marginBottom: "1%" }}>
                                                <h2 className="ck-titulo">Fecha de apertura</h2>
                                                <div className="col s6" style={{ paddingLeft: "0px" }}>
                                                    <input type="text" className={errors.fecha_de_apertura ? "datepicker invalid" : "datepicker"} placeholder="Fecha" id="fecha_de_apertura" name="fecha_de_apertura"></input>
                                                    {
                                                        errors.fecha_de_apertura &&
                                                        <span className="helper-text" style={{ "marginBottom": "10px", color: "#F44336", fontSize: "12px" }}>{errors.fecha_de_apertura}</span>
                                                    }
                                                </div>
                                                <div className="col s6" style={{ paddingLeft: "0px" }}>
                                                    <input type="text" className={errors.hora_de_apertura ? "timepicker invalid" : "timepicker"} placeholder="Hora" id="hora_de_apertura" name="hora_de_apertura"></input>
                                                    {
                                                        errors.hora_de_apertura &&
                                                        <span className="helper-text" style={{ "marginBottom": "10px", color: "#F44336", fontSize: "12px" }}>{errors.hora_de_apertura}</span>
                                                    }
                                                </div>
                                            </div>
                                            {/* fecha de entrega */}
                                            <div id="fecha-e-div" className="col s12 m6" style={{ display: "none", marginBottom: "1%" }}>
                                                <h2 className="ck-titulo">Fecha de entrega</h2>
                                                <div className="col s6" style={{ paddingLeft: "0px" }}>
                                                    <input type="text" className={errors.fecha_de_entrega ? "datepicker invalid" : "datepicker"} placeholder="Fecha" id="fecha_de_entrega" name="fecha_de_entrega"></input>
                                                    {
                                                        errors.fecha_de_entrega &&
                                                        <span className="helper-text" style={{ "marginBottom": "10px", color: "#F44336", fontSize: "12px" }}>{errors.fecha_de_entrega}</span>
                                                    }
                                                </div>
                                                <div className="col s6" style={{ paddingLeft: "0px" }}>
                                                    <input type="text" className={errors.hora_de_entrega ? "timepicker invalid" : "timepicker"} placeholder="Hora" id="hora_de_entrega" name="hora_de_entrega"></input>
                                                    {
                                                        errors.hora_de_entrega &&
                                                        <span className="helper-text" style={{ "marginBottom": "10px", color: "#F44336", fontSize: "12px" }}>{errors.hora_de_entrega}</span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* primer switch */}
                                        {values.tipo != "" &&
                                            <div id="switch-visible-div" className="col s12 m4 l3">
                                                <h2 className="ck-titulo">Visible dentro del curso</h2>
                                                <div className="switch">
                                                    <label>
                                                        No
                                            <input type="checkbox" value={values.visible} onChange={handleVisible} />
                                                        <span className="lever" />
                                                Si
                                        </label>
                                                </div>
                                            </div>
                                        }

                                        {/* segundo switch */}
                                        {values.tipo == "Asignacion" ?
                                            <div id="switch-notif-div" className="col s12 m4 l3" >
                                                <h2 className="ck-titulo">Notificar a los participantes</h2>
                                                <div className="switch">
                                                    <label>
                                                        No
                                                <input type="checkbox" value={values.notificacion} onChange={handleNotificacion} />
                                                        <span className="lever" />
                                                    Si
                                            </label>
                                                </div>
                                            </div>
                                            : values.tipo == "Examen" &&
                                            <div id="switch-notif-div" className="col s12 m4 l3" >
                                                <h2 className="ck-titulo">Notificar a los participantes</h2>
                                                <div className="switch">
                                                    <label>
                                                        No
                                                <input type="checkbox" value={values.notificacion} onChange={handleNotificacion} />
                                                        <span className="lever" />
                                                    Si
                                            </label>
                                                </div>
                                            </div>
                                        }
                                        {/* tercer switch envios retrasados */}
                                        {values.tipo == "Asignacion" ?
                                            <div id="switch-envios-div" className="col s12 m4 l3">
                                                <h2 className="ck-titulo">Permitir envios retrasados</h2>
                                                <div className="switch">
                                                    <label>
                                                        No
                                                <input type="checkbox" value={values.permitir_envios_retrasados} onChange={handleEnvio} />
                                                        <span className="lever" />
                                                    Si
                                            </label>
                                                </div>
                                            </div>
                                            : values.tipo == "Examen" &&
                                            <div id="switch-envios-div" className="col s12 m4 l3" >
                                                <h2 className="ck-titulo">Permitir envios retrasados</h2>
                                                <div className="switch">
                                                    <label>
                                                        No
                                            <input type="checkbox" value={values.permitir_envios_retrasados} onChange={handleEnvio} />
                                                        <span className="lever" />
                                                Si
                                        </label>
                                                </div>
                                            </div>
                                        }
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