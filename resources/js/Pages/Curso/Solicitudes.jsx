import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink } from '@inertiajs/inertia-react';

import '/css/participantes.css'
import '/css/modulos.css'

const Solicitudes = ({curso}) => {
  return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{marginTop:"15px"}}>SOLICITUDES</div>
            {/* <div className="col s12 m3 l2 xl2 right" style={{"textAlign":"right"}}><InertiaLink  className="link-solicitudes">Solicitudes<i class="material-icons tiny" style={{"marginLeft":"10px","marginRight":"5px"}}>mail</i>3</InertiaLink></div> */}
            <a className="col s12 a-select-all" href="#!">Seleccionar todos</a>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            {/* Row de estudiante item*/}
            <div className="col s12 div-collection-item div-item-solicitudes">
                <label className="pink">
                    <input type="checkbox" />
                    <span className="P_collection_item col s12" style={{"display":"flex"}}>
                        <InertiaLink  href="#!"><img className="P_collection_image" width="50" height="50" src="https://video.cults3d.com/NTOOSWjt0RP8ONd9xBbt1cN_rFk=/https://files.cults3d.com/uploaders/13521183/illustration-file/e8e4f30f-68b7-4cbf-a8b1-af89deb868a6/GIF.gif"></img></InertiaLink>
                        <div style={{"width":"max-content","paddingBottom":"0px"}}>
                            <InertiaLink  href="#!" className="P_collection_title">José Agustín Aguilar Solórzano</InertiaLink>
                            <div className="P_collection_subtitle">26/05/2021</div>
                        </div>
                    </span>
                </label>
            </div>

            <div className="col s12  right">
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Aprobar
                    <i className="material-icons right">task_alt</i>
                </button>
                
                <button type="submit" className="btn-rejacted-soli btn-primary btn waves-effect waves-teal btn-login right  no-uppercase" style={{"height": "40px","backgroundColor":"#D3766A","marginRight":"30px"}}>
                    Rechazar
                    <i className="material-icons right">highlight_off</i>
                </button>
            </div>

        </div>
    </>
  )
}

Solicitudes.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="SOLICITUDES">
    <LayoutCursos children={page} />
  </Layout>
)

export default Solicitudes