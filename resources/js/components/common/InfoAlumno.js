import React, { useEffect } from 'react'
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
}

export default function InfoAlumno() {
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
                                    <div className="col s12 div-form-register">
                                        <div className="col s6 div-division">
                                            <p className="titles-sub" style={{"marginLeft":"3%"}}>INFORMACIÓN PERSONAL</p>
                                            <div className="col s12" style={{"display": "flex","justifyContent":"center", "flexDirection":"column"}}>
                                                <img id="profileImage" src="/storage/fotos_perfil/avatar1.png" ></img>
                                                <p id="txt-profile">Foto de perfil</p>
                                            </div>
                                        </div>
                                        <input id="imageUpload" type="file" className="form-control " /*@error('foto_perfil') is-invalid @enderror*/
                                            name="foto_perfil" placeholder="Photo"   /*value="{{ old('foto_perfil') }}"*/ accept="image/png, image/jpeg, image/jpg, image/gif"></input>
                                        {/* @error('foto_perfil')
                                        <span class="invalid-feedback col s12" role="alert" style="margin-bottom:12px; text-align:center">
                                            <strong>{{ $message }}</strong>
                                        </span> 
                                         @enderror */}

                                        <div className="input-field col s12">
                                            <input  id="nombre" type="text" className="validate form-control" /*@error('nombre') is-invalid @enderror*/ name="nombre" /*value="{{ old('nombre') }}"*/ required autoComplete="nombre" autoFocus/>
                                            <label htmlFor="nombre">Nombre</label>
                                            {/* @error('nombre')
                                                <span class="invalid-feedback" role="alert" style="margin-bottom:12px;">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                        <div className="input-field col s6 input-50-re">
                                            <input  id="apellido_paterno" type="text" className="validate form-control" /*@error('apellido_paterno') is-invalid @enderror*/ name="apellido_paterno" /*value="{{ old('apellido_paterno') }}"*/ required autoComplete="apellido_paterno"/>
                                            <label htmlFor="apellido_paterno">Apellido Paterno</label>
                                            {/* @error('apellido_paterno')
                                                <span class="invalid-feedback" role="alert" style="margin-bottom:12px;">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                        <div className="input-field col s6 input-50-re">
                                            <input  id="apellido_materno" type="text" className="validate form-control" /*@error('apellido_materno') is-invalid @enderror*/ name="apellido_materno" /*value="{{ old('apellido_materno') }}" */ autoComplete="apellido_materno"/>
                                            <label htmlFor="apellido_materno">Apellido Materno</label>
                                            {/* @error('apellido_materno')
                                                <span class="invalid-feedback" role="alert" style="margin-bottom:12px;">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                        <div className="input-field col s6 input-50-re">
                                            <input id="fecha_nacimiento" max="2004-01-01" type="date" name="fecha_nacimiento" /*value="{{ old('fecha_nacimiento') }}"*/ required autoComplete="fecha_nacimiento"/>
                                            <label htmlFor="fecha_nacimiento">Fec. Nacimiento</label>
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