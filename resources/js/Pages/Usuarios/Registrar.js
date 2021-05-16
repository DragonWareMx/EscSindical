import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { usePage } from '@inertiajs/inertia-react'

import '../../styles/usersStyle.css'
import '/css/infoAlumno.css'
import '/css/register.css'
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';


const Usuarios = ({categories, regimes, units}) => {
    //errores de la validacion de laravel
    const { errors } = usePage().props

    //valores para formulario
    const [values, setValues] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        email: "",
        fecha_de_nacimiento: "",
        sexo: "",
        matricula: "",
        categoria: "",
        unidad: "",
        regimen: "",
        estado: "",
        ciudad: "",
        colonia: "",
        calle: "",
        codigo_postal: "",
        numero_exterior: "",
        numero_interior: "",
        tarjeton_de_pago: "",
        foto: null,
    })

    //actualiza los hooks cada vez que se modifica un input 
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))

        if(key == "regimen")
        {
            Inertia.reload({only: ['units'], data: {regime: value}})
            setValues(values => ({
                ...values,
                unidad: "",
            }))
        }
    }

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('usuarios.store'), values, 
            {
                onError: () => {
                    Inertia.reload({only: ['units'], data: {regime: values.regimen}})
                }
            }
        )
    }

    //boton de cancelar
    function cancelEditUser(){
        Inertia.get(route('usuarios'))
    }

    function clickFoto(){
        document.getElementById("imageUpload").click();
    }

    function changeFoto(){
        var inputFotos = document.getElementById('imageUpload');
        if ( inputFotos.files && inputFotos.files[0] ){
            document.getElementById("profileImage").src = window.URL.createObjectURL(inputFotos.files[0]);
        }
        
    }

    function initializeSelects() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems);
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);

        M.updateTextFields();
    }

    //se ejecuta cuando la pagina se renderiza
    useEffect(() => {
        initializeSelects();
        if(values.regimen)
            Inertia.reload({only: ['units'], data: {regime: values.regimen}})
    }, [])

    return (
        <div className="row contenedor">
            <div className="col contenedor s12">
                <div className="card darken-1 cardUsers">
                    <div className="card-content">
                        <span className="card-title">Usuarios / Crear Usuario</span>

                        {/* ----Formulario---- */}
                        <form onSubmit={handleSubmit}>
                            <div className="row div-form-register" style={{"padding":"3%"}}>
                                <div className="col s12 m6 div-division user-form-border">
                                    <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN PERSONAL</p>

                                    <div className="col s12" style={{"display": "flex","justifyContent":"center", "flexDirection":"column","marginTop":"5px","marginBottom":"5px"}}>
                                        <img id="profileImage" onClick={clickFoto} src={values.foto ? values.foto : "/storage/fotos_perfil/avatar1.jpg"}></img>
                                        <p id="txt-profile" style={{"cursor":"pointer"}} onClick={clickFoto}>Foto de perfil</p>
                                    </div>

                                    <input id="imageUpload" type="file" className={errors.foto ? "validate form-control invalid" : "validate form-control"}
                                        name="foto" placeholder="Photo" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={changeFoto}></input>
                                        {
                                            errors.foto && 
                                            <span className="helper-text" data-error={errors.foto} style={{"marginBottom":"10px"}}>{errors.foto}</span>
                                        }

                                    <div className="input-field col s12">
                                        <input  disabled={false} id="nombre" type="text" className={errors.nombre ? "validate form-control invalid" : "validate form-control"} name="nombre" required autoComplete="nombre" value={values.nombre} onChange={handleChange} autoFocus maxLength="255"/>
                                        <label htmlFor="nombre">Nombre</label>
                                        {
                                            errors.nombre && 
                                            <span className="helper-text" data-error={errors.nombre} style={{"marginBottom":"10px"}}>{errors.nombre}</span>
                                        }
                                    </div>

                                    <div className="input-field col s12 input-50-re">
                                        <input disabled={false} id="apellido_paterno" type="text" className={errors.apellido_paterno ? "validate form-control invalid" : "validate form-control"}  name="apellido_paterno" value={values.apellido_paterno} onChange={handleChange} required autoComplete="apellido_paterno" maxLength="255"/>
                                        <label htmlFor="apellido_paterno">Apellido Paterno</label>
                                        {
                                            errors.apellido_paterno && 
                                            <span className="helper-text" data-error={errors.apellido_paterno} style={{"marginBottom":"10px"}}>{errors.apellido_paterno}</span>
                                        }
                                        
                                    </div>

                                    <div className="input-field col s12 input-50-re">
                                        <input  disabled={false} id="apellido_materno" type="text" className={errors.apellido_materno ? "validate form-control invalid" : "validate form-control"} name="apellido_materno" value={values.apellido_materno} onChange={handleChange} autoComplete="apellido_materno" maxLength="255"/>
                                        <label htmlFor="apellido_materno">Apellido Materno (opcional)</label>
                                        {
                                            errors.apellido_materno && 
                                            <span className="helper-text" data-error={errors.apellido_materno} style={{"marginBottom":"10px"}}>{errors.apellido_materno}</span>
                                        }
                                    </div>

                                    <div className="input-field col s12 input-50-re">
                                        <input disabled={false} id="fecha_de_nacimiento" className={errors.fecha_de_nacimiento ? "validate form-control invalid" : "validate form-control"} type="date" name="fecha_de_nacimiento" required autoComplete="fecha_de_nacimiento" value={values.fecha_de_nacimiento} onChange={handleChange} />
                                        <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento</label>
                                        {
                                            errors.fecha_de_nacimiento && 
                                            <span className="helper-text" data-error={errors.fecha_de_nacimiento} style={{"marginBottom":"10px"}}>{errors.fecha_de_nacimiento}</span>
                                        }
                                    </div>

                                    <div className="input-field col s12 input-50-re">
                                        <select disabled={false} id="sexo" name="sexo" required autoComplete="sexo" value={values.sexo} onChange={handleChange} className={errors.sexo ? "input-field invalid" : "input-field"}>
                                            <option value="" disabled>Selecciona una opción</option>
                                            <option value="m">Femenino</option>
                                            <option value="h">Masculino</option>
                                            <option value="o">Otro</option>
                                        </select>
                                        <label>Sexo</label>
                                        {
                                            errors.sexo && 
                                            <span className="helper-text" data-error={errors.sexo} style={{"marginBottom":"10px", color: "#F44336"}}>{errors.sexo}</span>
                                        }
                                    </div>

                                    <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN INSTITUCIONAL</p>

                                    <div className="input-field col s12">
                                        <input  disabled={false} id="matricula" type="text" className={errors.matricula ? "validate form-control invalid" : "validate"} name="matricula" value={values.matricula} onChange={handleChange} required autoComplete="matricula" maxLength="255"/>
                                        <label htmlFor="matricula">Matrícula</label>
                                        {
                                            errors.matricula && 
                                            <span className="helper-text" data-error={errors.matricula} style={{"marginBottom":"10px"}}>{errors.matricula}</span>
                                        }
                                    </div>

                                    <div className="input-field col s12">
                                        <select disabled={false} id="regimen" name="regimen" value={values.regimen} onChange={handleChange} required>
                                            <option value="" disabled>Selecciona una opción</option>
                                            {regimes && regimes.length > 0 && 
                                                regimes.map(regime => (
                                                    <option key={regime.nombre} value={regime.nombre}>{regime.nombre}</option>
                                                ))
                                            }
                                        </select>
                                        <label>Regimen</label>
                                        {
                                            errors.regimen && 
                                            <span className="helper-text" data-error={errors.regimen} style={{"marginBottom":"10px", color: "#F44336"}}>{errors.regimen}</span>
                                        }
                                    </div>

                                    <div className="col s12" style={{"marginTop":"5px"}}>
                                        <div className="input-field select-wrapper">
                                            <input placeholder={values.regimen ? "Selecciona una unidad" : "Selecciona primerio un régimen"} disabled={false} id="unidad" list="unidades" type="text" className={errors.unidad ? "validate form-control invalid" : "validate"} value={values.unidad} onChange={handleChange} required/>
                                            <label htmlFor="unidad">Unidad</label>
                                            <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                            {
                                                errors.unidad && 
                                                <span className="helper-text" data-error={errors.unidad} style={{"marginBottom":"10px"}}>{errors.unidad}</span>
                                            }
                                        </div>
                                        <datalist id="unidades">
                                            {
                                                units && units.length > 0 &&
                                                units.map(units => (
                                                    <option key={units.nombre} value={units.nombre}/>
                                                ))
                                            }
                                        </datalist>
                                    </div>

                                    <div className="col s12">
                                        <div className="input-field select-wrapper">
                                            <input placeholder="Selecciona una categoría" disabled={false} id="categoria" list="categorias" type="text" className={errors.unidad ? "validate form-control invalid" : "validate"} value={values.categoria} onChange={handleChange} required/>
                                            <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                            <label htmlFor="categoria">Categoría</label>
                                            {
                                                errors.categoria && 
                                                <span className="helper-text" data-error={errors.categoria} style={{"marginBottom":"10px"}}>{errors.categoria}</span>
                                            }
                                        </div>
                                        <datalist id="categorias">
                                            {
                                                categories && categories.length > 0 &&
                                                categories.map(category => (
                                                    <option key={category.nombre} value={category.nombre}/>
                                                ))
                                            }
                                        </datalist>
                                    </div>

                                    <p style={{"marginTop":"0px", "fontFamily":"Montserrat" ,"fontSize":"13px"}}>Tarjetón de pago <a target="_blank">tarjeton</a><i style={{"color":"#7E7E7E"}} className="material-icons tiny">description</i></p>
                                </div>
                                <div className="col s12 m6 div-division">
                                    <p className="titles-sub" style={{"marginLeft":"3%"}}>DIRECCIÓN</p>

                                    <div className="input-field col s6 ">
                                        <input disabled={false} maxLength="50" id="estado" type="text" className={errors.estado ? "validate form-control invalid" : "validate"} name="estado"  value={values.estado} required autoComplete="estado" onChange={handleChange}/>
                                        <label htmlFor="estado">Estado</label>
                                        {
                                            errors.estado && 
                                            <span className="helper-text" data-error={errors.estado} style={{"marginBottom":"10px"}}>{errors.estado}</span>
                                        }
                                    </div>

                                    <div className="input-field col s6 input-50-re">
                                        <input disabled={false} maxLength="60" id="ciudad" type="text" className={errors.ciudad ? "validate form-control invalid" : "validate"} name="ciudad" value={values.ciudad} required autoComplete="ciudad" onChange={handleChange}/>
                                        <label htmlFor="ciudad">Ciudad</label>
                                        {
                                            errors.ciudad && 
                                            <span className="helper-text" data-error={errors.ciudad} style={{"marginBottom":"10px"}}>{errors.ciudad}</span>
                                        }
                                    </div>

                                    <div className="input-field col s12 input-50-re">
                                        <input disabled={false} maxLength="100" id="colonia" type="text" className={errors.colonia ? "validate form-control invalid" : "validate"} name="colonia" value={values.colonia} required autoComplete="colonia" onChange={handleChange}/>
                                        <label htmlFor="colonia">Colonia</label>
                                        {
                                            errors.colonia && 
                                            <span className="helper-text" data-error={errors.colonia} style={{"marginBottom":"10px"}}>{errors.colonia}</span>
                                        }
                                    </div>

                                    <div className="input-field col s12 input-50-re">
                                        <input  disabled={false} maxLength="100" id="calle" type="text" className={errors.calle ? "validate form-control invalid" : "validate"} name="calle" value={values.calle} required autoComplete="calle" onChange={handleChange}/>
                                        <label htmlFor="calle">Calle</label>
                                        {
                                            errors.calle && 
                                            <span className="helper-text" data-error={errors.calle} style={{"marginBottom":"10px"}}>{errors.calle}</span>
                                        }
                                    </div>

                                    <div className="input-field col s6 input-50-re">
                                        <input disabled={false} maxLength="10" id="codigo_postal" type="text"  className={errors.codigo_postal ? "validate form-control invalid" : "validate"} name="codigo_postal" value={values.codigo_postal} required autoComplete="codigo_postal" onChange={handleChange}/>
                                        <label htmlFor="codigo_postal">Código Postal</label>
                                        {
                                            errors.codigo_postal && 
                                            <span className="helper-text" data-error={errors.codigo_postal} style={{"marginBottom":"10px"}}>{errors.codigo_postal}</span>
                                        }
                                    </div>

                                    <div className="input-field col s6 input-50-re">
                                        <input disabled={false} maxLength="10" id="numero_exterior" type="text" className={errors.numero_exterior ? "validate form-control invalid" : "validate"} name="numero_exterior" value={values.numero_exterior} required autoComplete="numero_exterior" onChange={handleChange}/>
                                        <label htmlFor="numero_exterior">No. Exterior</label>
                                        {
                                            errors.numero_exterior && 
                                            <span className="helper-text" data-error={errors.numero_exterior} style={{"marginBottom":"10px"}}>{errors.numero_exterior}</span>
                                        }
                                    </div>

                                    <div className="input-field col s6 input-50-re">
                                        <input disabled={false} maxLength="10" id="numero_interior" type="text" className={errors.numero_interior ? "validate form-control invalid" : "validate"} name="numero_interior" value={values.numero_interior}  autoComplete="numero_interior" onChange={handleChange}/>
                                        <label htmlFor="numero_interior">No. Interior (opcional)</label>
                                        {
                                            errors.numero_interior && 
                                            <span className="helper-text" data-error={errors.numero_interior} style={{"marginBottom":"10px"}}>{errors.numero_interior}</span>
                                        }
                                    </div>

                                    <p className="titles-sub" style={{"marginLeft":"3%"}}>CUENTA</p>

                                    <div className="input-field col s12">
                                        <input disabled={false} id="email" type="email" className={errors.email ? "validate form-control invalid" : "validate form-control"}  name="email" value={values.email} required autoComplete="email" onChange={handleChange}/>
                                        <label htmlFor="email">Correo electrónico</label>
                                        {
                                            errors.email && 
                                            <span className="helper-text" data-error={errors.email} style={{"marginBottom":"10px"}}>{errors.email}</span>
                                        }
                                    </div>

                                    <div className="input-field col s12 input-50-re">
                                        {values.created_at ? 
                                        <>
                                            <input disabled={true} id="created_at" max="2004-01-01" type="date" name="created_at" required autoComplete="created_at" value={values.created_at} onChange={handleChange}/>
                                            <label htmlFor="created_at">Fecha de Registro</label>
                                        </>
                                        :
                                        <>
                                            <label htmlFor="created_at">Sin fecha de registro</label>
                                        </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            {values.deleted_at && <button data-target="modalEliminarUsuario" type="button" className="col s3 m2 center-align modal-trigger" style={{"border":"none","backgroundColor":"transparent","color":"#515B60","cursor":"pointer"}}><i className="material-icons">delete</i></button>}
                                <button type="button" className="col s3 m2 center-align offset-s6 offset-m8 btn waves-effect waves-light" onClick={cancelEditUser}>Cancelar</button>
                                <button type="submit" className="col s3 m2 center-align btn waves-effect waves-light">
                                    Guardar
                                    <i className="material-icons right">send</i>
                                </button>
                            </div> 
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}

Usuarios.layout = page => <Layout children={page} title="Escuela Sindical - Usuarios" pageTitle="USUARIOS" />

export default Usuarios