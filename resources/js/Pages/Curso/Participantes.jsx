import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/participantes.css'
import '/css/modulos.css'

const Participantes = ({curso}) => {
  return (
    <>
        <div className="row">
            <div className="col s12 titulo-modulo" style={{marginTop:"15px"}}>PARTICIPANTES</div>
            <div className="col s12 P_sub" style={{marginTop:"15px"}}>Ponente</div>
            <div className="col s12">
                <div className=" P_collection_item">
                    <img className="P_collection_image" width="50" height="50" src="https://pbs.twimg.com/media/EeQNlGqX0AUgHYD?format=jpg&name=900x900"></img>
                    <div>
                        <span className="P_collection_title">José Agustín Aguilar Solórzano</span>
                        <div className="P_collection_subtitle">Doctor en ciencias de la computación</div>
                    </div>
                </div>
            </div>
            <div className="col s12 P_sub" style={{marginTop:"15px"}}>Compañeros de clase</div>
            <div className="col s12">
                <div className=" P_collection_item">
                    <img className="P_collection_image" width="50" height="50" src="https://pm1.narvii.com/6417/9b21a494d74d84ff21064f2fa0b72d294bd7a96f_hq.jpg"></img>
                    <div>
                        <span className="P_collection_title">Óscar André Huerta García</span>
                        <div className="P_collection_subtitle">Estudiante</div>
                    </div>
                </div>
            </div>
            <div className="col s12">
                <div className=" P_collection_item">
                    <img className="P_collection_image" width="50" height="50" src="https://images5.fanpop.com/image/photos/30800000/The-Rev-the-rev-30875864-335-440.jpg"></img>
                    <div>
                        <span className="P_collection_title">Fernando Adrián García Sánchez</span>
                        <div className="P_collection_subtitle">Estudiante</div>
                    </div>
                </div>
            </div>
            <div className="col s12">
                <div className=" P_collection_item">
                    <img className="P_collection_image" width="50" height="50" src="https://rocknvivo.com/wp-content/uploads/2011/03/a7x.jpg"></img>
                    <div>
                        <span className="P_collection_title">Leonardo Daniel López López</span>
                        <div className="P_collection_subtitle">Estudiante</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

Participantes.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Curso Nombre del curso">
    <LayoutCursos children={page} />
  </Layout>
)

export default Participantes