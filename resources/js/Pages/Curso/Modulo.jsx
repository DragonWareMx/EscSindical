import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
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

function getFileSize(archivo){
  alert(archivo.size)
  return 0
}

const Informacion = ({curso , modulo, avisos, entradas, actividades}) => {
  return (
    <>
      <div className="row default-text">
        {/* seccion 1 */}
        <div className="col s12" style={{"borderBottom":"1px solid #DDDDDD"}}>
          <div className="col s11 titulo-modulo">
            Modulo {modulo.numero}: {modulo.nombre}
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
                  <div className="col s2 l1 center-align">
                    <i className="material-icons" style={{"color":"#D14747"}}>announcement</i>
                  </div>
                  <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                    <InertiaLink href={route('cursos.publicacion',[curso.id,modulo.id,aviso.id])} className="col s12 advice-text">
                      {aviso.titulo}
                    </InertiaLink>
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
                      <div className="col s2 l1 center-align">
                        <i className="material-icons" style={{"color":"#134E39"}}>description</i>
                      </div>
                      <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                        <div className="col s12">
                          <a href={entrada.files && entrada.files.length > 0 && "/storage/archivos_cursos/"+entrada.files[0].archivo} target="_blank" className="nombre-subrayado">{entrada.titulo}</a>
                        </div>
                        <div className="col s12 posted-date">
                          Publicado el {transformaFechaModulo(entrada.created_at)} 
                        </div>
                      </div>
                    </div>
                  }
                  {entrada.tipo == 'Enlace' &&
                    <div>
                      <div className="col s2 l1 center-align">
                        <i className="material-icons" style={{"color":"#134E39"}}>link</i>
                      </div>
                      <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                        <a href={entrada.link} target="_blank" className="col s12 advice-text nombre-subrayado">
                          {entrada.titulo}
                        </a>
                        <div className="col s12 posted-date">
                          Publicado el {transformaFechaModulo(entrada.created_at)} 
                        </div>
                      </div>
                    </div>
                  }
                  {entrada.tipo == 'Informacion' && 
                    <div>
                      <div className="col s2 l1 center-align">
                        <i className="material-icons" style={{"color":"#134E39"}}>assignment</i>
                      </div>
                      <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                        <InertiaLink href={route('cursos.publicacion',[curso.id,modulo.id,entrada.id])} className="col s12 publicacion">
                          {entrada.titulo}
                        </InertiaLink>
                        <div className="col s12 posted-date">
                          Publicado el {transformaFechaModulo(entrada.created_at)} 
                        </div>
                      </div>
                    </div>
                  }
                </div>
              ))
            }
          </div>
        </div>


        <div className="col s12" style={{"marginTop":"5px"}}>
          <div className="titulo-modulo">
            ACTIVIDADES A DESARROLLAR
          </div>
          <div>

            {/* asignacion */}
            {actividades && actividades.length >0 &&
              actividades.map((actividad, index) => (
                <div key={index} className="card">
                  {actividad.tipo == 'Asignacion' &&
                    <div className="card-content" style={{"paddingBottom":"5px"}}>
                      <div className="row valign-wrapper">
                        <div className="col s2 l1 center-align">
                          <i className="material-icons" style={{"color":"#134E39"}}>edit_note</i>
                        </div>
                        <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                          <div className="col s12 publicacion">
                            <span className="publicacion">{actividad.titulo}</span> 
                            <span className="calificacion">0/100</span>
                          </div>
                          <div className="col s12 posted-date">
                            <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo {modulo.numero} "{modulo.nombre}"</span>
                            <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el {transformaFechaModulo(actividad.fecha_de_entrega)}</span>
                          </div>
                        </div>
                        <div className="col s2 l1 center-align">
                          <span className="texto-enviado">ENVIADO</span>
                        </div>
                      </div>
                    </div>
                  }
                  {actividad.tipo == 'Examen' &&
                    <div className="card-content" style={{"paddingBottom":"5px"}}>
                      <div className="row valign-wrapper">
                        <div className="col s2 l1 center-align">
                          <i className="material-icons" style={{"color":"#134E39"}}>quiz</i>
                        </div>
                        <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                          <div className="col s12 publicacion">
                            <span className="publicacion">{actividad.titulo}</span> 
                            <span className="calificacion">Sin calificar</span>
                          </div>
                          <div className="col s12 posted-date">
                            <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo {modulo.numero} {modulo.nombre}</span>
                            <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el {transformaFechaModulo(actividad.fecha_de_entrega)}</span>
                          </div>
                        </div>
                        <div className="col s2 l1 center-align">
                          <span className="texto-cerrado">CERRADO</span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              ))
            }
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