import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Edit3 = ({ change, values }) => {
    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12" >
                <p style={{"marginTop":"0px", "marginBottom":"8px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Descripción breve del curso<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Presentación o introducción al curso" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                {/* <input type='text' id="descripcion" value={values.descripcion} onChange={change}/> */}

                <CKEditor
                    editor={ ClassicEditor }
                    id="descripcion"
                    data="<p>Ingresa aquí una descripción acerca del curso, los estudiantes podrán leerla antes de convertirse en participantes</p>"
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
            

            <div className="area col s12">
            <p style={{"marginTop":"0px", "marginBottom":"8px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Imagenes del curso<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Al menos una imagen que servirá como portada del curso" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <div className="file-field input-field" style={{"border": "1px dashed rgba(159, 157, 157, 0.6)", "boxSizing": "border-box", "bordeRadius": "4px"}}>
                    <div className="col s12">
                        <span style={{"fontSize":"12px", "textAlign":"center", "paddingTop":"10px"}} className="col s12">Arrastre aquí las imagenes o <b>clic</b> para seleccionarlas</span>
                        <input type="file"  class="" id="imgs"  name="imgs" value={values.imgs} onChange={change} />
                    </div>
                    <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>
           


            <div className="col s12 ">
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Guardar
                    <i className="material-icons right">save</i>
                </button>
            </div>
        </div>
    )
       
}

export default Edit3