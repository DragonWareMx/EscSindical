import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/modulos.css'


function transformaFechaModulo(fecha) {
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
  return `${day} ${monthNames[monthIndex]} ${year} a las ${hour}:${minutes}`;
}

const Informacion = ({curso , modulo, avisos, entradas, actividades}) => {
  return (
    <>
      <div className="row default-text">
        {/* seccion 1 */}
        <div className="col s12" style={{"borderBottom":"1px solid #DDDDDD"}}>
          <div className="col s11 titulo-modulo">
            Modulo: {modulo.nombre}
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
              {modulo.duracion} semanas
            </div>
            
          </div>
          {/* contenedor 1 */}
          <div className="col s12 l10 pull-l2">
            {/* objetivo */}
            <div className="col s12">
              <div className="subtitulo-modulo">OBJETIVO</div>
                {modulo.objetivo}
            </div>
            {/* criterios de evaluacion */}
            <div className="col s12">
              <div className="subtitulo-modulo">CRITERIOS DE EVALUACION</div>
                {modulo.criterios}
            </div>
            {/* temario del modulo */}
            <div className="col s12">
              <div className="subtitulo-modulo">TEMARIO DEL MÓDULO</div>
                <div dangerouslySetInnerHTML={{__html: modulo.temario}}>{/*Aquí va el temario pero se pone el dangerous*/}</div>
            </div>
          </div>
        </div>
        {/* seccion 2 - RECURSOS */}
        <div className="col s12" style={{"borderBottom":"1px solid #DDDDDD","paddingBottom":"10px"}}>
          <div className="titulo-modulo">
            RECURSOS
          </div>
          <div>
            {/* avisos */}
            {avisos && avisos.length>0 && 
               avisos.map( (aviso , index) => (
                <div key={index} className="col s12" style={{"margin":"5px"}}>
                  {/* icono */}
                  <div className="col s2 l1 center-align">
                    <i className="material-icons" style={{"color":"#D14747"}}>announcement</i>
                  </div>
                  {/* informacion */}
                  <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                    {/* titulo */}
                    <div className="col s12 advice-text">
                      {aviso.titulo}
                    </div>
                    {/* fecha de publicacion */}
                    <div className="col s12 posted-date">
                      Publicado el {transformaFechaModulo(aviso.created_at)} 
                    </div>
                  </div>
                </div>  
                ))
               }

            {/* Recursos */}

            {entradas && entradas.length > 0 &&
              entradas.map((entrada, index) =>(
                <div key={index} className="col s12" style={{"margin":"5px"}}>
                  {entrada.tipo == 'Archivo' &&
                    <div>
                      {/* icono */}
                      <div className="col s2 l1 center-align">
                        <i className="material-icons" style={{"color":"#134E39"}}>description</i>
                      </div>
                      {/* informacion */}
                      <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                        {/* titulo */}
                        <div className="col s12">
                          <span className="nombre-subrayado">{entrada.titulo}</span> <span className="size-archivo">soy el peso del archivo</span>
                        </div>
                        {/* fecha de publicacion */}
                        <div className="col s12 posted-date">
                          Publicado el {transformaFechaModulo(entrada.created_at)} 
                        </div>
                      </div>
                    </div>
                  }
                </div>
              ))
            }
            {/* ejemplo de enlace */}
            <div className="col s12" style={{"margin":"5px"}}>
              {/* icono */}
              <div className="col s2 l1 center-align">
              <i className="material-icons" style={{"color":"#134E39"}}>link</i>
              </div>
              {/* informacion */}
              <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                {/* titulo */}
                <div className="col s12 advice-text nombre-subrayado">
                  Soy un enlace a otra pagina web
                </div>
                {/* fecha de publicacion */}
                <div className="col s12 posted-date">
                  Publicado el "fecha"
                </div>
              </div>
            </div>

            {/* ejemplo de publicacion */}
            <div className="col s12" style={{"margin":"5px"}}>
              {/* icono */}
              <div className="col s2 l1 center-align">
                <i className="material-icons" style={{"color":"#134E39"}}>assignment</i>
              </div>
              {/* informacion */}
              <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                {/* titulo */}
                <div className="col s12 publicacion">
                  Soy el nobre de la publicacion
                </div>
                {/* fecha de publicacion */}
                <div className="col s12 posted-date">
                  Publicado el "fecha"
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* seccion 3 - ACTIVIDADES A DESARROLLAR */}
        <div className="col s12" style={{"marginTop":"5px"}}>
          <div className="titulo-modulo">
            ACTIVIDADES A DESARROLLAR
          </div>
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

      </div>
    </>
  )
}

Informacion.layout = page => (
  <Layout title="Escuela sindical - Modulo" pageTitle="Modulo">
    <LayoutCursos children={page} />
  </Layout>
)

export default Informacion