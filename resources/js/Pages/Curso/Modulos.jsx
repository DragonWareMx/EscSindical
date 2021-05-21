import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/modulos.css'

const Informacion = ({curso}) => {
  return (
    <>
      <div className="row default-text">
        {/* seccion 1 */}
        <div className="col s12" style={{"borderBottom":"1px solid #DDDDDD"}}>
          <div className="col s11 titulo-modulo">
            MÓDULO 1. Nombre completo del modulo.
          </div>
          <div className="col s1 center-align">
            <i className="material-icons tiny">navigate_next</i>
          </div>
          {/* contenedor 2 */}
          <div className="col s12 l2 push-l10">
            {/* calificacion */}
            <div className="col s6 l12  push-s6">
              <div className="subtitulo-modulo">CALIFICACIÓN</div>
              Sin evaluar
            </div>
            {/* duracion */}
            <div className="col s6 l12 pull-s6">
              <div className="subtitulo-modulo">DURACIÓN</div>
              3 semanas
            </div>
            
          </div>
          {/* contenedor 1 */}
          <div className="col s12 l10 pull-l2">
            {/* objetivo */}
            <div className="col s12">
              <div className="subtitulo-modulo">OBJETIVO</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non eligendi vitae nemo, incidunt repellendus consequatur doloribus quae. Nobis rem enim culpa, porro, magni doloremque nihil ab quos facere aliquid modi!
            </div>
            {/* criterios de evaluacion */}
            <div className="col s12">
              <div className="subtitulo-modulo">CRITERIOS DE EVALUACION</div>
                Asistencia, tareas, examne y proyecto final.
            </div>
            {/* temario del modulo */}
            <div className="col s12">
              <div className="subtitulo-modulo">TEMARIO DEL MÓDULO</div>
                <ol className="">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis fugit tempora sapiente
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis fugit tempora sapiente
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis fugit tempora sapiente
                  </li>
                </ol>
            </div>
          </div>
        </div>
        {/* seccion 2 - RECURSOS */}
        <div className="col s12" style={{"borderBottom":"1px solid #DDDDDD"}}>
          <div className="titulo-modulo">
            RECURSOS
          </div>
          <div>
            Aqui van a ir todos los recursos del modulo
          </div>
        </div>
        {/* seccion 3 - ACTIVIDADES A DESARROLLAR */}
        <div className="col s12">
          <div className="titulo-modulo">
            ACTIVIDADES A DESARROLLAR
          </div>
          <div>
            Aqui van a ir las actividades a desarrollar para este modulo
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