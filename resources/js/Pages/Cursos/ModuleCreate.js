import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia} from '@inertiajs/inertia'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import Layout from '../../layouts/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../styles/cursos.css'
import { Alert } from 'bootstrap';
//COMPONENTS



function initializeSelect() {
        var elems = document.querySelectorAll('select');
        var options;
        var instances = M.FormSelect.init(elems, options);
}

const ModuleCreate = ({cursos}) => {
    //errores de validación 
    const { errors } = usePage().props

    useEffect (() => {
        initializeSelect();
    }, [])
    
    const [values, setValues] = useState({
        curso : "",
        nombre : "",
        objetivo : "",
        criterios_de_evaluacion : "",
        duracion : "",
        temario : "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function onChangeValue(e) {
        var valor = e.target.value
        setValues(values => ({
            ...values,
            curso: valor,
        }))
    }

    function onChangeCK(description) {
        setValues(values => ({
            ...values,
            temario: description,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/cursos/module/store', values)
    }


    return (
    <>
    
    <div className="row">                
        <div className="col s12">
            <div className="card ">
                <div className="card-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                    
                            <div className="row">
                                
                                <div className="input-field col s12">
                                    <select  onChange={onChangeValue} className={errors.curso ? "validate invalid" : "validate "}>
                                    <option value="" disabled selected>Curso al que agregarás el módulo</option>
                                    {cursos.map ((curso)=>
                                        <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                                    )}
                                    </select>
                                    <label>Selecciona el curso</label>
                                    {
                                    errors.curso &&
                                    <span className="helper-text" data-error={errors.curso} style={{ "marginBottom": "10px" }}>{errors.curso}</span>
                                    }
                                </div>

                                <div className="input-field col s12">
                                    <input  id="nombre" type="text" required onChange={handleChange} maxLength="255" className={errors.nombre ? "validate invalid" : "validate "}/>
                                    <label htmlFor="nombre">Nombre del módulo</label>
                                    {
                                    errors.nombre &&
                                    <span className="helper-text" data-error={errors.nombre} style={{ "marginBottom": "10px" }}>{errors.nombre}</span>
                                    }
                                </div>

                                <div className="input-field col s12">
                                    <textarea id="objetivo" onChange={handleChange} className={errors.objetivo ? "validate materialize-textarea invalid" : "validate materialize-textarea"}></textarea>
                                    <label htmlFor="objetivo">Objetivo</label>
                                    {
                                    errors.objetivo &&
                                    <span className="helper-text" data-error={errors.objetivo} style={{ "marginBottom": "10px" }}>{errors.objetivo}</span>
                                    }
                                </div>

                                <div className="input-field col s12 m6 l6 xl6">
                                    <input  id="criterios_de_evaluacion" type="text" required onChange={handleChange} className={errors.criterios_de_evaluacion ? "validate invalid" : "validate"}/>
                                    <label htmlFor="criterios_de_evaluacion">Criterios de evaluación<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Información acerca de los puntos que serán involucrados para la calificación" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></label>
                                    {
                                    errors.criterios_de_evaluacion &&
                                    <span className="helper-text" data-error={errors.criterios_de_evaluacion} style={{ "marginBottom": "10px" }}>{errors.criterios_de_evaluacion}</span>
                                    }
                                </div>

                                <div className="input-field col s12 m6 l6 xl6">
                                    <input  id="duracion" type="number" onChange={handleChange} min="1" className={errors.duracion ? "validate invalid" : "validate"}/>
                                    <label htmlFor="duracion">Duración en semanas</label>
                                    {
                                    errors.duracion &&
                                    <span className="helper-text" data-error={errors.duracion} style={{ "marginBottom": "10px" }}>{errors.duracion}</span>
                                    }
                                </div>

                                <div className="input-field col s12" >
                                    <p style={{"marginTop":"0px", "marginBottom":"8px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Temario<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Proporciona a tus estudiantes información relevante sobre los temas que serán analizados en este modulo" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                                   
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        id="descripcion"
                                        data="<p>Ingresa aquí el temario del módulo</p>"
                                        onReady={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                            // console.log( 'Editor is ready to use!', editor );
                                        } }
                                        onChange={ ( event, editor ) => {
                                            onChangeCK(editor.getData());
                                            // console.log( { event, editor, data } );
                                        } }
                                        onBlur={ ( event, editor ) => {
                                            // console.log( 'Blur.', editor );
                                        } }
                                        onFocus={ ( event, editor ) => {
                                            // console.log( 'Focus.', editor );
                                        } }
                                    />
                                    {
                                    errors.temario &&
                                    <span className="helper-text" data-error={errors.temario} style={{ "marginBottom": "10px" }}>{errors.temario}</span>
                                    }
                                </div>
                                
                                <div className="col s12 ">
                                    <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                                        Agregar
                                        <i className="material-icons right">save</i>
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

ModuleCreate.layout = page => <Layout children={page} title="Agregar módulo" pageTitle="AGREGAR MÓDULO"/>

export default ModuleCreate