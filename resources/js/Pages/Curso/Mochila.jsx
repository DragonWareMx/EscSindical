import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/modulos.css'

const Informacion = ({curso}) => {
  return (
    <>
      <div className="row default-text">
        {/* titulo */}
        <div className="col s12 titulo-modulo">
            MOCHILA
        </div>

        {/* seccion 1 - asignado */}
        <div className="col s12">
            asignado
        </div>

        {/* seccion 2 -completado */}
        <div className="col s12" style={{"marginTop":"5px"}}>
            completado
          <div>
            {/* ejemplo de asignacion */}
            <div className="card">
              <div className="card-content" style={{"paddingBottom":"5px"}}>
                <div className="row valign-wrapper">
                  {/* icono */}
                  <div className="col s2 l1 center-align">
                    <i className="material-icons" style={{"color":"#134E39"}}>edit_note</i>
                  </div>
                  {/* informacion */}
                  <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                    {/* titulo de la asignacion y calificacion */}
                    <div className="col s12 publicacion">
                      <span className="publicacion">Nombre completo de la asignacion</span> 
                      <span className="calificacion">0/100</span>
                    </div>
                    {/* nombre del modulo y fecha de vencimiento*/}
                    <div className="col s12 posted-date">
                      <span className="col m12 l6 posted-date">Módulo N "Nombre completo del modulo"</span>
                      <span className="col m12 l6 expiration-date ">Vence el "fecha" a las "hora"</span>
                    </div>
                  </div>
                  {/* estatus */}
                  <div className="col s2 l1 center-align">
                    <span className="texto-enviado">ENVIADO</span>
                  </div>
                </div>
              </div>
            </div>
            {/* ejemplo de examen */}
            <div className="card">
              <div className="card-content" style={{"paddingBottom":"5px"}}>
                <div className="row valign-wrapper">
                  {/* icono */}
                  <div className="col s2 l1 center-align">
                    <i className="material-icons" style={{"color":"#134E39"}}>quiz</i>
                  </div>
                  {/* informacion */}
                  <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                    {/* titulo de la asignacion y calificacion */}
                    <div className="col s12 publicacion">
                      <span className="publicacion">Exámen final del modulo ("soy el nombre del examen")</span> 
                      <span className="calificacion">Sin calificar</span>
                    </div>
                    {/* nombre del modulo y fecha de vencimiento*/}
                    <div className="col s12 posted-date">
                      <span className="col m12 l6 posted-date">Módulo N "Nombre completo del modulo"</span>
                      <span className="col m12 l6 expiration-date ">Vence el "fecha" a las "hora"</span>
                    </div>
                  </div>
                  {/* estatus */}
                  <div className="col s2 l1 center-align">
                    <span className="texto-cerrado">CERRADO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

Informacion.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Curso">
    <LayoutCursos children={page} />
  </Layout>
)

export default Informacion