import React, { useState } from 'react'
import { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../styles/cursos.css'

const ModuleCreate = () => {
  return (
    <>
    
    <div className="row">                
        <div className="col s12">
            <div className="card ">
                <div className="card-content">
                    <form >
                        <div className="modal-content">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input  id="nombre" type="text" required className="validate"/>
                                    <label for="nombre">Nombre del módulo</label>
                                </div>

                                <div className="input-field col s12">
                                    <textarea id="objetivo" className="materialize-textarea"></textarea>
                                    <label for="objetivo">Objetivo</label>
                                </div>

                                <div className="input-field col s12 m6 l6 xl6">
                                    <input  id="criterios_de_evaluacion" type="text" required className="validate"/>
                                    <label for="criterios_de_evaluacion">Criterios de evaluación<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Información acerca de los puntos que serán involucrados para la calificación" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></label>
                                </div>

                                <div className="input-field col s12 m6 l6 xl6">
                                    <input  id="duracion_en_semanas" type="number"  className="validate"/>
                                    <label for="duracion_en_semanas">Duración en semanas</label>
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
                                            const data = editor.getData();
                                            // console.log( { event, editor, data } );
                                        } }
                                        onBlur={ ( event, editor ) => {
                                            // console.log( 'Blur.', editor );
                                        } }
                                        onFocus={ ( event, editor ) => {
                                            // console.log( 'Focus.', editor );
                                        } }
                                    />
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