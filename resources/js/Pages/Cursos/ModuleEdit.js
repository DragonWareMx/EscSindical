import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia} from '@inertiajs/inertia'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import Layout from '../../layouts/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../styles/cursos.css'
import '/css/asignaciones.css'
import { Alert } from 'bootstrap';
//COMPONENTS

function initializeSelect() {
        var elems = document.querySelectorAll('select');
        var options;
        var instances = M.FormSelect.init(elems, options);
}

const ModuleEdit = ({cursos, modulo}) => {
    //errores de validación 
 
    const { errors } = usePage().props

    useEffect (() => {
        initializeSelect();
    }, [])
    
    const [values, setValues] = useState({
        curso : modulo.course.nombre,
        nombre : modulo.nombre,
        objetivo : modulo.objetivo,
        criterios_de_evaluacion : modulo.criterios,
        duracion : modulo.duracion,
        temario : modulo.temario,
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
        Inertia.post('/cursos/module/update/'+modulo.id, values)
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
                                    <select  disabled onChange={onChangeValue} className={errors.curso ? "validate invalid" : "validate "}>
                                    <option value="" disabled selected>{values.curso}</option>
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
                                    <input  id="nombre" type="text" required value={values.nombre} autoFocus onChange={handleChange} maxLength="255" className={errors.nombre ? "validate invalid" : "validate "}/>
                                    <label htmlFor="nombre">Nombre del módulo</label>
                                    {
                                    errors.nombre &&
                                    <span className="helper-text" data-error={errors.nombre} style={{ "marginBottom": "10px" }}>{errors.nombre}</span>
                                    }
                                </div>

                                <div className="input-field col s12">
                                    <textarea id="objetivo" value={values.objetivo} autoFocus onChange={handleChange} className={errors.objetivo ? "validate materialize-textarea invalid" : "validate materialize-textarea"}></textarea>
                                    <label htmlFor="objetivo">Objetivo</label>
                                    {
                                    errors.objetivo &&
                                    <span className="helper-text" data-error={errors.objetivo} style={{ "marginBottom": "10px" }}>{errors.objetivo}</span>
                                    }
                                </div>

                                <div className="input-field col s12 m6 l6 xl6">
                                    <input  id="criterios_de_evaluacion" type="text" value={values.criterios_de_evaluacion} autoFocus required onChange={handleChange} className={errors.criterios_de_evaluacion ? "validate invalid" : "validate"}/>
                                    <label htmlFor="criterios_de_evaluacion">Criterios de evaluación<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Información acerca de los puntos que serán involucrados para la calificación" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></label>
                                    {
                                    errors.criterios_de_evaluacion &&
                                    <span className="helper-text" data-error={errors.criterios_de_evaluacion} style={{ "marginBottom": "10px" }}>{errors.criterios_de_evaluacion}</span>
                                    }
                                </div>

                                <div className="input-field col s12 m6 l6 xl6">
                                    <input  id="duracion" type="number" value={values.duracion} autoFocus onChange={handleChange} min="1" className={errors.duracion ? "validate invalid" : "validate"}/>
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
                                        data={values.temario}
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
                                
                                {/* <div className="col s12 ">
                                    <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                                        Agregar
                                        <i className="material-icons right">save</i>
                                    </button> 
                                </div> */}

                                <div className="col s12 right container-btns-as paddingRight-0px">
                                    <InertiaLink href="#!" className="no-uppercase" style={{"marginRight":"30px","fontWeight":"500","fontSize":"14px","lineHeight":"17px","color":"#8C8C8C","cursor":"pointer"}}>
                                        Cancelar
                                    </InertiaLink>
                                    
                                    <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                                        Guardar
                                        <i className="material-icons right">send</i>
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

ModuleEdit.layout = page => <Layout children={page} title="Editar módulo" pageTitle="EDITAR MÓDULO"/>

export default ModuleEdit