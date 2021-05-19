import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import Paginacion from '../../components/common/Paginacion';
import FlotanteAyuda from '../../components/common/FlotanteAyuda';

import '../../styles/profileStyle.css'
import UserForm from '../../components/Usuarios/UserForm';

function initializeMat() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
}

const Perfil = ({ user }) => {
    const [edit, setEdit] = useState(false)

    function handleEditChange(newValue) {
        setEdit(newValue)
    }

    useEffect(() => {
        initializeMat();
    }, [])

    return (
        <>
            <div className="row">
                <div className="col s12 m4">
                    <div className="row">
                        <div className="col s12" style={{ "marginTop": "30px" }}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s12 center-align">
                                            <div className="center-align">
                                                <img src={"/storage/fotos_perfil/" + user.foto} alt="foto de perfil" className="img-profile red" />
                                            </div>
                                        </div>
                                        <div className="col s12 center-align">
                                            <div className="profile-txt-category">
                                                Categoría
                                            </div>
                                            <div className="profile-txt-name">
                                                {user.nombre} {user.apellido_p} {user.apellido_m}
                                            </div>
                                            <div className="profile-txt-active-since">
                                                Activo desde {user.created_at}
                                            </div>
                                            <div className="profile-txt-email valign-wrapper truncate"><i class="material-icons profile-icon-email">mail_outline</i>{user.email}</div>
                                        </div>
                                        {/* Boton de enviar mensaje */}
                                        <div className="col s12 center-align" style={{ "padding": "0%" }}>
                                            <a class="waves-effect waves-light btn boton-verde"><i class="material-icons right" style={{ "font-size": "18px" }}>send</i>Mensaje</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12 m8">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="title-section">
                                        INFORMACIÓN PERSONAL
                                    </div>
                                    <div className="info-section">
                                        Tu información personal no será visible para el público.
                                    </div>
                                    <div className="row">
                                        <div className="col s12 m6" style={{ "marginTop": "15px" }}>
                                            <div className="titles-sub">
                                                INFORMACIÓN PERSONAL
                                            </div>

                                            {/* <div style={{"marginTop":"20px"}}>
                                                <br/>
                                            </div> */}
                                            <div className="info-txt-format">
                                                Fecha de Nacimiento: {user.fecha_nac}
                                            </div>
                                            <div className="info-txt-format">
                                                Sexo: {user.sexo}
                                            </div>
                                        </div>
                                        <div className="col s12 m6" style={{ "marginTop": "15px" }}>
                                            <div className="titles-sub">
                                                INFORMACIÓN INSTITUCIONAL
                                            </div>
                                            <div className="info-txt-format">
                                                Matrícula: {user.matricula}
                                            </div>
                                            <div className="info-txt-format">
                                                Regimen:
                                            </div>
                                            <div className="info-txt-format">
                                                Unidad:
                                            </div>
                                            <div className="info-txt-format">
                                                Categoría: {user.categorie.nombre}
                                            </div>
                                        </div>
                                        <div className="col s12 m6" style={{ "marginTop": "15px" }}>
                                            <div className="titles-sub">
                                                DIRECCIÓN
                                            </div>
                                            <div className="info-txt-format">
                                                Estado: {user.estado}
                                            </div>
                                            <div className="info-txt-format">
                                                Ciudad: {user.ciudad}
                                            </div>
                                            <div className="info-txt-format">
                                                Colonia: {user.colonia}
                                            </div>
                                            <div className="info-txt-format">
                                                Calle: {user.calle}
                                            </div>
                                            <div className="info-txt-format">
                                                No. Exterior: {user.num_ext}
                                            </div>
                                            <div className="info-txt-format">
                                                Código Postal: {user.cp}
                                            </div>
                                        </div>
                                        {/* Boton de editar */}
                                        <div className="col s12 m12 right-align" style={{ "marginTop": "25px" }}>
                                            <a href="#modal-editar" class="waves-effect waves-light btn boton-verde modal-trigger"><i class="material-icons right" style={{ "font-size": "18px" }}>settings</i>Configuración</a>
                                        </div>
                                        {/* Modal */}
                                        <div id="modal-editar" className="modal">
                                            <div className="modal-content">
                                                <div className="row">
                                                    <div className="col s11">
                                                        <div className="title-configuracion valign-wrapper"><i className="material-icons" style={{ "marginRight": "10px" }}>settings</i>CONFIGURACIÓN</div>
                                                    </div>
                                                    <div className="col s1 modal-close">
                                                        <i className="material-icons">close</i>
                                                    </div>
                                                    <div className="col s12">
                                                        {/* {!state.newUser && <InfoAlumno user={user}/>} */}
                                                        {/* <UserForm /> */}
                                                        <UserForm user={user} bEdit={edit} onEditChange={handleEditChange} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FlotanteAyuda />
        </>
    )
}

Perfil.layout = page => <Layout children={page} title="Escuela Sindical - Perfil" pageTitle="PERFIL" />

export default Perfil