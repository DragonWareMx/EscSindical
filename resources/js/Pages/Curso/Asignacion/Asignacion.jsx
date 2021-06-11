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
function entregar(){
    document.getElementById("btn-entregar").style.display = "none";
    document.getElementById("div-entrega").style.display = "block";
}
function cancelar(){
    document.getElementById("btn-entregar").style.display = "block";
    document.getElementById("div-entrega").style.display = "none";
}


const Asignacion = ({curso, modulo, asignacion}) => {
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
                <InertiaLink  href={route('cursos.modulo', [curso.id, modulo.id])}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                MÓDULO. {modulo.nombre}
            </div>

            {/* Recuadro de la asignacion */}
            <div className="col s12 div_asignacion_mod">
                
                {/* nombre de la asignacion e icono de comentarios */}
                <div className="col s12 div_cabecera">
                    <div className="col s12 m11 l11 xl11 text-name-as">
                        <i className="material-icons" style={{"marginRight":"10px"}}>edit_note</i>
                        {asignacion.titulo}

                        {/* Link visible solo para el ponente, para editar asignación */}
                        {auth && auth.roles && auth.roles.length > 0 && auth.roles[0].name == "Ponente" &&
                            <InertiaLink href="#!" className="link-edit-as"><i className="material-icons" style={{"fontSize":"16px","marginRight":"5px"}}>edit</i>Editar</InertiaLink>
                        }
                    </div>

                    <a className="col s12 m1 l1 xl1 div-comments tooltipped" data-position="top" data-tooltip="Comentarios"><i className="material-icons">forum</i>3</a>
                </div>

                {/* fecha de la asignacion */}
                <div className="col s12 txt-date-as">{asignacion.created_at && "Publicado el " + transformaFecha(asignacion.created_at)} </div>

                {/* contenido de la asignación, con formato del ckeditor */}
                <div className="col s12 txt-ejm-as" style={{"marginTop":"15px"}}>{asignacion.contenido && asignacion.contenido}</div>
                
                {/* Estatus de la asignación */}
                <div className="col s12 txt-status-as">ESTATUS DE LA ASIGNACIÓN</div>

                <div className="col s12 right paddingRight-0px" id="btn-comenzar">
                    {/* Botón para comenzar examen*/}
                    <button className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                        Comenzar examen
                        <i className="material-icons right">send</i>
                    </button>
                </div>

                {auth && auth.roles && auth.roles.length > 0 && auth.roles[0].name == "Ponente" &&
                    <>
                    {/* VISTA PARA EL PONENTE */}
                    <div className="col s12 txt-status-as">ESTATUS DE LA ASIGNACIÓN</div>

                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Estatus</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus estatus-red estatus-bolder">Cerrado</div>
                    </div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Fecha de entrega</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">30 de Abril de 2021 a las 15:03</div>
                    </div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Tiempo restante</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">0 minutos</div>
                    </div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Total de entregas</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">45/48 entregas</div>
                    </div>

                    <div className="col s12 txt-status-as">ENTREGAS</div>

                    <table className="col s12 striped responsive-table table-entregas">
                        <thead>
                        <tr>
                            <th>ESTUDIANTE</th>
                            <th>ESTATUS</th>
                            <th>CALIFICACIÓN</th>
                            <th>FECHA DE ENVÍO</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={"/img/avatar1.png"} className="img-td-entregas" />Oscar André Huerta García</td>
                            <td className="td-estatus" style={{"color":"#41AB59"}}>ENVIADA A TIEMPO</td>
                            <td className="td-estatus">SIN REVISAR</td>
                            <td style={{"fontSize":"13px", "color":"#1E1E1E"}}>25/07/21 11:59</td>
                        </tr>
                        <tr>
                            <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={"/img/avatar2.png"} className="img-td-entregas" />José Agustín Aguilar Solórzano de Huerta</td>
                            <td className="td-estatus" style={{"color":"#134E39"}}>ENVIADA CON RETRASO</td>
                            <td className="td-estatus">SIN REVISAR</td>
                            <td style={{"fontSize":"13px", "color":"#1E1E1E"}}>25/07/21 11:59</td>
                        </tr>
                        <tr>
                            <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={"/img/avatar3.png"} className="img-td-entregas" />Leopoldo Fernando Lemus Sanchez</td>
                            <td className="td-estatus" style={{"color":"#D3766A"}}>SIN ENVIAR</td>
                            <td className="td-estatus">0/100</td>
                            <td style={{"fontSize":"13px", "color":"#1E1E1E"}}>-</td>
                        </tr>
                        </tbody>
                    </table>
                    </>
                }

                {auth && auth.roles && auth.roles.length > 0 && auth.roles[0].name == "Alumno" &&
                    <>
                        {/* row de info */}
                        {/* información para el estudiante antes de entregar la asignación */}
                        <div className="col s12 padding-0px row-extatus">
                            {/* OJO!!!!!---------- */}
                            {/* Si esta atrasada o cerrada sería en color rojo className="estatus-red" */}
                            {/* Si ya fue enviada sería en color verde className="estatus-green" */}
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Estatus</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus estatus-bolder">Abierto</div>
                        </div>
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Fecha de entrega</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">27 de Abril de 2021 a las 23:59</div>
                        </div>
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Tiempo restante</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">3 días y 3 horas</div>
                        </div>
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Estatus de calificación</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">Sin calificar</div>
                        </div>
                        {/* Para cuando ya se haya entregado-------------- */}
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Archivos enviados</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">
                                <a className="col s12 padding-0px paddingRight-0px" href="#!" style={{"color":"#5A5A5A","marginBottom":"5px","display":"flex","alignItems":"center"}}>documentoTarea2021.PDF<i className="material-icons tiny" style={{"marginLeft":"5px"}}>description</i></a>
                                <a className="col s12 padding-0px paddingRight-0px" href="#!" style={{"color":"#5A5A5A","marginBottom":"5px","display":"flex","alignItems":"center"}}>documentoTarea2021.PDF<i className="material-icons tiny" style={{"marginLeft":"5px"}}>description</i></a>
                            </div>
                        </div>
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Comentarios del envío</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</div>
                        </div>
                        {/* FORM PARA ENTREGAR LA ASIGNACIÓN O EDITAR */}
                        <form className="col s12 padding-0px paddingRight-0px" id="div-entrega" style={{"display":"none"}}>
                            <div className="col s12 txt-status-as" style={{"color":"#134E39"}}><b>ENTREGAR ASIGNACIÓN</b></div>

                            <div className="col s12 padding-0px paddingRight-0px">
                                <div className="file-field input-field" style={{"border": "1px dashed rgba(159, 157, 157, 0.6)", "boxSizing": "border-box", "borderRadius": "4px"}}>
                                    <div className="col s12">
                                        <span style={{"fontSize":"12px", "textAlign":"center", "paddingTop":"10px"}} className="col s12">Arrastre aquí los archivos o <b>clic</b> para seleccionarlos</span>
                                        <input type="file" className="form-control" id="files" name="files" />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" />
                                    </div>
                                </div>
                            </div>

                            {/* Estatus de la asignación */}
                            <div className="col s12 txt-status-as" style={{"marginTop":"15px"}}>Agregar comentarios a tu entrega</div>
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
                                    Enviar
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                        <div className="col s12 right paddingRight-0px" id="btn-entregar">
                            {/* Botón para entregar asignación */}
                            <button className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}} onClick={entregar}>
                                Entregar
                                <i className="material-icons right">send</i>
                            </button>
                        </div>

                        {/* Enviado pero no calificado */}
                        <div className="col s12 right container-btns-as paddingRight-0px">
                            {/* Pedir confirmacion para cancelar el envio */}
                            <a className="no-uppercase" style={{"marginRight":"30px","fontWeight":"500","fontSize":"14px","lineHeight":"17px","color":"#8C8C8C","cursor":"pointer"}}>
                                Cancelar envío
                            </a>
                            <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                                Editar
                                <i className="material-icons right">edit</i>
                            </button>
                        </div>
                    </>   
                }



                {/* Retroalimentación, calificado */}
                <div className="col s12 txt-status-as">ESTATUS DE LA ASIGNACIÓN</div>

                <div className="col s12 padding-0px row-extatus">
                    <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificación</div>
                    <div className="col s12 m9 l9 xl9 txt-content-estatus">95/100</div>
                </div>
                <div className="col s12 padding-0px row-extatus">
                    <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificado el</div>
                    <div className="col s12 m9 l9 xl9 txt-content-estatus">30 de Abril de 2021 a las 15:03</div>
                </div>
                <div className="col s12 padding-0px row-extatus">
                    <div className="col s12 m3 l3 xl3 txt-title-estatus">Comentarios</div>
                    <div className="col s12 m9 l9 xl9 txt-content-estatus">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore</div>
                </div>
            </div>
            
        </div>
    </>
  )
}

Asignacion.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="ASIGNACIÓN">
    <LayoutCursos children={page} />
  </Layout>
)

export default Asignacion