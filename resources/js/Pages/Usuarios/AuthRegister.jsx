import React, { useEffect, useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'

import '../../styles/usersStyle.css'
import '/css/infoAlumno.css'
import '/css/register.css'
import '/css/registerReact.css'
import '/css/login.css'
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import Alertas from '../../components/common/Alertas';


const Usuarios = ({ categories, regimes, units }) => {
    //errores de la validacion de laravel
    const { errors } = usePage().props

    //valores para formulario
    const [values, setValues] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        email: "",
        contrasena: "",
        confirmar_contrasena: "",
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
        rol: ""
    })

    //actualiza los hooks cada vez que se modifica un input
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))

        if (key == "regimen") {
            Inertia.reload({ only: ['units'], data: { regime: value } })
            setValues(values => ({
                ...values,
                unidad: "",
            }))
        }
    }

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        var button = document.getElementById('buttonReg');
        button.disabled = true;
        Inertia.post(route('register'), values,
            {
                onError: () => {
                    button.disabled = false;
                    Inertia.reload({ only: ['units'], data: { regime: values.regimen } })
                },
                onSuccess: () => {
                    button.disabled = false;
                }
            }
        )
    }

    function clickFoto() {
        document.getElementById("foto").click();
    }

    function changeFoto() {
        var inputFotos = document.getElementById('foto');
        if (inputFotos.files && inputFotos.files[0]) {
            setValues(values => ({
                ...values,
                foto: inputFotos.files[0],
            }))
            document.getElementById("profileImage").src = window.URL.createObjectURL(inputFotos.files[0]);
        }
    }

    function changeTarjeton(e) {
        var inputFotos = document.getElementById('tarjeton_de_pago');
        if (inputFotos.files && inputFotos.files[0]) {
            setValues(values => ({
                ...values,
                tarjeton_de_pago: inputFotos.files[0],
            }))
        }

    }

    function initializeSelects() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
        var elems = document.querySelectorAll('.autocomplete');
        var instances = M.Autocomplete.init(elems);
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        initializeDatePicker();


        M.updateTextFields();
    }

    function initializeDatePicker() {
        var elems = document.querySelectorAll('.datepicker');
        var options = {
            format: 'yyyy-mm-dd',
            setDefaultDate: false,
            i18n: {
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Mi??rcoles', 'Jueves', 'Viernes', 'S??bado'],
                weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mi??', 'Jue', 'Vie', 'S??b'],
                weekdaysAbbrev: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
                selectMonths: true,
                selectYears: 100, // Puedes cambiarlo para mostrar m??s o menos a??os
                today: 'Hoy',
                clear: 'Limpiar',
                close: 'Ok',
                cancel: 'Cancelar',
                labelMonthNext: 'Siguiente mes',
                labelMonthPrev: 'Mes anterior',
                labelMonthSelect: 'Selecciona un mes',
                labelYearSelect: 'Selecciona un a??o',
            },
            onClose: () => {
                setValues(values => ({
                    ...values,
                    fecha_de_nacimiento: document.getElementById("fecha_de_nacimiento").value,
                }))
            },
        };
        const instancesDate = M.Datepicker.init(elems, options);
    }

    //se ejecuta cuando la pagina se renderiza
    useEffect(() => {
        initializeSelects();
        if (values.regimen)
            Inertia.reload({ only: ['units'], data: { regime: values.regimen } })
    }, [])

    return (
        <div style={{ backgroundColor: "#F4F4F4" }}>
            <div className="row">
                <div className="hide-on-small-only col s12 m3 l4 div-info-esc"
                    style={{
                        position: 'sticky',
                        top: '0px',
                        backgroundColor: '#F4F4F4',
                        paddingTop: '3%',
                        minHeight: '100%'
                    }}>
                    <div className="row" style={{ width: '100%' }}>
                        <div className="col s12 m12 l12" style={{ display: 'block' }}>
                            <ul className="tabs">
                                <li className="tab col xl6 l6 m6"><InertiaLink href={route('login')}>Ingresar</InertiaLink></li>
                                <li className="tab col xl6 l6 m6"><InertiaLink href={route('register')}>Registrarse</InertiaLink></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col s12 head-login forgot left-align">
                        <div className="left">
                            <div className="titulo1">Formaci??n XX Mich</div>
                            <div className="titulo2">Secci??n XX Michoac??n</div>
                        </div>
                        <div className="right">
                            <img src="img/imagenes/LogoSeccional.png" alt="Formaci??n XX Mich" width="80px" />
                        </div>
                    </div>

                    <div className="col s12" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                        {/* SVG */}
                        <img src={'/img/imagenes/Add_User.gif'} width={"90%"} />
                    </div>
                </div>

                {/* ---------------- DIV BLANCO DE FORM DE REGISTRO ------------- */}
                <div className="col s12 m9 l8 div-blanco-form" style={{ padding: '4%', paddingBottom: '0%', backgroundColor: 'white' }}>
                    <div className="col s12 head-login">

                        <img src="img/imagenes/LogoSeccional.png" className="col" alt="Formaci??n XX Mich" width="80px" style={{ display: 'none' }} />

                        <div className="escHead col" style={{ display: 'none' }}>
                            Formaci??n XX Mich Secci??n XX Michoac??n
                        </div>

                        <div className="row tabs-responsive-register" style={{ width: '100%' }}>
                            <div className="col s12 m12 l12" style={{ display: 'block' }}>
                                <ul className="tabs">
                                    <li className="tab col xl6 l6 m6"><a href={route('login')}>Ingresar</a></li>
                                    <li className="tab col xl6 l6 m6"><a href={route('register')}>Registrarse</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="titulo2 col s12">REGISTRARSE</div>
                    </div>

                    <div className={"col s12"}>
                        <Alertas />
                    </div>

                    {/* -- DIV PADRE DE DIVISIONES -- */}
                    <form onSubmit={handleSubmit}>
                        <div className="col s12 div-form-register">
                            <div className="col s6 div-division" style={{ padding: '2%', paddingLeft: '0px', borderRight: 'solid 1px rgba(159, 157, 157, 0.6)' }}>
                                <p className="titles-sub" style={{ marginLeft: '3%' }}>INFORMACI??N PERSONAL</p>

                                <div className="col s12" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                    <img id="profileImage" onClick={clickFoto} src="/img/avatar1.png" />
                                    <p id="txt-profile" style={{ "cursor": "pointer" }} onClick={clickFoto}>Foto de perfil</p>
                                </div>

                                <div className="input-field">
                                    <input id="foto" type="file" className={errors.foto ? "imageUpload validate form-control invalid" : "imageUpload validate form-control"}
                                        name="foto" placeholder="Photo" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={changeFoto}></input>
                                    {
                                        errors.foto &&
                                        <span className="helper-text" data-error={errors.foto} style={{ "marginBottom": "125px", color: "#F44336", maxHeight: "18px", marginLeft: "3%" }}>{errors.foto}</span>
                                    }
                                </div>

                                <div className="input-field col s12">
                                    <input id="nombre" type="text" className={errors.nombre ? "validate form-control invalid" : "validate form-control"} name="nombre" required autoComplete="nombre" value={values.nombre} onChange={handleChange} autoFocus maxLength="255" />
                                    <label htmlFor="nombre">Nombre</label>
                                    {
                                        errors.nombre &&
                                        <span className="helper-text" data-error={errors.nombre} style={{ "marginBottom": "10px" }}>{errors.nombre}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input id="apellido_paterno" type="text" className={errors.apellido_paterno ? "validate form-control invalid" : "validate form-control"} name="apellido_paterno" value={values.apellido_paterno} onChange={handleChange} required autoComplete="apellido_paterno" maxLength="255" />
                                    <label htmlFor="apellido_paterno">Ap. Paterno</label>
                                    {
                                        errors.apellido_paterno &&
                                        <span className="helper-text" data-error={errors.apellido_paterno} style={{ "marginBottom": "10px" }}>{errors.apellido_paterno}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input id="apellido_materno" type="text" className={errors.apellido_materno ? "validate form-control invalid" : "validate form-control"} name="apellido_materno" value={values.apellido_materno} onChange={handleChange} autoComplete="apellido_materno" maxLength="255" />
                                    <label htmlFor="apellido_materno">Ap. Materno (Op)</label>
                                    {
                                        errors.apellido_materno &&
                                        <span className="helper-text" data-error={errors.apellido_materno} style={{ "marginBottom": "10px" }}>{errors.apellido_materno}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input id="fecha_de_nacimiento" type="text" className={errors.fecha_inicio ? "validate datepicker invalid" : "validate datepicker"} name="fecha_de_nacimiento" required value={values.fecha_de_nacimiento} autoComplete="fecha_nacimiento" />
                                    <label htmlFor="fecha_de_nacimiento">Fec. Nacimiento</label>
                                    {
                                        errors.fecha_de_nacimiento &&
                                        <span className="helper-text" data-error={errors.fecha_de_nacimiento} style={{ "marginBottom": "10px" }}>{errors.fecha_de_nacimiento}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <select id="sexo" name="sexo" autoComplete="sexo" value={values.sexo} onChange={handleChange} className={errors.sexo ? "input-field invalid" : "input-field"}>
                                        <option value="" disabled>Seleccionar</option>
                                        <option value="m">Femenino</option>
                                        <option value="h">Masculino</option>
                                        <option value="o">Otro</option>
                                    </select>
                                    <label>Sexo</label>
                                    {
                                        errors.sexo &&
                                        <span className="helper-text" data-error={errors.sexo} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.sexo}</span>
                                    }
                                </div>

                                <p className="titles-sub" style={{ marginLeft: '3%' }}>DIRECCI??N</p>

                                <div className="input-field col s12 ">
                                    <input maxLength="50" id="estado" type="text" className={errors.estado ? "validate form-control invalid" : "validate"} name="estado" value={values.estado} required autoComplete="estado" onChange={handleChange} />
                                    <label htmlFor="estado">Estado</label>

                                    {
                                        errors.estado &&
                                        <span className="helper-text" data-error={errors.estado} style={{ "marginBottom": "10px" }}>{errors.estado}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input maxLength="60" id="ciudad" type="text" className={errors.ciudad ? "validate form-control invalid" : "validate"} name="ciudad" value={values.ciudad} required autoComplete="ciudad" onChange={handleChange} />
                                    <label htmlFor="ciudad">Ciudad</label>
                                    {
                                        errors.ciudad &&
                                        <span className="helper-text" data-error={errors.ciudad} style={{ "marginBottom": "10px" }}>{errors.ciudad}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input maxLength="100" id="colonia" type="text" className={errors.colonia ? "validate form-control invalid" : "validate"} name="colonia" value={values.colonia} required autoComplete="colonia" onChange={handleChange} />
                                    <label htmlFor="colonia">Colonia</label>
                                    {
                                        errors.colonia &&
                                        <span className="helper-text" data-error={errors.colonia} style={{ "marginBottom": "10px" }}>{errors.colonia}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input maxLength="100" id="calle" type="text" className={errors.calle ? "validate form-control invalid" : "validate"} name="calle" value={values.calle} required autoComplete="calle" onChange={handleChange} />
                                    <label htmlFor="calle">Calle</label>
                                    {
                                        errors.calle &&
                                        <span className="helper-text" data-error={errors.calle} style={{ "marginBottom": "10px" }}>{errors.calle}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input maxLength="9" id="codigo_postal" type="text" className={errors.codigo_postal ? "validate form-control invalid" : "validate"} name="codigo_postal" value={values.codigo_postal} required autoComplete="codigo_postal" onChange={handleChange} />
                                    <label htmlFor="codigo_postal">C??digo Postal</label>
                                    {
                                        errors.codigo_postal &&
                                        <span className="helper-text" data-error={errors.codigo_postal} style={{ "marginBottom": "10px" }}>{errors.codigo_postal}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input maxLength="10" id="numero_exterior" type="text" className={errors.numero_exterior ? "validate form-control invalid" : "validate"} name="numero_exterior" value={values.numero_exterior} required autoComplete="numero_exterior" onChange={handleChange} />
                                    <label htmlFor="numero_exterior">No. Exterior</label>
                                    {
                                        errors.numero_exterior &&
                                        <span className="helper-text" data-error={errors.numero_exterior} style={{ "marginBottom": "10px" }}>{errors.numero_exterior}</span>
                                    }
                                </div>

                                <div className="input-field col s6 input-50-re">
                                    <input maxLength="10" id="numero_interior" type="text" className={errors.numero_interior ? "validate form-control invalid" : "validate"} name="numero_interior" value={values.numero_interior} autoComplete="numero_interior" onChange={handleChange} />
                                    <label htmlFor="numero_interior">No. Interior (Op)</label>
                                    {
                                        errors.numero_interior &&
                                        <span className="helper-text" data-error={errors.numero_interior} style={{ "marginBottom": "10px" }}>{errors.numero_interior}</span>
                                    }
                                </div>
                            </div>

                            <div className="col s6 div-division" style={{ padding: '2%' }}>
                                <p className="titles-sub" style={{ marginLeft: '3%' }}>INFORMACI??N INSTITUCIONAL</p>

                                <div className="input-field col s12">
                                    <input id="matricula" type="text" className={errors.matricula ? "validate form-control invalid" : "validate"} name="matricula" value={values.matricula} onChange={handleChange} required autoComplete="matricula" maxLength="10" />
                                    <label htmlFor="matricula">Matr??cula</label>
                                    {
                                        errors.matricula &&
                                        <span className="helper-text" data-error={errors.matricula} style={{ "marginBottom": "10px" }}>{errors.matricula}</span>
                                    }
                                </div>

                                <div className="input-field col s12">
                                    <select id="regimen" name="regimen" value={values.regimen} onChange={handleChange} >
                                        <option value="" disabled>Selecciona una opci??n</option>
                                        {regimes && regimes.length > 0 &&
                                            regimes.map(regime => (
                                                <option key={regime.nombre} value={regime.nombre}>{regime.nombre}</option>
                                            ))
                                        }
                                    </select>
                                    <label>Regimen</label>
                                    {
                                        errors.regimen &&
                                        <span className="helper-text" data-error={errors.regimen} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.regimen}</span>
                                    }
                                </div>

                                <div className="col s12" style={{ "marginTop": "5px" }}>
                                    <div className="input-field select-wrapper">
                                        <input placeholder={values.regimen ? "Selecciona una unidad" : "Selecciona primerio un r??gimen"} id="unidad" list="unidades" type="text" className={errors.unidad ? "datalist-register validate form-control invalid" : "datalist-register validate"} value={values.unidad} onChange={handleChange} required autoComplete="off" />
                                        <label htmlFor="unidad">Unidad</label>
                                        <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                        {
                                            errors.unidad &&
                                            <span className="helper-text" data-error={errors.unidad} style={{ "marginBottom": "10px" }}>{errors.unidad}</span>
                                        }
                                    </div>
                                    <datalist id="unidades">
                                        {
                                            units && units.length > 0 &&
                                            units.map(units => (
                                                <option key={units.nombre} value={units.nombre} />
                                            ))
                                        }
                                    </datalist>
                                </div>

                                <div className="col s12">
                                    <div className="input-field select-wrapper">
                                        <input placeholder="Selecciona una categor??a" id="categoria" list="categorias" type="text" className={errors.unidad ? "datalist-register validate form-control invalid" : "datalist-register validate"} value={values.categoria} onChange={handleChange} required autoComplete="off" />
                                        <svg className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <label htmlFor="categoria">Categor??a</label>
                                        {
                                            errors.categoria &&
                                            <span className="helper-text" data-error={errors.categoria} style={{ "marginBottom": "10px" }}>{errors.categoria}</span>
                                        }
                                    </div>
                                    <datalist id="categorias">
                                        {
                                            categories && categories.length > 0 &&
                                            categories.map(category => (
                                                <option key={category.nombre} value={category.nombre} />
                                            ))
                                        }
                                    </datalist>
                                </div>

                                {/* -- INPUT FILE -- */}
                                <div className="area col s12" style={{ marginBottom: "4%" }}>
                                    <p style={{ "marginTop": "0px", "fontFamily": "Montserrat", "fontSize": "13px", color: "rgb(159, 157, 157)", cursor: "pointer" }}>Tarjet??n de pago<i className="material-icons tiny tooltipped" data-position="top" data-tooltip="Archivo (PDF) para validar que seas un usuario activo">help_outline</i></p>
                                    <div className="file-field input-field" style={{ "border": "1px dashed rgba(159, 157, 157, 0.6)", boxSizing: "border-box", borderRadius: "4px" }}>
                                        <div className="col s12">
                                            <span style={{ fontSize: "12px", textAlign: "center", paddingTop: "10px" }} className="col s12">Arrastre aqu?? el archivo o <b>clic</b> para seleccionarlo</span>
                                            <input type="file" accept="image/png, image/jpeg, image/jpg, application/pdf" className={errors.tarjeton_de_pago ? "form-control is-invalid" : "form-control"} id="tarjeton_de_pago" name="tarjeton_de_pago" required autoComplete="tarjeton" onChange={changeTarjeton} />
                                            {
                                                errors.tarjeton_de_pago &&
                                                <span className="helper-text" data-error={errors.tarjeton_de_pago} style={{ "marginBottom": "10px", color: "#F44336" }}>{errors.tarjeton_de_pago}</span>
                                            }
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" />
                                        </div>
                                    </div>
                                </div>

                                <p className="titles-sub" style={{ marginLeft: '3%' }}>CUENTA</p>

                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="email" type="email" className={errors.email ? "validate form-control invalid" : "validate form-control"} name="email" value={values.email} required onChange={handleChange} readOnly onFocus={(e) => { e.target.removeAttribute("readonly") }} />
                                    <label htmlFor="email">Correo electr??nico</label>
                                    {
                                        errors.email &&
                                        <span className="helper-text" data-error={errors.email} style={{ "marginBottom": "10px" }}>{errors.email}</span>
                                    }
                                </div>

                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="contrasena" type="password" className={errors.contrasena ? "validate form-control invalid" : "validate form-control"} name="contrasena" value={values.contrasena} required onChange={handleChange} />
                                    <label htmlFor="contrasena">Contrase??a</label>
                                    {
                                        errors.contrasena &&
                                        <span className="helper-text" data-error={errors.contrasena} style={{ "marginBottom": "10px" }}>{errors.contrasena}</span>
                                    }
                                </div>

                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="confirmar_contrasena" type="password" className={errors.confirmar_contrasena ? "validate form-control invalid" : "validate form-control"} name="confirmar_contrasena" value={values.confirmar_contrasena} required onChange={handleChange} />
                                    <label htmlFor="confirmar_contrasena">Confirmar contrase??a</label>
                                    {
                                        errors.confirmar_contrasena &&
                                        <span className="helper-text" data-error={errors.confirmar_contrasena} style={{ "marginBottom": "10px" }}>{errors.confirmar_contrasena}</span>
                                    }
                                </div>

                                <div className="col s12 right-align">
                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" id="buttonReg" className="btn-primary btn waves-effect waves-teal btn-login" style={{ height: '54px' }}>
                                                REGISTRARME
                                                <i className="material-icons right">arrow_forward</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="col s12 footer-login" style={{ padding: '15px' }}>
                        ?? 2021 Formaci??n XX Mich | &nbsp; <a href="https://dragonware.com.mx" target="_blank"> Desarrollado por
                            DragonWare
                            <img src="img/imagenes/dragonWare.png" alt="DragonWare" width="22px" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usuarios