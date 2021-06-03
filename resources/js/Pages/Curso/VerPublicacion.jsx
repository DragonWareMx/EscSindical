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

const Informacion = ({curso,modulo,entrada}) => {
  return (
    <>
      <div className="row">
        <div className="col s12 titulo-modulo">
          Modulo {modulo.numero}. {modulo.nombre}
        </div>
        <div className="col s12">
          <div className="card">
            <div className="card-content" style={{"paddingBottom":"5px"}}>
              <div className="row">
                {/* si la entrada es un aviso */}
                {entrada.tipo == "Aviso" &&
                  <div>
                    {/* titulo e fecha de publicacion */}
                    <div className="col s9 l11" style={{"marginTop":"10px"}}>
                        <div className="row valign-wrapper">
                          <div className="col s2 l1 center-align">
                              <i className="material-icons" style={{"color":"#D14747"}}>announcement</i>
                          </div>
                          <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                              <div className="col s12 advice-text">
                                  {entrada.titulo}
                              </div>
                              <div className="col s12 posted-date">
                                  Publicado el {transformaFechaModulo(entrada.created_at)}
                              </div>
                          </div>
                        </div>
                    </div>

                    {/* icono con cantidad de comentarios */}
                    <div className="col s3 l1" style={{"marginTop":"10px"}}>
                        <div className="row center-align">
                            <span>
                                <i className="material-icons" style={{"color":"#848484","fontSize":"13px"}}>comment</i>
                            </span>
                            <span style={{"color":"#848484","fontSize":"13px","marginLeft":"3px"}}>0</span>
                        </div>
                    </div>

                    {/* Contenido de la pulbicacion */}
                    <div className="col s12 description-text" style={{"marginTop":"15px"}} dangerouslySetInnerHTML={{__html: entrada.contenido}}>
                      {/* Aquí va la descripcion pero se pone en el dangerouslySetInnerHTML */}
                    </div>
                      
                  </div>
                }
                {/* si la entrada es una publicacion */}
                {entrada.tipo == "Informacion" &&
                  <div>
                    {/* titulo e fecha de publicacion */}
                    <div className="col s9 l11" style={{"marginTop":"10px"}}>
                        <div className="row valign-wrapper">
                          <div className="col s2 l1 center-align">
                              <i className="material-icons" style={{"color":"#134E39"}}>assignment</i>
                          </div>
                          <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                              <div className="col s12 publicacion">
                                  {entrada.titulo}
                              </div>
                              <div className="col s12 posted-date">
                                  Publicado el {transformaFechaModulo(entrada.created_at)}
                              </div>
                          </div>
                        </div>
                    </div>

                    {/* icono con cantidad de comentarios */}
                    <div className="col s3 l1" style={{"marginTop":"10px"}}>
                        <div className="row center-align">
                            <span>
                                <i className="material-icons" style={{"color":"#848484","fontSize":"13px"}}>comment</i>
                            </span>
                            <span style={{"color":"#848484","fontSize":"13px","marginLeft":"3px"}}>0</span>
                        </div>
                    </div>

                    {/* Contenido de la pulbicacion */}
                    <div className="col s12 description-text" style={{"marginTop":"15px"}} dangerouslySetInnerHTML={{__html: entrada.contenido}}>
                      {/* Aquí va la descripcion pero se pone en el dangerouslySetInnerHTML */}
                    </div>
                      
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        {/* boton de regresar */}
        <div className="col s12 valign-wrapper" style={{"color":"#134E39"}}>
          <i className="material-icons">chevron_left</i>Regresar
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