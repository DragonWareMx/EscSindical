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

//componentes
import Alertas from '../../../components/common/Alertas';
import ModalEliminar from '../../../components/common/ModalEliminar';


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


const Asignacion = ({curso, modulo, asignacion, alumnos, nAlumnos, nEntregas}) => {
    //errores de la validacion de laravel
    const { errors } = usePage().props
    //errores de la validacion de laravel
    const { flash } = usePage().props
    
    const { auth } = usePage().props;
    const [values,setValues] = useState({
        comentario: "",
        archivos: null
    });

    useEffect(() => {
        tooltip();
    }, [])

    useEffect(() => {
        openAlert('alert_error');
    }, [errors])

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

    // / funcion para calcular el estatus de la entrega o algo así
    function pendienteEstatus(entrega, permitir){
        const hoy = new Date();
        const fecha_entrega=new Date(entrega);
        if(hoy <= fecha_entrega){
            return 'Pendiente'
        }
        else if(hoy > fecha_entrega && permitir){
            return 'Retrasada'
        }
        else{
            return 'Cerrado'
        }
    }

    // / funcion para calcular el estatus de la entrega realizada o algo así
    function realizadaEstatus(fecha_entrega,entregado){
        const entrega=new Date(fecha_entrega);
        const fecha = new Date(entregado);

        if(fecha <= entrega){
            return 'Enviado'
        }
        else{
            return 'Enviado con retraso'
        }
    }
    
    function tiempoRestante(fechaEntrega){
        //si el usuario ya entrego la tarea
        if(asignacion && asignacion.users && asignacion.users.length > 0){
            //fecha de entrega de envio
            var entrega = new Date(asignacion.users[0].pivot.created_at);
            //fecha de entrega programada
            var fecha = new Date(fechaEntrega);

            let total = Date.parse(fecha) - Date.parse(entrega);

            let minutes = 0;
            let hours = 0;
            let days =0;
            let retrasada = "Enviada "            
            let antes = " antes"

            if(total < 0){
                total *= -1
                retrasada = "Enviada con "
                antes = " de retraso"
            }

            if(( (total/1000/60) % 60 ) > 0){
                minutes = Math.floor( (total/1000/60) % 60 );
            }
            if(( (total/(1000*60*60)) % 24 ) > 0){
                hours = Math.floor( (total/(1000*60*60)) % 24 );
            }
            if(( total/(1000*60*60*24) ) > 0){
                days =  Math.floor( total/(1000*60*60*24) );
            }

            let horas
            let dias
            if(hours == 1)
                horas = " hora "
            else
                horas = " horas "

            if(days == 1)
                dias = " día y "
            else
                dias = " días y "

            return retrasada + days + dias + hours + horas + minutes + " minutos " + antes
        }
        else{
            //fecha actual
            var hoy = new Date();
            //fecha de entrega
            var entrega = new Date(fechaEntrega);

            let total = Date.parse(entrega) - Date.parse(hoy);

            let minutes = 0;
            let hours = 0;
            let days =0;
            let retrasada = ""            

            if(total < 0){
                total *= -1
                retrasada = "Retrasada por "
            }

            if(( (total/1000/60) % 60 ) > 0){
                minutes = Math.floor( (total/1000/60) % 60 );
            }
            if(( (total/(1000*60*60)) % 24 ) > 0){
                hours = Math.floor( (total/(1000*60*60)) % 24 );
            }
            if(( total/(1000*60*60*24) ) > 0){
                days =  Math.floor( total/(1000*60*60*24) );
            }

            let horas
            let dias
            if(hours == 1)
                horas = " hora "
            else
                horas = " horas "

            if(days == 1)
                dias = " día y "
            else
                dias = " días y "

            return retrasada + days + dias + hours + horas + minutes + " minutos "
        }
    }

    function bTiempoRestante(fechaEntrega){
        //fecha actual
        var hoy = new Date();
        //fecha de entrega
        var entrega = new Date(fechaEntrega);

        const total = Date.parse(entrega) - Date.parse(hoy);

        if(total < 0)
            return false
        else
            return true
    }

    function bEstatus(fechaEntrega, fechaProgramada){
        //fecha actual
        var hoy = new Date(fechaEntrega);
        //fecha de entrega
        var entrega = new Date(fechaProgramada);

        const total = Date.parse(entrega) - Date.parse(hoy);

        if(total < 0)
            return false
        else
            return true
    }

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('cursos.asignacion.entregar', [curso.id,modulo.id, asignacion.id]), values, {preserveScroll: true, 
            onSuccess: () => {
            setValues(values => ({
            ...values,
            archivos: null,
            comentario: ""
        }))}})
    }

    function changeArchivo(e){
        var inputFile = document.getElementById('archivos');
        if (inputFile.files && inputFile.files[0]) {
            setValues(values => ({
                ...values,
                archivos: inputFile.files[0],
            }))
        }
    }

    function closeAlert(type){
        var divsToHide = document.getElementsByClassName(type); //divsToHide is an array
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.visibility = "hidden"; // or
            divsToHide[i].style.display = "none"; // depending on what you're doing
        }
    }

    function openAlert(type){
        var divsToHide = document.getElementsByClassName(type); //divsToHide is an array
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.visibility = "visible"; // or
            divsToHide[i].style.display = "flex"; // depending on what you're doing
        }
    }

    function verEntrega(id){
        Inertia.get(route('cursos.asignacion.entrega', [curso.id, modulo.id, asignacion.id, id]))
    }
    
    return (
    <>
        <div className="row">
            {/* NOMBRE DEL MODULO */}
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>
                <InertiaLink  href={route('cursos.modulo', [curso.id, modulo.id])}  className="icon-back-course tooltipped" data-position="left" data-tooltip="Regresar"><i className="material-icons">keyboard_backspace</i></InertiaLink>
                MÓDULO {modulo.numero}. {modulo.nombre}
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
                <div className="col s12 txt-ejm-as" style={{"marginTop":"15px"}}>{asignacion.contenido && <div dangerouslySetInnerHTML={{__html: asignacion.contenido}} />}</div>
                
                {/* Estatus de la asignación */}
                <div className="col s12 txt-status-as">ESTATUS DE LA ASIGNACIÓN</div>

                {asignacion.tipo == "Examen" &&
                <div className="col s12 right paddingRight-0px" id="btn-comenzar">
                    {/* Botón para comenzar examen*/}
                    <InertiaLink href={route('cursos.examen', [curso.id,modulo.id,asignacion.id])} className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                        Comenzar examen
                        <i className="material-icons right">send</i>
                    </InertiaLink>
                </div>
                }

                {auth && auth.roles && auth.roles.length > 0 && auth.roles[0].name == "Ponente" &&
                    <>
                    {/* VISTA PARA EL PONENTE */}

                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Estatus</div>
                        <div className={pendienteEstatus(asignacion.fecha_de_entrega, false) == "Pendiente" ? "col s12 m9 l9 xl9 txt-content-estatus estatus-bolder estatus-green" : "col s12 m9 l9 xl9 txt-content-estatus estatus-bolder estatus-red"}>{pendienteEstatus(asignacion.fecha_de_entrega, false)}</div>
                    </div>

                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Fecha de entrega</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">{transformaFecha(asignacion.fecha_de_entrega)}</div>
                    </div>

                    {bTiempoRestante(asignacion.fecha_de_entrega) &&
                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Tiempo restante</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">{tiempoRestante(asignacion.fecha_de_entrega)}</div>
                    </div>
                    }

                    <div className="col s12 padding-0px row-extatus">
                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Total de entregas</div>
                        <div className="col s12 m9 l9 xl9 txt-content-estatus">{nEntregas}/{nAlumnos} entregas</div>
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
                        {alumnos && alumnos.length > 0 && alumnos.map(alumno => (
                        <tr key={alumno.id} onClick={() => {verEntrega(alumno.id)}}>
                            <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}>
                                <img src={alumno.foto ? "/storage/fotos_perfil/"+alumno.foto : "/storage/fotos_perfil/avatar1.jpg"} className="img-td-entregas" />
                                {alumno.nombre} {alumno.apellido_p} {alumno.apellido_m}
                            </td>
                            {(alumno.entries && alumno.entries.length > 0) ?
                                <>
                                    {(alumno.entries[0].pivot.Comentario || alumno.entries[0].pivot.archivo) ?
                                        bEstatus(alumno.entries[0].pivot.created_at ,asignacion.fecha_de_entrega) ?
                                            <td className="td-estatus" style={{"color":"#41AB59"}}>ENVIADA A TIEMPO</td>
                                        :
                                            <td className="td-estatus" style={{"color":"#134E39"}}>ENVIADA CON RETRASO</td>
                                    :
                                        <td className="td-estatus" style={{"color":"#D3766A"}}>SIN ENVIAR</td>
                                    }

                                    {(alumno.entries[0].pivot.calificacion || alumno.entries[0].pivot.calificacion == 0) ?
                                        <td className="td-estatus">{alumno.entries[0].pivot.calificacion} {asignacion.max_calif && "/"+asignacion.max_calif}</td>
                                    :
                                        <td className="td-estatus">SIN REVISAR</td>
                                    }
                                    <td style={{"fontSize":"13px", "color":"#1E1E1E"}}>{transformaFecha(alumno.entries[0].pivot.created_at)}</td>
                                </>
                            :
                                <>
                                    <td className="td-estatus" style={{"color":"#D3766A"}}>SIN ENVIAR</td>
                                    <td className="td-estatus">SIN REVISAR</td>
                                    <td style={{"fontSize":"13px", "color":"#1E1E1E"}}>-</td>
                                </>
                            }
                        </tr>
                        ))
                        }
                        </tbody>
                    </table>
                    </>
                }

                {auth && auth.roles && auth.roles.length > 0 && auth.roles[0].name == "Alumno" &&
                    <>
                        {/* información para el estudiante antes de entregar la asignación */}
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Estatus</div>
                            {asignacion.users && asignacion.users.length > 0 ?
                            <>
                                <div className={realizadaEstatus(asignacion.fecha_de_entrega, asignacion.users[0].pivot.created_at) == "Retrasada" ? "col s12 m9 l9 xl9 txt-content-estatus estatus-bolder estatus-red" : "col s12 m9 l9 xl9 txt-content-estatus estatus-bolder estatus-green"}>{realizadaEstatus(asignacion.fecha_de_entrega, asignacion.users[0].pivot.created_at)}</div>
                            </>
                            :
                            <>
                                <div className={pendienteEstatus(asignacion.fecha_de_entrega, asignacion.permitir_envios_retrasados) == "Pendiente" ? "col s12 m9 l9 xl9 txt-content-estatus estatus-bolder estatus-green" : "col s12 m9 l9 xl9 txt-content-estatus estatus-bolder estatus-red"}>{pendienteEstatus(asignacion.fecha_de_entrega, asignacion.permitir_envios_retrasados)}</div>
                            </>
                            }
                        </div>
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Fecha de {asignacion.tipo == "Examen" ? "cierre" : "entrega"}</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">{asignacion.fecha_de_entrega && transformaFecha(asignacion.fecha_de_entrega)}</div>
                        </div>
                        {asignacion.permitir_envios_retrasados ? 
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Tiempo restante</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">{tiempoRestante(asignacion.fecha_de_entrega, asignacion.permitir_envios_retrasados)}</div>
                        </div>
                        :
                        bTiempoRestante(asignacion.fecha_de_entrega) &&
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Tiempo restante</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">{tiempoRestante(asignacion.fecha_de_entrega, asignacion.permitir_envios_retrasados)}</div>
                        </div>
                        }  
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Estatus de calificación</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">
                                {asignacion.users && asignacion.users.length > 0 ?
                                asignacion.users[0].pivot.calificacion ?
                                    "Calificado"
                                    :
                                    "Sin calificar"
                                :
                                "Sin calificar"
                                }
                            </div>
                        </div>
                        {/* Para cuando ya se haya entregado-------------- */}

                        {asignacion.tipo == 'Asignacion' &&
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Archivos enviados</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">
                            {asignacion.users && asignacion.users.length > 0 ?
                            asignacion.users[0].pivot.archivo ?
                                <a className="col s12 padding-0px paddingRight-0px" target="_blank" href={"/storage/entregas_asignaciones/"+asignacion.users[0].pivot.archivo} style={{"color":"#5A5A5A","marginBottom":"5px","display":"flex","alignItems":"center"}}>{asignacion.users[0].pivot.nombre_original_archivo}<i className="material-icons tiny" style={{"marginLeft":"5px"}}>description</i></a>
                                :
                                "Sin archivos enviados"
                            :
                            "Sin archivos enviados"
                            }
                            </div>
                        </div>
                        }

                        {asignacion.tipo == 'Asignacion' &&
                        <div className="col s12 padding-0px row-extatus">
                            <div className="col s12 m3 l3 xl3 txt-title-estatus">Comentarios del envío</div>
                            <div className="col s12 m9 l9 xl9 txt-content-estatus">
                                {asignacion.users && asignacion.users.length > 0 ?
                                asignacion.users[0].pivot.Comentario ?
                                    <div dangerouslySetInnerHTML={{__html: asignacion.users[0].pivot.Comentario}} />
                                    :
                                    "Sin comentarios"
                                :
                                "Sin comentarios"
                                }
                            </div>
                        </div>
                        }

                        {/*si la asignacion no se ha entregado o si se entrego pero no tiene calificacion */}
                        {asignacion.tipo == "Asignacion" && (asignacion.permitir_envios_retrasados || bTiempoRestante(asignacion.fecha_de_entrega)) && (asignacion.users && asignacion.users.length == 0 || (asignacion.users.length > 0  && (!asignacion.users[0].pivot.calificacion || asignacion.users[0].pivot.calificacion != 0))) &&
                        <>
                            {asignacion.users && asignacion.users.length == 0 &&
                            <>

                            {(errors.archivos || errors.comentario) &&
                                <div className="col s12" style={{width: "100%", margin:"0px", marginTop: "10px"}}>
                                    <div className="errores">
                                        <ul>
                                            <li className="alert_error">
                                                <div className="col s11">No se has subido ningún contenido a la asignación.</div>
                                                <div onClick={() => {closeAlert('alert_error')}} style={{"cursor":"pointer"}}><i className="col s1 tiny material-icons">clear</i></div>
                                            </li>
                                        </ul>  
                                    </div>
                                </div>
                            }

                            {/* FORM PARA ENTREGAR LA ASIGNACIÓN O EDITAR */}
                            <form className="col s12 padding-0px paddingRight-0px" id="div-entrega" style={{"display":"none"}} onSubmit={handleSubmit}>
                                <div className="col s12 txt-status-as" style={{"color":"#134E39"}}><b>ENTREGAR ASIGNACIÓN</b></div>

                                <div className="col s12 padding-0px paddingRight-0px">
                                    <div className="file-field input-field" style={{"border": "1px dashed rgba(159, 157, 157, 0.6)", "boxSizing": "border-box", "borderRadius": "4px"}}>
                                        <div className="col s12">
                                            <span style={{"fontSize":"12px", "textAlign":"center", "paddingTop":"10px"}} className="col s12">Arrastre aquí los archivos o <b>clic</b> para seleccionarlos</span>
                                            <input type="file" className="form-control" id="archivos" name="files" onChange={changeArchivo} />
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
                                        data={values.comentario}
                                        id="comentario"
                                        // data={values.descripcion}
                                        onReady={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                            // console.log( 'Editor is ready to use!', editor );
                                        } }
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setValues(values => ({
                                                ...values,
                                                comentario: data,
                                            }))
                                        }}
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
                            </>
                            }

                            {asignacion.users && asignacion.users.length > 0  && (!asignacion.users[0].pivot.calificacion && asignacion.users[0].pivot.calificacion != 0) &&
                            <div className="col s12 right container-btns-as paddingRight-0px">
                                {/* Enviado pero no calificado */}
                                {/* Pedir confirmacion para cancelar el envio */}
                                <a data-target="modalEliminar" className="no-uppercase modal-trigger" style={{"marginRight":"30px","fontWeight":"500","fontSize":"14px","lineHeight":"17px","color":"#8C8C8C","cursor":"pointer"}}>
                                    Cancelar envío
                                </a>
                            </div>
                            }
                        </>
                        }
                        {/* Retroalimentación, calificado */}
                        {asignacion.users && asignacion.users.length > 0 &&
                        <>
                            {asignacion.max_calif &&
                            <>
                                {(asignacion.users[0].pivot.calificacion || asignacion.users[0].pivot.calificacion == 0) &&
                                    <div className="col s12 padding-0px row-extatus">
                                        <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificación</div>
                                        <div className="col s12 m9 l9 xl9 txt-content-estatus">{asignacion.users[0].pivot.calificacion}/{asignacion.max_calif}</div>
                                    </div>
                                }
                            </>
                            }

                            {asignacion.users[0].pivot.fecha_calif &&
                            <div className="col s12 padding-0px row-extatus">
                                <div className="col s12 m3 l3 xl3 txt-title-estatus">Calificado el</div>
                                <div className="col s12 m9 l9 xl9 txt-content-estatus">{transformaFecha(asignacion.users[0].pivot.fecha_calif)}</div>
                            </div>
                            }

                            {asignacion.users[0].pivot.comentario_retroalimentacion &&
                            <div className="col s12 padding-0px row-extatus">
                                <div className="col s12 m3 l3 xl3 txt-title-estatus">Comentarios</div>
                                <div className="col s12 m9 l9 xl9 txt-content-estatus">
                                    {asignacion.users[0].pivot.comentario_retroalimentacion}
                                </div>
                            </div>
                            }
                        </>
                        } 
                    </>   
                }
            </div>

            <ModalEliminar url={route('cursos.asignacion.cancelar', [curso.id, modulo.id, asignacion.id])} nombre="" tipo="registro de asignación" />
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