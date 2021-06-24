import React, { useState } from 'react';
import '../../styles/comentarios.css';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import moment from 'moment';
import { usePage } from '@inertiajs/inertia-react'

export default function Comments({ idModulo, idCurso, idEntrada, comments, handleVisibleC, idTeacher }) {
    //errores de la validacion de laravel
    const { errors, auth } = usePage().props;

    const [values, setValues] = useState({
        visible: true,
        visibleForm: false,
        comentario: '',
        id_edit: '',
        visibleEdit: false,
        comentario_editado: '',
    })

    function handleForm() {
        setValues(values => ({
            ...values,
            visibleForm: !values.visibleForm,
            comentario: '',
            id_edit: '',
            comentario_editado: '',
        }))
    }

    function handleVisible() {
        setValues(values => ({
            ...values,
            visible: !values.visible,
        })),
            handleVisibleC();
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        const button = document.getElementById('button-enviar');
        button.disabled = true;
        e.preventDefault()
        Inertia.post(route('comment.create', { cid: idCurso, mid: idModulo, pid: idEntrada }), values,
            {
                onError: () => {
                    //Inertia.reload({ only: ['comments'] })
                    button.disabled = false;
                },
                onSuccess: () => {
                    //esto es para borrar el input al poner el comentario
                    button.disabled = false;
                    setValues(values => ({
                        ...values,
                        comentario: '',
                    }));
                    Inertia.reload({ only: ['comments'] })
                },
                preserveScroll: (page) => Object.keys([page.props.status, page.props.errors]).length,
            }
        )
    }

    function handleSubmitEdit(e) {
        const button = document.getElementById('button-enviar-edit');
        button.disabled = true;
        e.preventDefault()
        Inertia.post(route('comment.update', { cid: idCurso, mid: idModulo, pid: idEntrada }), values,
            {
                onError: () => {
                    //Inertia.reload({ only: ['comments'] })
                    button.disabled = false;
                },
                onSuccess: () => {
                    //esto es para borrar el input al poner el comentario
                    button.disabled = false;
                    setValues(values => ({
                        ...values,
                        comentario_editado: '',
                        id_edit: '',
                        visibleEdit: false
                    }));
                    Inertia.reload({ only: ['comments'] })
                },
                preserveScroll: (page) => Object.keys([page.props.status, page.props.errors]).length,
            }
        )
    }

    function handleEdit(e) {
        var id = e.target.dataset.id;
        if (values.id_edit == id) {
            ocultarEdit();
        }
        else {
            var comentario = document.getElementById("comment-" + id);
            setValues(values => ({
                ...values,
                id_edit: id,
                visibleEdit: !values.visibleEdit,
                comentario_editado: comentario.innerText
            }));
        }
    }

    function ocultarEdit(e) {
        setValues(values => ({
            ...values,
            visibleEdit: !values.visibleEdit,
            id_edit: '',
        }));
    }

    return (
        <div className="col s12" style={{ margin: "10px 0px 5px 0px", padding: "0px" }}>
            {values.visible &&
                <div className="card">
                    <div className="card-content" style={{ "paddingBottom": "15px", paddingTop: "18px" }}>
                        <div className="row" style={{ marginBottom: "5px" }}>
                            <div>
                                {/* titulo y cantidad de comentarios */}
                                <div className="col s8 l10" style={{ "marginTop": "10px" }}>
                                    <div className="row valign-wrapper" >
                                        <div className="col s12" style={{ display: "flex", flexWrap: "nowrap" }}>
                                            <div className="comment-title">
                                                COMENTARIOS
                                            </div>
                                            <div className="" style={{ display: "flex", alignContent: "center", marginLeft: "10px" }}>
                                                <span >
                                                    <i className="material-icons" style={{ "color": "#848484", "fontSize": "13px" }}>comment</i>
                                                </span >
                                                <span style={{ "color": "#848484", "fontSize": "13px", "marginLeft": "3px", marginTop: "-1px" }}>{comments && comments.length > 0 ? comments.length : 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* icono de ocultar comentarios */}
                                <div className="col s4 l2" style={{ "marginTop": "10px" }}>
                                    <div className="row center-align" style={{ display: "flex", alignContent: "center", justifyContent: "flex-end" }}>
                                        <span style={{ cursor: "pointer" }} onClick={handleVisible}>
                                            <i className="material-icons" style={{ "color": "#134E39", "fontSize": "16px" }}>visibility_off</i>
                                        </span>
                                        <span style={{ "color": "#134E39", "fontSize": "14px", "marginLeft": "5px", marginTop: "-2px", cursor: "pointer" }} onClick={handleVisible} >Ocultar</span>
                                    </div>
                                </div>

                                {/*Resto del div donde van los comentarios*/}
                                <div className="col s12" style={{ "marginTop": "0px" }}>
                                    {/* Aquí van los comentarios */}
                                    {comments && comments.length > 0 && comments.map((com, index) => (
                                        <div className="comment-container" key={index}>
                                            <div className="col s12 m1" style={{ display: "flex" }}>
                                                <img style={{ marginTop: "10px", marginBottom: "10px" }} src={'/storage/fotos_perfil/' + com.user.foto} alt="" className="user-pic" />
                                            </div>
                                            <div className="col s12 m11 comentario-card">
                                                {com.user_id == auth.user.id &&
                                                    <div className="LC_more tres_puntos">
                                                        <a className="dropdown-text" data-id={com.id} onClick={handleEdit}><i className="material-icons" data-id={com.id}>edit</i></a>
                                                        <a className="dropdown-text" data-id={com.id}><i className="material-icons" data-id={com.id}>delete</i></a>
                                                    </div>
                                                }

                                                <div className="nombre-comment">
                                                    {com.user.id == idTeacher ?
                                                        <div className="name valign-wrapper" style={{ color: "#134E39", fontWeight: 300 }}>{com.user.nombre + ' ' + com.user.apellido_p + ' ' + com.user.apellido_m} <span className="material-icons" style={{ "color": "#134E39", "fontSize": "13px", marginLeft: "5px" }}>
                                                            check_circle
                                                        </span></div>
                                                        :
                                                        <div className="name">{com.user.nombre + ' ' + com.user.apellido_p + ' ' + com.user.apellido_m}</div>
                                                    }
                                                    <div className="date">{moment(com.fecha).format('D [de] MMMM YYYY [a las] h:mm a')}</div>
                                                    {com.editado == 1 &&
                                                        <div className="date" style={{ color: "#134E39", fontWeight: 700 }}>Editado</div>
                                                    }
                                                </div>
                                                {values.id_edit != com.id ?
                                                    <div className="comment-text" id={"comment-" + com.id}>
                                                        {com.comentario}
                                                    </div>
                                                    : !values.visibleEdit &&
                                                    <div className="comment-text" id={"comment-" + com.id}>
                                                        {com.comentario}
                                                    </div>
                                                }
                                                {values.id_edit == com.id && values.visibleEdit &&
                                                    <form onSubmit={handleSubmitEdit}>
                                                        {errors.comentario_editado &&
                                                            <label htmlFor="comentario" style={{ color: "red" }}>{errors.comentario_editado}</label>
                                                        }
                                                        <textarea name="comentario_editado" id="comentario_editado" placeholder="Máximo 280 caracteres" maxLength="280" value={values.comentario_editado} onChange={handleChange} style={{ marginTop: "10px", marginBottom: "0px" }}></textarea>
                                                        <div className="row container-buttons" style={{ marginBottom: "10px", marginTop: "5px" }}>
                                                            <button type="button" className=" center-align  btn waves-effect waves-light cancelar" style={{ marginRight: "15px" }} onClick={ocultarEdit}>Cancelar</button>
                                                            < button type="submit" id="button-enviar-edit" className=" center-align btn waves-effect waves-light guardar" style={{ marginRight: "0%", marginLeft: "0" }}>
                                                                Guardar
                                                                <i className="material-icons right">send</i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                    {comments && comments.length == 0 &&
                                        <div >
                                            No hay comentarios.
                                        </div>
                                    }
                                    {/* <div className="comment-container">
                                    <div className="col s12 m1" style={{ display: "flex" }}>
                                        <img style={{ margin: "10px auto" }} src="https://64.media.tumblr.com/ca510302c93fde7ae7a9407df7abe613/6c31d3f7026f8820-57/s1280x1920/6c714bf9b80b675736e37f9c9b8d374bab242c72.png" alt="" className="user-pic" />
                                    </div>
                                    <div className="col s12 m11 comentario-card">
                                        <div className="nombre-comment">
                                            <div className="name">Jung JinSoul</div>
                                            <div className="date">12 de Abril de 2021 a las 12:34</div>
                                        </div>
                                        <div className="comment-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.
                                        </div>
                                    </div>
                                </div> */}
                                    {/* icono de agregar comentarios */}
                                    <div className="col s12 l12" style={{ "marginTop": "10px", marginBottom: "0px" }}>
                                        <div className="row center-align" style={{ display: "flex", alignContent: "center", justifyContent: "flex-start", marginBottom: "0px", height: "15px" }} >
                                            <span style={{ "color": "#134E39", "fontSize": "13px", "marginLeft": "0px", marginTop: "-1px", cursor: "pointer" }} onClick={handleForm}>Agregar comentario</span>
                                            <span>
                                                <i className="material-icons" style={{ "color": "#134E39", "fontSize": "13px", "marginLeft": "5px", cursor: "pointer" }} onClick={handleForm}>add_circle_outline</i>
                                            </span>
                                        </div>
                                    </div>
                                    {/* Este es el formulario para comentar */}
                                    {values.visibleForm &&
                                        <form onSubmit={handleSubmit}>
                                            {errors.comentario &&
                                                <label htmlFor="comentario" style={{ color: "red" }}>{errors.comentario}</label>
                                            }
                                            <textarea name="comentario" id="comentario" placeholder="Máximo 280 caracteres" maxLength="280" value={values.comentario} onChange={handleChange}></textarea>
                                            <div className="row container-buttons" style={{ marginBottom: "0px" }}>
                                                <button type="button" className=" center-align  btn waves-effect waves-light cancelar" style={{ marginRight: "15px" }} onClick={handleForm}>Cancelar</button>
                                                < button type="submit" id="button-enviar" className=" center-align btn waves-effect waves-light guardar" style={{ marginRight: "0%", marginLeft: "0" }}>
                                                    Agregar
                                                    <i className="material-icons right">send</i>
                                                </button>
                                            </div>
                                        </form>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}