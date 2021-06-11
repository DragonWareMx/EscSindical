import { Inertia } from '@inertiajs/inertia';
import { InertiaLink , usePage   } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react'
import route from 'ziggy-js';
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



const Informacion = ({curso , modulo, avisos, entradas, actividades, calificacion}) => {
  const { auth } = usePage().props;


  // / funcion para calcular el estatus de la entrega o algo así
  function pendienteEstatus(entrega, permitir){
    const hoy = new Date();
    const fecha_entrega=new Date(entrega);
    if(hoy < fecha_entrega){
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

    if(fecha < entrega){
      return 'Enviado'
    }
    else{
      return 'Retrasada'
    }
  }

  function initializeMaterialize(){
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  }
  
  useEffect(() => {
    initializeMaterialize();
  }, [])

  return (
    <>
      <div className="row default-text">
        {/* seccion 1 */}
        <div className="col s12" style={{"borderBottom":"1px solid #DDDDDD"}}>
          <div className="col s11 titulo-modulo">
            Modulo {modulo.numero}. {modulo.nombre}
          </div>
          <div className="col s1 center-align">
            <i className="material-icons tiny">navigate_next</i>
          </div>
          {/* contenedor 2 */}
          <div className="col s12 l2 push-l10">
            {/* calificacion */}
            <div className="col s6 l12  push-s6">
              <div className="subtitulo-modulo">{auth.roles[0].name == 'Ponente' ? 'CALIFICACIÓN GRUPAL' : auth.roles[0].name == 'Alumno' && 'CALIFICACIÓN'}</div>
              {calificacion && calificacion.calificacion ? calificacion.calificacion : 'Sin evaluar'}
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
                    <InertiaLink href={route('cursos.publicacion',[curso.id,modulo.id,aviso.id])}>
                      <i className="material-icons" style={{"color":"#D14747"}}>announcement</i>
                    </InertiaLink>
                  </div>
                  <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                    <div className="col s12 valign-wrapper">
                      <InertiaLink href={route('cursos.publicacion',[curso.id,modulo.id,aviso.id])} className="advice-text">
                        {aviso.titulo}
                      </InertiaLink>
                      {/* dropdown para editar */}
                      { auth.roles[0].name=='Ponente' &&
                        <div>
                          <a href="#" className="dropdown-trigger" data-target={'aviso'+aviso.id}><i className="material-icons" style={{"color":"#7D7D7D","fontSize":"18px"}}>more_vert</i></a>
                          <ul id={'aviso'+aviso.id} className="dropdown-content drop-size2">
                            <li>
                              <InertiaLink href="#" className="dropdown-text">
                                <i className="material-icons">edit</i>Editar
                              </InertiaLink>
                            </li>
                            <li>
                              <InertiaLink href="#" className="dropdown-text">
                                <i className="material-icons">delete</i>Eliminar
                              </InertiaLink>
                            </li>
                          </ul>
                        </div>
                      }
                    </div>
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
                  {/* archivos */}
                  {entrada.tipo == 'Archivo' &&
                    <div>
                      <div className="col s2 l1 center-align">
                        <i className="material-icons" style={{"color":"#134E39"}}>description</i>
                      </div>
                      <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                        <div className="col s12 valign-wrapper">
                          <a href={entrada.files && entrada.files.length > 0 && "/storage/archivos_cursos/"+entrada.files[0].archivo} target="_blank" className="nombre-subrayado">{entrada.titulo}</a>
                          {/* dropdown para editar */}
                          { auth.roles[0].name=='Ponente' &&
                            <div>
                              <a href="#" className="dropdown-trigger" data-target={'archivo'+entrada.id}><i className="material-icons" style={{"color":"#7D7D7D","fontSize":"18px"}}>more_vert</i></a>
                              <ul id={'archivo'+entrada.id} className="dropdown-content drop-size2">
                                <li>
                                  <InertiaLink href="#" className="dropdown-text">
                                    <i className="material-icons">edit</i>Editar
                                  </InertiaLink>
                                </li>
                                <li>
                                  <InertiaLink href="#" className="dropdown-text">
                                    <i className="material-icons">delete</i>Eliminar
                                  </InertiaLink>
                                </li>
                              </ul>
                            </div>
                          }
                        </div>
                        <div className="col s12 posted-date">
                          Publicado el {transformaFechaModulo(entrada.created_at)} 
                        </div>
                      </div>
                    </div>
                  }
                  {/* enlaces */}
                  {entrada.tipo == 'Enlace' &&
                    <div>
                      <div className="col s2 l1 center-align">
                        <i className="material-icons" style={{"color":"#134E39"}}>link</i>
                      </div>
                      <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                        <div className="col s12 valign-wrapper">
                          <a href={entrada.link} target="_blank" className="advice-text nombre-subrayado">
                            {entrada.titulo}
                          </a>
                          {/* dropdown para editar */}
                          { auth.roles[0].name=='Ponente' &&
                            <div>
                              <a href="#" className="dropdown-trigger" data-target={'enlace'+entrada.id}><i className="material-icons" style={{"color":"#7D7D7D","fontSize":"18px"}}>more_vert</i></a>
                              <ul id={'enlace'+entrada.id} className="dropdown-content drop-size2">
                                <li>
                                  <InertiaLink href="#" className="dropdown-text">
                                    <i className="material-icons">edit</i>Editar
                                  </InertiaLink>
                                </li>
                                <li>
                                  <InertiaLink href="#" className="dropdown-text">
                                    <i className="material-icons">delete</i>Eliminar
                                  </InertiaLink>
                                </li>
                              </ul>
                            </div>
                          }
                        </div>
                        
                        <div className="col s12 posted-date">
                          Publicado el {transformaFechaModulo(entrada.created_at)} 
                        </div>
                      </div>
                    </div>
                  }
                  {/* informacion */}
                  {entrada.tipo == 'Informacion' && 
                    <div>
                      <div className="col s2 l1 center-align">
                        <i className="material-icons" style={{"color":"#134E39"}}>assignment</i>
                      </div>
                      <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                        <div className="col s12 valign-wrapper">
                          <InertiaLink href={route('cursos.publicacion',[curso.id,modulo.id,entrada.id])} className="publicacion">
                            {entrada.titulo}
                          </InertiaLink>
                          {/* dropdown para editar */}
                          { auth.roles[0].name == 'Ponente' &&
                            <div>
                              <a href="#" className="dropdown-trigger" data-target={'info'+entrada.id}><i className="material-icons" style={{"color":"#7D7D7D","fontSize":"18px"}}>more_vert</i></a>
                              <ul id={'info'+entrada.id} className="dropdown-content drop-size2">
                                <li>
                                  <InertiaLink href="#" className="dropdown-text">
                                    <i className="material-icons">edit</i>Editar
                                  </InertiaLink>
                                </li>
                                <li>
                                  <InertiaLink href="#" className="dropdown-text">
                                    <i className="material-icons">delete</i>Eliminar
                                  </InertiaLink>
                                </li>
                              </ul>
                            </div>
                          }
                        </div>
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
                <InertiaLink href={route('cursos.asignacion',[curso.id, modulo.id, actividad.id])} key={index}>
                  <div className="card">
                    {/* asignacion */}
                    {actividad.tipo == 'Asignacion' &&
                      <div className="card-content" style={{"paddingBottom":"5px"}}>
                        <div className="row valign-wrapper">
                          <div className="col s2 l1 center-align">
                            <i className="material-icons" style={{"color":"#134E39"}}>edit_note</i>
                          </div>
                          <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                            <div className="col s12 publicacion">
                              <span className="publicacion">{actividad.titulo}</span> 
                              <span className="calificacion">{auth && auth.roles && auth.roles.length > 0 && auth.roles[0].name == "Alumno" &&
                               <>{
                                actividad.calificacion ? actividad.calificacion+'/' : 'Sin calificar/'
                               }
                               </>
                               }{actividad.max_calif}
                               </span>
                            </div>
                            <div className="col s12 posted-date">
                              <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo {modulo.numero}. "{modulo.nombre}"</span>
                              <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el {transformaFechaModulo(actividad.fecha_de_entrega)}</span>
                            </div>
                          </div>
                          <div className="col s2 l1 center-align">
                            {auth.roles[0].name=="Alumno" && actividad.fecha &&
                              <div><span className={'texto-estatus '+realizadaEstatus(actividad.fecha_de_entrega, actividad.fecha)}>{realizadaEstatus(actividad.fecha_de_entrega, actividad.fecha)}</span></div>
                            }
                            {auth.roles[0].name=="Alumno" && !actividad.fecha &&
                              <div><span className={'texto-estatus '+pendienteEstatus(actividad.fecha_de_entrega, actividad.permitir_envios_retrasados)}>{pendienteEstatus(actividad.fecha_de_entrega, actividad.permitir_envios_retrasados)}</span></div>
                            }
                            {/* dropdown para editar */}
                            { auth.roles[0].name=='Ponente' &&
                              <div>
                                <a href="#" className="dropdown-trigger" data-target="dropdown1"><i className="material-icons" style={{"color":"#7D7D7D","fontSize":"18px","marginLeft":"10px"}}>more_vert</i></a>
                                <ul id="dropdown1" className="dropdown-content drop-size2">
                                  <li>
                                    <InertiaLink href="#" className="dropdown-text">
                                      <i className="material-icons">edit</i>Editar
                                    </InertiaLink>
                                  </li>
                                  <li>
                                    <InertiaLink href="#" className="dropdown-text">
                                      <i className="material-icons">delete</i>Eliminar
                                    </InertiaLink>
                                  </li>
                                </ul>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    }
                    {/* examen */}
                    {actividad.tipo == 'Examen' &&
                      <div className="card-content" style={{"paddingBottom":"5px"}}>
                        <div className="row valign-wrapper">
                          <div className="col s2 l1 center-align">
                            <i className="material-icons" style={{"color":"#134E39"}}>quiz</i>
                          </div>
                          <div className="col s8 l10" style={{"paddingLeft":"0px"}}>
                            <div className="col s12 publicacion">
                              <span className="publicacion">{actividad.titulo}</span> 
                              <span className="calificacion">{auth && auth.roles && auth.roles.length > 0 && auth.roles[0].name == "Alumno" &&
                               <>{
                                actividad.calificacion ? actividad.calificacion+'/' : 'Sin calificar/'
                               }
                               </>
                               }{actividad.max_calif}
                               </span>
                            </div>
                            <div className="col s12 posted-date">
                              <span className="col m12 l6 posted-date" style={{"paddingLeft":"0px"}}>Módulo {modulo.numero}. {modulo.nombre}</span>
                              <span className="col m12 l6 expiration-date" style={{"paddingLeft":"0px"}}>Vence el {transformaFechaModulo(actividad.fecha_de_entrega)}</span>
                            </div>
                          </div>
                          <div className="col s2 l1 center-align">
                            {auth.roles[0].name=="Alumno" && actividad.fecha &&
                              <div><span className={'texto-estatus '+realizadaEstatus(actividad.fecha_de_entrega, actividad.fecha)}>{realizadaEstatus(actividad.fecha_de_entrega, actividad.fecha)}</span></div>
                            }
                            {auth.roles[0].name=="Alumno" && !actividad.fecha &&
                              <div><span className={'texto-estatus '+pendienteEstatus(actividad.fecha_de_entrega, actividad.permitir_envios_retrasados)}>{pendienteEstatus(actividad.fecha_de_entrega, actividad.permitir_envios_retrasados)}</span></div>
                            }
                            {/* dropdown para editar */}
                            { auth.roles[0].name=='Ponente' &&
                              <div>
                                <a href="#" className="dropdown-trigger" data-target="dropdown1"><i className="material-icons" style={{"color":"#7D7D7D","fontSize":"18px","marginLeft":"10px"}}>more_vert</i></a>
                                <ul id="dropdown1" className="dropdown-content drop-size2">
                                  <li>
                                    <InertiaLink href="#" className="dropdown-text">
                                      <i className="material-icons">edit</i>Editar
                                    </InertiaLink>
                                  </li>
                                  <li>
                                    <InertiaLink href="#" className="dropdown-text">
                                      <i className="material-icons">delete</i>Eliminar
                                    </InertiaLink>
                                  </li>
                                </ul>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </InertiaLink>
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