import Layout from '../../../layouts/Layout';
import LayoutCursos from '../../../layouts/LayoutCursos';
import React, { useState, useEffect } from 'react'
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import '/css/participantes.css'
import '/css/modulos.css'
import '/css/asignaciones.css'
import route from 'ziggy-js';

function tooltip(){
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}
function calificar(){
    document.getElementById("btn-calificar").style.display = "none";
    document.getElementById("div-calificar").style.display = "block";
}
function cancelar(){
    document.getElementById("btn-calificar").style.display = "block";
    document.getElementById("div-calificar").style.display = "none";
}


const AsignacionEntrega = ({curso, modulo, asignacion}) => {
    const { auth } = usePage().props;

    useEffect(() => {
        tooltip();
    }, [])

    function transformaFecha(fecha) {
        const dob = new Date(fecha);
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const day = dob.getDate();
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        let hour = ("0" + dob.getHours()).slice(-2);
        const minutes = ("0" + dob.getMinutes()).slice(-2);
        let formato

        if(hour > 12){
            hour = hour - 12
            formato = "pm"
        }
        else
            formato = "am"

        return `${day} de ${monthNames[monthIndex]} de ${year} a las ${hour}:${minutes} ${formato}`;
    }

    return (
        <>
            <div className="row">
                {/* NOMBRE DEL MODULO */}
                <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                    <InertiaLink  href={route('cursos.asignacion', [curso.id, modulo.id, asignacion.id])}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                    MÓDULO. {modulo.nombre}
                </div>

                    {/* Recuadro de la asignacion */}
                <div className="col s12 div_asignacion_mod">
                    {/* nombre de la asignacion e icono de comentarios */}
                    <div className="col s12 div_cabecera">
                        <div className="col s12 text-name-as">
                            <i className="material-icons" style={{"marginRight":"10px"}}>edit_note</i>
                            {asignacion.titulo}
                        </div>
                    </div>
                    {/* fecha de la asignacion */}
                    <div className="col s12 txt-date-as">{asignacion.fecha_de_entrega && "Fecha de entrega " + transformaFecha(asignacion.created_at)} </div>
                    
                    
                    <div className="col s12 padding-0px" style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center","marginTop":"15px"}}>
                        <img src={"/img/avatar1.png"} className="img-td-entregas" />
                        <InertiaLink href="#!" className="link-profile-e">Oscar André Huerta García</InertiaLink>
                    </div>

                    {/* fecha del envio */}
                    <div className="col s12 txt-date-as padding-0px" style={{"marginTop":"10px"}}>Fecha de envío 00/00/00 a las 00:00 am</div>
                    
                    <div className="td-estatus col s12 padding-0px" style={{"color":"#41AB59", "marginTop":"5px"}}>ENVIADA A TIEMPO</div>
                    {/* Enviada con retraso #134E39 */}
                    {/* Sin enviar 1E1E1E */}

                    {/* Archivos enviados */}
                    <div className="col s12 padding-0px file-entrega">
                        <i className="material-icons tiny" style={{"marginRight":"5px"}}>description</i>
                        <InertiaLink href="#!" className="file-entregaLink">Nombre del archivo.pdf</InertiaLink>
                    </div>
                    <div className="col s12 padding-0px file-entrega">
                        <i className="material-icons tiny" style={{"marginRight":"5px"}}>description</i>
                        <InertiaLink href="#!" className="file-entregaLink">Nombre del archivo.pdf</InertiaLink>
                    </div>

                    {/* Comentarios, si no hay no se muestra esta parte */}
                    <div className="col s12 txt-status-as">COMENTARIOS</div>
                    <div className="col s12 txt-comentariosE padding-0px">Comentarios de envío lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</div>
                
                    {/* Retroalimentación */}
                    <div className="col s12 txt-status-as">RETROALIMENTACIÓN</div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificación</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">Sin revisar</div>
                    </div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificado el</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">-</div>
                    </div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Observaciones</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">-</div>
                    </div>

                    <div className="col s12 right paddingRight-0px" id="btn-calificar">
                        {/* Botón para calificar entrega */}
                        <button className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}} onClick={calificar}>
                            Calificar
                            <i className="material-icons right">edit</i>
                        </button>
                    </div>

                    <form className="col s12 padding-0px paddingRight-0px" id="div-calificar" style={{"display":"none", "marginTop":"30px"}}>

                        <div class="input-field col s12 padding-0px paddingRight-0px">
                                <input id="grade" type="text" class="validate form-control" name="grade"  required />
                                <label for="grade">Calificación obtenida</label> 
                        </div>

                        {/* Agregar comentarios */}
                        <div className="col s12 txt-status-as" style={{"marginTop":"15px"}}>Comentarios (Opcional)</div>
                        <div className="col s12 padding-0px paddingRight-0px">
                            <CKEditor
                                editor={ ClassicEditor }
                                id="editorCK"
                                // data={values.descripcion}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ 
                                    ( event, editor ) => {
                                    changeCK(editor.getData());
                                    }
                                }
                                onBlur={ ( event, editor ) => {
                                    // console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    // console.log( 'Focus.', editor );
                                } }
                            />
                        </div>

                        <div className="col s12 right container-btns-as paddingRight-0px">
                            <a className="no-uppercase" style={{"marginRight":"30px","fontWeight":"500","fontSize":"14px","lineHeight":"17px","color":"#8C8C8C","cursor":"pointer"}} onClick={cancelar}>
                                Cancelar
                            </a>
                            <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                                Guardar
                                <i className="material-icons right">save</i>
                            </button>
                        </div>
                    </form>
                
                </div>
            </div>
        </>
    )

}

AsignacionEntrega.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="ASIGNACIÓN">
    <LayoutCursos children={page} />
  </Layout>
)

export default AsignacionEntrega