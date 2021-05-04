import React, { useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import Paginacion from '../../components/common/Paginacion';
import FlotanteAyuda from '../../components/common/FlotanteAyuda';

import '../../styles/profileStyle.css'

const Perfil = ({ }) => {


    return (
        <>
            <div className="row orange">
                <div className="col s3">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    Aqui va el nombre
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s9 purple">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <div>
                                        INFORMACIÓN PERSONAL
                                    </div>
                                    <div>
                                        Tu información personal no será visible para el público.
                                    </div>
                                    <div className="row">
                                        <div className="col s6 red">
                                            INFORMACIÓN PERSONAL
                                        </div>
                                        <div className="col s6 blue">
                                            INFORMACIÓN INSTITUCIONAL
                                        </div>
                                        <div className="col s6 teal">
                                            DIRECCIÓN
                                        </div>
                                        <div className="col s6 pink">
                                            Aquí va el botón
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