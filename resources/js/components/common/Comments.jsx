import React, { useState } from 'react';
import '../../styles/comentarios.css';
import { Inertia } from '@inertiajs/inertia'

export default function Comments({ idModulo, idCurso, idEntrada }) {
    const [values, setValues] = useState({
        visible: true,
        visibleForm: false
    })

    function handleForm() {
        setValues(values => ({
            ...values,
            visibleForm: !values.visibleForm,
            comentario: '',
        }))
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
        e.preventDefault()
        Inertia.post(route('comment.create', { cid: idCurso, mid: idModulo, pid: idEntrada }), values,
            {
                onError: () => {
                    // Inertia.reload({ only: ['cursos'], data: { regime: values.regimen } })
                },
                onSuccess: () => {
                    //esto es para borrar el input al poner el comentario
                    setValues(values => ({
                        ...values,
                        comentario: '',
                    }))
                }
            }
        )
    }

    return (
        <div className="col s12" style={{ margin: "10px 0px 5px 0px", padding: "0px" }}>
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
                                            <span>
                                                <i className="material-icons" style={{ "color": "#848484", "fontSize": "13px" }}>comment</i>
                                            </span>
                                            <span style={{ "color": "#848484", "fontSize": "13px", "marginLeft": "3px", marginTop: "-1px" }}>4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* icono de ocultar comentarios */}
                            <div className="col s4 l2" style={{ "marginTop": "10px" }}>
                                <div className="row center-align" style={{ display: "flex", alignContent: "center", justifyContent: "flex-end" }}>
                                    <span>
                                        <i className="material-icons" style={{ "color": "#134E39", "fontSize": "16px" }}>visibility_off</i>
                                    </span>
                                    <span style={{ "color": "#134E39", "fontSize": "14px", "marginLeft": "5px", marginTop: "-2px" }}>Ocultar</span>
                                </div>
                            </div>

                            {/*Resto del div donde van los comentarios*/}
                            <div className="col s12" style={{ "marginTop": "0px" }}>
                                {/* Aquí van los comentarios */}
                                <div className="comment-container">
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
                                </div>
                                {/* icono de agregar comentarios */}
                                <div className="col s12 l12" style={{ "marginTop": "10px", marginBottom: "0px" }}>
                                    <div className="row center-align" style={{ display: "flex", alignContent: "center", justifyContent: "flex-start", marginBottom: "0px", height: "15px" }} >
                                        <span style={{ "color": "#134E39", "fontSize": "13px", "marginLeft": "5px", marginTop: "-1px", cursor: "pointer" }} onClick={handleForm}>Agregar comentario</span>
                                        <span>
                                            <i className="material-icons" style={{ "color": "#134E39", "fontSize": "13px", "marginLeft": "5px", cursor: "pointer" }} onClick={handleForm}>add_circle_outline</i>
                                        </span>
                                    </div>
                                </div>

                                {/* Este es el formulario para comentar */}
                                {values.visibleForm &&
                                    <form onSubmit={handleSubmit}>
                                        <textarea name="comentario" id="comentario" placeholder="Máximo 280 caracteres" maxLength="280" value={values.comentario} onChange={handleChange}></textarea>
                                        <div className="row container-buttons" style={{ marginBottom: "0px" }}>
                                            <button type="button" className=" center-align  btn waves-effect waves-light cancelar" style={{ marginRight: "15px" }} onClick={handleForm}>Cancelar</button>
                                            < button type="submit" className=" center-align btn waves-effect waves-light guardar" style={{ marginRight: "0%", marginLeft: "0" }}>
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
        </div>
    )
}