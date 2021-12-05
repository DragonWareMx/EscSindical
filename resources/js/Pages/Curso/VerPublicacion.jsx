import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import Comments from '../../components/common/Comments';

import '/css/modulos.css'
import '/css/participantes.css'



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

function getFileSize(archivo) {
  alert(archivo.size)
  return 0
}

const Informacion = ({ curso, modulo, entrada, comments }) => {
  const [values, setValues] = useState({
    visible: true,
  })

  function handleVisibleC() {
    setValues(values => ({
      ...values,
      visible: !values.visible,
    }))
  }

  return (
    <>
      <div className="row">
        <div className="col s12 titulo-modulo">
          <InertiaLink href={route('cursos.modulo', [curso.id, modulo.id])} className="icon-back-course tooltipped" style={{ "color": "#134E39" }} data-position="left" data-tooltip="Regresar">
            <i className="material-icons">keyboard_backspace</i>
          </InertiaLink>
          Modulo {modulo.numero}. {modulo.nombre}
        </div>
        <div className="col s12">
          <div className="card">
            <div className="card-content" style={{ "paddingBottom": "5px" }}>
              <div className="row">
                {/* si la entrada es un aviso */}
                {entrada.tipo == "Aviso" &&
                  <div>
                    {/* titulo e fecha de publicacion */}
                    <div className="col s9 l11" style={{ "marginTop": "10px" }}>
                      <div className="row valign-wrapper">
                        <div className="col s2 l1 center-align">
                          <i className="material-icons" style={{ "color": "#D14747" }}>announcement</i>
                        </div>
                        <div className="col s10 l11" style={{ "paddingLeft": "0px" }}>
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
                    <div className="col s3 l1" style={{ "marginTop": "10px" }}>
                      <div className="row center-align" style={{ display: "flex", alignContent: "center" }}>
                        <span style={{ cursor: "pointer" }} onClick={handleVisibleC}>
                          <i className="material-icons" style={{ "color": "#848484", "fontSize": "13px" }}>comment</i>
                        </span>
                        <span style={{ "color": "#848484", "fontSize": "13px", "marginLeft": "3px", marginTop: "-1px", cursor: "pointer" }} onClick={handleVisibleC}>{comments && comments.length > 0 ? comments.length : 0}</span>
                      </div>
                    </div>

                    {/* Contenido de la pulbicacion */}
                    <div className="col s12 description-text" style={{ "marginTop": "15px" }} dangerouslySetInnerHTML={{ __html: entrada.contenido }}>
                      {/* Aquí va la descripcion pero se pone en el dangerouslySetInnerHTML */}
                    </div>
                    {/* En caso de que existan archivos en la publicacion aqui se ponen */}
                    {entrada.files && entrada.files.length > 0 &&
                      <div className="col s12">
                        <div className="titulo-modulo">
                          ARCHIVOS
                        </div>
                        <div className="valign-wrapper">
                          <a href={"/storage/archivos_cursos/" + entrada.files[0].archivo} target="_blank" className="nombre-subrayado" style={{ "color": "#5A5A5A" }}>{entrada.files[0].archivo}</a><i className="material-icons tiny" style={{ "marginLeft": "5px", "color": "#5A5A5A" }}>description</i>
                        </div>
                      </div>
                    }
                  </div>
                }
                {/* si la entrada es una publicacion */}
                {entrada.tipo == "Informacion" &&
                  <div>
                    {/* titulo e fecha de publicacion */}
                    <div className="col s9 l11" style={{ "marginTop": "10px" }}>
                      <div className="row valign-wrapper">
                        <div className="col s2 l1 center-align">
                          <i className="material-icons" style={{ "color": "#134E39" }}>assignment</i>
                        </div>
                        <div className="col s10 l11" style={{ "paddingLeft": "0px" }}>
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
                    <div className="col s3 l1" style={{ "marginTop": "10px" }}>
                      <div className="row center-align" style={{ display: "flex", alignContent: "center" }}>
                        <span style={{ cursor: "pointer" }} onClick={handleVisibleC}>
                          <i className="material-icons" style={{ "color": "#848484", "fontSize": "13px" }}>comment</i>
                        </span>
                        <span style={{ "color": "#848484", "fontSize": "13px", "marginLeft": "3px", marginTop: "-1px", cursor: "pointer" }} onClick={handleVisibleC}>{comments && comments.length > 0 ? comments.length : 0}</span>
                      </div>
                    </div>

                    {/* Contenido de la pulbicacion */}
                    <div className="col s12 description-text" style={{ "marginTop": "15px" }} dangerouslySetInnerHTML={{ __html: entrada.contenido }}>
                      {/* Aquí va la descripcion pero se pone en el dangerouslySetInnerHTML */}
                    </div>
                    {/* En caso de que existan archivos en la publicacion aqui se ponen */}
                    {entrada.files && entrada.files.length > 0 &&
                      <div className="col s12">
                        <div className="titulo-modulo">
                          ARCHIVOS
                        </div>
                        <div className="valign-wrapper">
                          <a href={"/storage/archivos_cursos/" + entrada.files[0].archivo} target="_blank" className="nombre-subrayado" style={{ "color": "#5A5A5A" }}>{entrada.files[0].archivo}</a><i className="material-icons tiny" style={{ "marginLeft": "5px", "color": "#5A5A5A" }}>description</i>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        {/* boton de regresar */}
        <div className="col s12 valign-wrapper" style={{ "color": "#134E39" }}>
          {values.visible &&
            <Comments idCurso={curso.id} idModulo={modulo.id} idEntrada={entrada.id} comments={comments} handleVisibleC={handleVisibleC} idTeacher={curso.teacher.id} />
          }

        </div>


      </div>
    </>
  )
}

Informacion.layout = page => (
  <Layout title="Formación XX Mich - Modulo" pageTitle="Modulo">
    <LayoutCursos children={page} />
  </Layout>
)

export default Informacion