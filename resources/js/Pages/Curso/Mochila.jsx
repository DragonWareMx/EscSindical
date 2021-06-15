import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/modulos.css'

const Informacion = ({curso, realizadas, pendientes}) => {

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

  // Función para calcular la fecha
  function transformaFechaMochila(fecha) {
    const dob = new Date(fecha);
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const day = dob.getDate();
    const monthIndex = dob.getMonth();
    const year = dob.getFullYear();
    const hour = ("0" + dob.getHours()).slice(-2);
    const minutes = ("0" + dob.getMinutes()).slice(-2);
    return `${day} de ${monthNames[monthIndex]} de ${year} a las ${hour}:${minutes}`;
  }

  // / funcion para calcular el estatus de la entrega o algo así
  function pendienteEstatus(entrega, permitir){
    const hoy = new Date();
    const fecha_entrega=new Date(entrega);
    if(hoy <= fecha_entrega){
      return 'Pendiente'
    }
    else if(hoy > fecha_entrega && permitir){
      return 'Retrasada'
    }
    else{
      return 'Cerrado'
    }
  }


  // / funcion para calcular el estatus de la entrega realizada o algo así
  function realizadaEstatus(fecha_entrega,entregado){
    const entrega=new Date(fecha_entrega);
    const fecha = new Date(entregado);

    if(fecha <= entrega){
      return 'Enviado'
    }
    else{
      return 'Retrasada'
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
          {pendientes && pendientes.length > 0 && pendientes.map((pendiente, index)=>
            <InertiaLink href={route('cursos.asignacion',[curso.id, pendiente.module_id, pendiente.id])} key={index}>
            <div className="card">
              <div className="card-content" style={{"paddingBottom":"5px"}}>
                <div className="row valign-wrapper">
                  {/* icono */}
                  <div className="col s2 l1 center-align">
                    <i className="material-icons" style={{"color":"#134E39"}}>{pendiente.tipo == 'Examen' ? 'quiz' : 'edit_note'}</i>
                  </div>
                  {/* informacion */}
                  <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                    {/* titulo de la asignacion y calificacion */}
                    <div className="col s12 publicacion">
                      <span className="publicacion">{pendiente.titulo}</span> 
                      <span className="calificacion">0/{pendiente.max_calif}</span>
                    </div>
                    {/* nombre del modulo y fecha de vencimiento*/}
                    <div className="col s12 posted-date">
                      <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo. {pendiente.numero} "{pendiente.modulo}"</span>
                      <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el {transformaFechaMochila(pendiente.fecha_de_entrega)}</span>
                    </div>
                  </div>
                  {/* estatus */}
                  <div className="col s2 l1 center-align">
                    <span className={'texto-estatus '+pendienteEstatus(pendiente.fecha_de_entrega, pendiente.permitir_envios_retrasados)}>{pendienteEstatus(pendiente.fecha_de_entrega, pendiente.permitir_envios_retrasados)}</span>
                  </div>
                </div>
              </div>
            </div>
            </InertiaLink>
          )}
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
          {realizadas && realizadas.length > 0 && realizadas.map((realizada, index)=>
          <InertiaLink href={route('cursos.asignacion',[curso.id, realizada.module_id, realizada.id])} key={index}>
            <div className="card" key={index}>
              <div className="card-content" style={{"paddingBottom":"5px"}}>
                <div className="row valign-wrapper">
                  {/* icono */}
                  <div className="col s2 l1 center-align">
                    <i className="material-icons" style={{"color":"#134E39"}}>{realizada.tipo == 'Examen' ? 'quiz' : 'edit_note'}</i>
                  </div>
                  {/* informacion */}
                  <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                    {/* titulo de la asignacion y calificacion */}
                    <div className="col s12 publicacion">
                      <span className="publicacion">{realizada.titulo}</span> 
                      <span className="calificacion">{realizada.calificacion ? realizada.calificacion : 'Sin calificar'}/{realizada.max_calif}</span>
                    </div>
                    {/* nombre del modulo y fecha de vencimiento*/}
                    <div className="col s12 posted-date">
                      <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo. {realizada.numero} "{realizada.modulo}"</span>
                      <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Entregada el {transformaFechaMochila(realizada.fecha)}</span>
                    </div>
                  </div>
                  {/* estatus */}
                  <div className="col s2 l1 center-align">
                    <span className={'texto-estatus '+realizadaEstatus(realizada.fecha_de_entrega, realizada.fecha)}>{realizadaEstatus(realizada.fecha_de_entrega, realizada.fecha)}</span>
                  </div>
                </div>
              </div>
            </div>
            </InertiaLink>
          )}
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