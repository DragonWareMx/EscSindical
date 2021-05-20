import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useEffect } from 'react';
import '/css/informacionCursos.css'
import '../../styles/cursos.css'
import '/css/courseCardSearch.css'
import Tag from '../../components/common/Tag';

const Informacion = ({curso}) => {
  function initializeMaterialize(){
    var elems = document.querySelectorAll('.slider');
    var options = { 
      interval: 4000,
      duration: 1000,
      height: 250,
      width: 275, 
    }
    var instances = M.Slider.init(elems, options);

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  }

  useEffect(() => {
    initializeMaterialize();
  }, [])

  return (
    <>
      <div className="row">
        {/* Slider con las fotos del curso */}
        <div className="col s12 m6 l4" style={{marginTop:"25px"}}>
          <div className="slider">
            <ul className="slides">
            {curso.images && curso.images.length>0 && 
                curso.images.map( (foto , index) => (
                  <li key={index}><img src={'/storage/imagenes_curso/'+foto.imagen}></img></li>
                ))
              }
            </ul>
          </div>
        </div>
        {/* Informacion general del curso */}
        <div className="col s12 m6 l8" style={{marginTop:"25px"}}>
          {/* row con 2 bloques */}
          <div className="row">
            {/* bloque 2 */}
            <div className="col s12 m12 l4 push-l8">
              {/* Calificacion */}
              <div className="col s12">
                <div className="info-title">CALIFICACIÓN</div>
                Sin evaluar
              </div>
              {/* Videoconferencias */}
              <div className="col s12">
                <div className="info-title">VIDEOCONFERENCIAS</div>
                <div>
                  Aqui van las fechas de las videoconferencias
                </div>
                {/* Enlace a las videoconferencias */}
                <div className="valign-wrapper">
                  <div className="col s1 valign-wrapper">
                    <i className="material-icons" style={{fontSize: "15px","color":"#134E39"}}>videocam</i>
                  </div>
                  <div className="col s11">
                    <a href="#" style={{"textDecoration":"underline","color":"#134E39"}}>Clic para acceder </a>
                  </div>
                </div>
              </div>
            </div>
            {/* bloque 1 */}
            <div className="col s12 m12 l8 pull-l4">
              {/* Fechas */}
              <div className="col s12">
                <div className="info-title">FECHAS</div>
                aqui van las fechas
              </div>
              {/* Ponente */}
              <div className="col s12">
                <div className="info-title">PONENTE</div>
                aqui van los datos del ponente
              </div>
              {/* Etiquetas */}
              <div className="col s12">
                <div className="info-title">ETIQUETAS</div>
                {/* Tags del curso */}
                <div className="col s12 courseCard_tags" style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <div className="container-tags">
                    {curso.tags && curso.tags.length>0 && curso.tags.map((tag, index) =>
                        <Tag nombre={tag.nombre} key={index} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Descripcion del curso */}
        <div className="col s12" style={{"marginTop":"15px"}} dangerouslySetInnerHTML={{__html: curso.descripcion}}>
          {/* Aquí va la descripcion pero se pone en el dangerouslySetInnerHTML */}
        </div>
        {/* Evaluacion y bibliografia */}
        <div className="col s12">
          <div className="section-title">
            EVALUACIÓN Y BIBLIOGRAFÍA
          </div>
          {/* collapsible de la bibliografia */}
          <div style={{"marginTop":"15px"}}>
            <ul className="collapsible">
              <li>
                <div className="collapsible-header"><i className="material-icons">attach_file</i>Bibliografía</div>
                <div className="collapsible-body">
                  Aqui va la bibliografia
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

Informacion.layout = page => (
  <>
    <Layout title="Escuela sindical - Curso" pageTitle="Curso Nombre del curso">
      <LayoutCursos children={page} />  
    </Layout>
  </>
)

export default Informacion