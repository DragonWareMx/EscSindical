import React from 'react'

const Create3 = ({ change, values }) => {
    return (
        <div className="row" style={{"marginLeft": "-1.5rem", "marginRight": "-1.5rem"}}>
            <div className="input-field col s12" >
                <p style={{"marginTop":"0px", "marginBottom":"0px", "fontFamily":"Montserrat", "fontSize":"13px"}}>Descripción breve del curso<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Presentación o introducción al curso" style={{"color":"rgb(159, 157, 157)", "cursor":"pointer"}}>help_outline</i></p>
                <input type='text' id="descripcion" value={values.descripcion} onChange={change}/>
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
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right" style={{"height": "54px"}}>
                    Agregar
                    <i className="material-icons right">arrow_forward</i>
                </button>
            </div>
           {/* <button type="submit">Agregar</button> */}
        </div>
    )
       
}

export default Create3