import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
//import circlesImg from '../images/circles.png'
//import emptyImg from '../images/empty.png'
//import './styles/Card.css'
import '/css/infoAlumno.css'
import '/css/register.css'
import '/css/login.css'
function initializeCollaps() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems);
}

export default function InfoAlumno({user}) {
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
        Inertia.post('/users', values)
    }

    //valores para formulario
    const [values, setValues] = useState({
        nombre: user==null ? "" : user.nombre,
        apellido_p: "",
        apellido_m: "",
        email: "",
    })
    useEffect(() => {
        initializeCollaps();
    }, [])

    return (
        <div>
            <div className="fixed-action-btn" style={{"marginRight":"70px"}}>
                <a className="btn-floating btn-large waves-effect waves-light green-sind modal-trigger" href="#modalInfoAlumno"><i className="material-icons">accessibility</i></a>
            </div>
            <div id="modalInfoAlumno" className="modal">
                <div className="modal-content">
                    <div className="modal-close right"><i className="material-icons">close</i></div>
                    <div style={{"color":"#134E39","fontSize":"16px","fontStyle": "normal"}}>VER USUARIO</div>
                    <ul className="collapsible">
                        <li className="active">
                            <div className="collapsible-header" style={{"color":"#108058"}}><i className="material-icons">person</i>Información personal</div>
                            <div className="collapsible-body collapsible-padding">
                                <form method="POST" action="{{ route('register') }}" encType="multipart/form-data">
                                    {/* <input type="hidden" name="_token" value="{{ csrf_token() }}"></input>
                                    <meta name="csrf-token" content="{{ csrf_token() }}"/> */}
                                    <div className="row div-form-register" style={{"padding":"3%"}}>
                                        <div className="col s12 m6 div-division">
                                            <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN PERSONAL</p>

                                            <div className="col s12" style={{"display": "flex","justifyContent":"center", "flexDirection":"column"}}>
                                                <img id="profileImage" src="/storage/fotos_perfil/avatar1.png" ></img>
                                                <p id="txt-profile">Foto de perfil</p>
                                            </div>

                                            <input id="imageUpload" type="file" className="form-control " /*@error('foto_perfil') is-invalid @enderror*/
                                                name="foto_perfil" placeholder="Photo"   /*value="{{ old('foto_perfil') }}"*/ accept="image/png, image/jpeg, image/jpg, image/gif"></input>
                                                {/* @error('foto_perfil')
                                                <span class="invalid-feedback col s12" role="alert" style="margin-bottom:12px; text-align:center">
                                                    <strong>{{ $message }}</strong>
                                                </span> 
                                                @enderror */}

                                            <div className="input-field col s12">
                                                <input  id="nombre" type="text" className="validate form-control" /*@error('nombre') is-invalid @enderror*/ name="nombre" required autoComplete="nombre" value={values.nombre} onChange={handleChange} autoFocus/>
                                                <label htmlFor="nombre">Nombre</label>
                                                {/* @error('nombre')
                                                    <span class="invalid-feedback" role="alert" style="margin-bottom:12px;">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror */}
                                            </div>
                                            <div className="input-field col s12 input-50-re">
                                                <input  id="apellido_paterno" type="text" className="validate form-control" /*@error('apellido_paterno') is-invalid @enderror*/ name="apellido_paterno" /*value="{{ old('apellido_paterno') }}"*/ required autoComplete="apellido_paterno"/>
                                                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                                                {/* @error('apellido_paterno')
                                                    <span class="invalid-feedback" role="alert" style="margin-bottom:12px;">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror */}
                                            </div>
                                            <div className="input-field col s12 input-50-re">
                                                <input  id="apellido_materno" type="text" className="validate form-control" /*@error('apellido_materno') is-invalid @enderror*/ name="apellido_materno" /*value="{{ old('apellido_materno') }}" */ autoComplete="apellido_materno"/>
                                                <label htmlFor="apellido_materno">Apellido Materno</label>
                                                {/* @error('apellido_materno')
                                                    <span class="invalid-feedback" role="alert" style="margin-bottom:12px;">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror */}
                                            </div>
                                            <div className="input-field col s12 input-50-re">
                                                <input id="fecha_nacimiento" max="2004-01-01" type="date" name="fecha_nacimiento" /*value="{{ old('fecha_nacimiento') }}"*/ required autoComplete="fecha_nacimiento"/>
                                                <label htmlFor="fecha_nacimiento">Fec. Nacimiento</label>
                                            </div>
                                            <div className="input-field col s12 input-50-re">
                                                <select id="sexo" name="sexo" required autoComplete="sexo">
                                                    <option value="Femenino" /*{{ old('sexo') == 'Femenino' ? 'selected' : '' }}*/>Femenino</option>
                                                    <option value="Masculino" /*{{ old('sexo') == 'Masculino' ? 'selected' : '' }}*/>Masculino</option>
                                                </select>
                                                <label>Sexo</label>
                                            </div>

                                            <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN INSTITUCIONAL</p>

                                            <div className="input-field col s12">
                                                <input  id="matricula" type="text" className="validate" name="matricula" /*value="{{ old('matricula') }}"*/ required autoComplete="matricula"/>
                                                <label htmlFor="matricula">Matrícula</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <select id="regimen" name="regimen" required autoComplete="regimen">
                                                    <option value="" disabled selected>Selecciona una opción</option>
                                                    <option value="1" /*{{ old('regimen') == 1 ? 'selected' : '' }}*/>Ordinario</option>
                                                    <option value="2" /*{{ old('regimen') == 2 ? 'selected' : '' }}*/>Bienestar</option>
                                                </select>
                                                <label>Regimen</label>
                                            </div>

                                            <div className="input-field col s12" style={{"marginTop":"5px"}}>
                                                <select id="unidad" name="unidad" required autoComplete="unidad">
                                                    <option value="" disabled selected>Selecciona una opción</option>
                                                    <option value="1" /*{{ old('unidad') == 1 ? 'selected' : '' }}*/>UMF 75 - Morelia c/UMAA</option>
                                                    <option value="2" /*{{ old('unidad') == 2 ? 'selected' : '' }}*/>UMF 80 - Morelia</option>
                                                </select>
                                                <label>Unidad</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input type="text" id="autocomplete-input" name="categoria" required autoComplete="categoria" className="autocomplete"/>
                                                <label htmlFor="autocomplete-input">Categoría</label>
                                            </div>

                                            <p style={{"marginTop":"0px", "fontFamily":"Montserrat" ,"fontSize":"13px"}}>Tarjetón de pago <a>NombreDelArchivo.pdf</a><i style={{"color":"#7E7E7E"}} className="material-icons tiny">description</i></p>
                                        </div>
                                        <div className="col s12 m6 div-division">
                                            <p className="titles-sub" style={{"marginLeft":"3%"}}>DIRECCIÓN</p>

                                            <div className="input-field col s6 ">
                                                <input  id="estado" type="text" className="validate" name="estado" /*value="{{ old('estado') }}"*/ required autoComplete="estado"/>
                                                <label htmlFor="estado">Estado</label>
                                            </div>

                                            <div className="input-field col s6 input-50-re">
                                                <input  id="ciudad" type="text" className="validate" name="ciudad" /*value="{{ old('ciudad') }}"*/ required autoComplete="ciudad"/>
                                                <label htmlFor="ciudad">Ciudad</label>
                                            </div>

                                            <div className="input-field col s12 input-50-re">
                                                <input  id="colonia" type="text" className="validate" name="colonia" /*value="{{ old('colonia') }}"*/ required autoComplete="colonia"/>
                                                <label htmlFor="colonia">Colonia</label>
                                            </div>

                                            <div className="input-field col s12 input-50-re">
                                                <input  id="calle" type="text" className="validate" name="calle" /*value="{{ old('calle') }}"*/ required autoComplete="calle"/>
                                                <label htmlFor="calle">Calle</label>
                                            </div>

                                            <div className="input-field col s6 input-50-re">
                                                <input  id="codigo_postal" min="0" step="1" type="number" className="validate" name="codigo_postal" /*value="{{ old('codigo_postal') }}"*/ required autoComplete="codigo_postal"/>
                                                <label htmlFor="codigo_postal">Código Postal</label>
                                            </div>

                                            <div className="input-field col s6 input-50-re">
                                                <input  id="numero" min="0" step="1" type="number" className="validate" name="numero" /*value="{{ old('numero') }}"*/ required autoComplete="numero"/>
                                                <label htmlFor="numero">No. Exterior</label>
                                            </div>
                                            <div className="input-field col s6 input-50-re">
                                                <input  id="numero_interior" min="0" step="1" type="number" className="validate" name="numero_interior" /*value="{{ old('numero_interior') }}"*/  autoComplete="numero_interior"/>
                                                <label htmlFor="numero_interior">No. Interior</label>
                                            </div>

                                            <p className="titles-sub" style={{"marginLeft":"3%"}}>CUENTA</p>

                                            <div className="input-field col s12">
                                                <input id="email" type="email" className="validate form-control" /*@error('email') is-invalid @enderror*/ name="email" /*value="{{ old('email') }}"*/ required autoComplete="email"/>
                                                <label htmlFor="email">Correo electrónico</label>

                                                {/* @error('email')
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror */}
                                            </div>

                                            <div className="input-field col s12 input-50-re">
                                                <input  id="fecha_registro" type="text" className="validate" name="fecha_registro" /*value="{{ old('ciudad') }}"*/ required autoComplete="fecha_registro"/>
                                                <label htmlFor="fecha_registro">Fecha de Registro</label>
                                            </div>

                                            <div className="row">
                                                <button type="button" className="col s3 m2 center-align offset-s6 offset-m8" style={{"border":"none","backgroundColor":"transparent","color":"#515B60"}}><i className="material-icons">edit</i></button>
                                                <button type="button" className="col s3 m2 center-align" style={{"border":"none","backgroundColor":"transparent","color":"#515B60"}}><i className="material-icons">delete</i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">person</i>Second</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}