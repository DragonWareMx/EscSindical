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

const AsignacionEntrega = ({curso, modulo, asignacion, entrega}) => {
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

    function cancelar(){
        document.getElementById("btn-calificar").style.display = "block";
        document.getElementById("div-calificar").style.display = "none";
    }

    // / funcion para calcular el estatus de la entrega realizada o algo así
    function realizadaEstatus(fecha_entrega,entregado){
        const entrega=new Date(fecha_entrega);
        const fecha = new Date(entregado);

        if(fecha <= entrega){
        return 'ENVIADA A TIEMPO'
        }
        else{
        return 'ENVIADA CON RETRASO'
        }
    }

    //errores de la validacion de laravel
    const { errors } = usePage().props

    //valores para formulario
    const [values, setValues] = useState({
        calificacion: entrega.calificacion || "",
        comentario: entrega.comentario_retroalimentacion || "",
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

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('cursos.asignacion.entrega.calificar',[asignacion.id,entrega.id]), values,
            {
                onError: () => {
                    // Inertia.reload({ only: ['cursos'], data: { regime: values.regimen } })
                }
            }
        )
    }



    useEffect(() => {
        M.updateTextFields();
    }, [])


    return (
        <>
            <div className="row">
                {/* NOMBRE DEL MODULO */}
                <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                    <InertiaLink  href={route('cursos.asignacion', [curso.id, modulo.id, asignacion.id])}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                    MÓDULO {modulo.numero}. {modulo.nombre}
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
                        <img src={entrega.foto ? '/storage/fotos_perfil/'+entrega.foto : '/img/avatar1.png'} className="img-td-entregas" />
                        <InertiaLink href={route('perfil.public',entrega.id)} className="link-profile-e">{entrega.nombre} {entrega.apellido_p} {entrega.apellido_m}</InertiaLink>
                    </div>

                    {/* fecha del envio */}
                    <div className="col s12 txt-date-as padding-0px" style={{"marginTop":"10px"}}>{entrega.created_at && "Fecha de entrega " + transformaFecha(entrega.created_at)}</div>

                    {asignacion.tipo != 'Examen' &&
                        <div className='td-estatus col s12 padding-0px' style={{"color": entrega.usuario ? 'red' :asignacion.fecha_de_entrega >= entrega.created_at ?"#41AB59" : "#ffb90a", "marginTop":"5px"}}>{entrega.usuario ? 'SIN ENVÍO' : realizadaEstatus(asignacion.fecha_de_entrega, entrega.created_at)}</div>
                    }
                    {/* Enviada con retraso #134E39 */}

                    {/* Archivo enviado */}
                    {entrega.archivo &&
                        <div className="col s12 padding-0px file-entrega">
                            <i className="material-icons tiny" style={{"marginRight":"5px"}}>description</i>
                            <a href={"/storage/entregas_asignaciones/"+entrega.archivo} target="_blank" className="file-entregaLink">.pdf</a>
                        </div>
                    }

                    {/* Comentarios, si no hay no se muestra esta parte */}
                    {entrega.Comentario &&
                        <>
                            <div className="col s12 txt-status-as">COMENTARIOS</div>
                            <div className="col s12 txt-comentariosE padding-0px" dangerouslySetInnerHTML={{__html:entrega.Comentario}}></div>
                        </>
                    }

                    {/* Retroalimentación */}
                    <div className="col s12 txt-status-as">RETROALIMENTACIÓN</div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificación</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">
                            {entrega.calificacion ?
                                entrega.calificacion + '/' + asignacion.max_calif :
                                'Sin calificar / ' + asignacion.max_calif
                            }
                        </div>
                    </div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificado el</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">
                            {entrega.fecha_calif ?
                                transformaFecha(entrega.fecha_calif) :
                                '-'
                            }
                        </div>
                    </div>
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Observaciones</div>
                        {entrega.comentario_retroalimentacion ?
                            <div className="col s12 m9 l9 xl9 txt-content-estatus" dangerouslySetInnerHTML={{__html:entrega.comentario_retroalimentacion}}>
                            </div>
                        :
                            <div className="col s12 m9 l9 xl9 txt-content-estatus" >
                                -
                            </div>
                        }
                    </div>

                    <div className="col s12 right paddingRight-0px" id="btn-calificar">
                        {/* Botón para calificar entrega */}
                        <button className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}} onClick={calificar}>
                                {entrega.calificacion ?
                                    'Editar'
                                    :
                                    'Calificar'
                                }
                            <i className="material-icons right">edit</i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="col s12 padding-0px paddingRight-0px" id="div-calificar" style={{"display":"none", "marginTop":"30px"}}>

                        <div class="input-field col s12 padding-0px paddingRight-0px">
                            <input id="calificacion" name="calificacion" type="number" min="0" max ={asignacion.max_calif} className={errors.calificacion ? "validate form-control invalid" : "validate form-control"}  value={values.calificacion} onChange={handleChange} required />
                            <label for="calificacion">Calificación obtenida</label>
                        </div>

                        {/* Agregar comentarios */}
                        <div className="col s12 txt-status-as" style={{"marginTop":"15px"}}>Comentarios (Opcional)</div>
                        <div className="col s12 padding-0px paddingRight-0px">
                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.comentario}
                                id="editorCK"
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setValues(values => ({
                                        ...values,
                                        comentario: data,
                                    }))
                                }}
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
  <Layout title="Formación XX Mich - Curso" pageTitle="ASIGNACIÓN">
    <LayoutCursos children={page} />
  </Layout>
)

export default AsignacionEntrega