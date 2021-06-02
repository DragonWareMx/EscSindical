import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/modulos.css'

const Informacion = ({curso}) => {

  //  funcion para ocultar y mostrar las TAREAS ASIGNADAS
  function showHideAsignadas() {
    var asignadas = document.getElementById('asignado');
    var mas = document.getElementById('masAsignadas');
    var menos = document.getElementById('menosAsignadas');

    if(asignadas.className == 'col s12 hide'){
      asignadas.classList.remove('hide');
      mas.classList.remove('hide');
      menos.classList.add('hide');
    }
    else{
      asignadas.classList.add('hide');
      mas.classList.add('hide');
      menos.classList.remove('hide');
    }
  }

  //  funcion para ocultar y mostrar las TAREAS COMPLETADAS
  function showHideCompletadas() {
    var completadas = document.getElementById('completado');
    var mas = document.getElementById('masCompletadas');
    var menos = document.getElementById('menosCompletadas');

    if(completadas.className == 'col s12 hide'){
      completadas.classList.remove('hide');
      mas.classList.remove('hide');
      menos.classList.add('hide');
    }
    else{
      completadas.classList.add('hide');
      mas.classList.add('hide');
      menos.classList.remove('hide');
    }
  }

  return (
    <>
      <div className="row default-text">
        {/* titulo */}
        <div className="col s12 titulo-modulo">
            MOCHILA
        </div>

        {/* seccion 1 - asignado */}
        <div className="col s12 valign-wrapper" onClick={showHideAsignadas} style={{"cursor":"pointer"}}>
          <div className="formato-iconos">
            <i id="masAsignadas" className="material-icons">expand_more</i>
            <i id="menosAsignadas" className="material-icons hide">navigate_next</i>
          </div>
          <span className="default-text-2">Asignado</span>
        </div>
        {/* contenedor que se muestra y oculta */}
        <div id="asignado" className="col s12">
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
                    <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo N "Nombre completo del modulo"</span>
                    <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el "fecha" a las "hora"</span>
                  </div>
                </div>
                {/* estatus */}
                <div className="col s2 l1 center-align">
                  <span className="texto-enviado">ENVIADO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* seccion 2 -completado */}
        <div className="col s12 valign-wrapper" onClick={showHideCompletadas} style={{"cursor":"pointer"}}>
          <div className="formato-iconos">

          </div>
          <i id="masCompletadas" className="material-icons hide">expand_more</i>
          <i id="menosCompletadas" className="material-icons">navigate_next</i>
          <span className="default-text-2">Completado</span>
        </div>
        {/* contenedor que se muestra y oculta */}
        <div id="completado" className="col s12 hide" style={{"marginTop":"5px"}}>
          
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
                    <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo N "Nombre completo del modulo"</span>
                    <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el "fecha" a las "hora"</span>
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
                    <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo N "Nombre completo del modulo"</span>
                    <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el "fecha" a las "hora"</span>
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
    </>
  )
}

Informacion.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Curso">
    <LayoutCursos children={page} />
  </Layout>
)

export default Informacion