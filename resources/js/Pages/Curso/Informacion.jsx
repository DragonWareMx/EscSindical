import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useEffect } from 'react';
import '/css/informacionCursos.css'
import '../../styles/cursos.css'
import '/css/courseCardSearch.css'
import Tag from '../../components/common/Tag';


function transformaFecha(fecha) {
  const dob = new Date(fecha);
  const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const day = dob.getDate();
  const monthIndex = dob.getMonth();
  const year = dob.getFullYear();
  return `${day} ${monthNames[monthIndex]} ${year}`;
}

function calculaAvance(ini, fin) {
  var start = new Date(ini),
      end = new Date(fin),
      today = new Date(),
      porcentaje = Math.round(((today - start) / (end - start)) * 100)
  if (porcentaje < 0)
      return 0
  else if (porcentaje > 100)
      return 100
  else return porcentaje
}

const Informacion = ({curso, cursos_count, participantes_count}) => {
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
      <div className="row default-text">
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
              <div className="col s12 default-text">
                <div className="info-title">VIDEOCONFERENCIAS</div>
                <div className="col s6" style={{"padding":"0px"}}>
                  Lu,Mie,Jue<br />
                  Ma,Vie
                </div>
                <div className="col s6" style={{"padding":"0px"}}>
                  20:00 - 21:00<br />
                  15:00 - 17:00
                </div>
                {/* Enlace a las videoconferencias */}
                <div className="col s12">
                  <a href={curso.link} className="txt-video-course" style={{"marginTop":"10px"}}>
                      <i className="material-icons tiny" >videocam</i>
                      <a href={curso.link} target="_blank" style={{"marginLeft": "5px", "textDecoration": "underline",color:"#185E45"}}>Clic para acceder</a>
                  </a>
                </div>
                
              </div>
            </div>
            {/* bloque 1 */}
            <div className="col s12 m12 l8 pull-l4">
              {/* Fechas */}
              <div className="col s12">
                <div className="info-title">FECHAS</div>
                <div className="txt-presentation txt-date-course">Inicio {transformaFecha(curso.fecha_inicio)}, Fin {transformaFecha(curso.fecha_final)}</div>                   
                {/* DIV progress bar del curso */}
                <div className="row" style={{"display":"flex", "alignItems": "center", "marginBottom": "0px"}}>
                    <div className="col s5">
                        <div className="progress" style={{"margin": "0px"}}>
                            <div className="determinate" style={{"width": calculaAvance(curso.fecha_inicio, curso.fecha_final)+"%"}}></div>
                        </div>
                    </div>
                    <div className="col s7">
                        <div className="txt-progress-course">Avance {calculaAvance(curso.fecha_inicio, curso.fecha_final)}%</div>
                    </div>
                </div>
              </div>
              {/* Ponente */}
              <div className="col s12">
                <div className="info-title">PONENTE</div>
                <div className="col s12" style={{"padding":"0px"}}>
                  <div className="nombre-ponente">
                    {curso.teacher.nombre} {curso.teacher.apellido_p} {curso.teacher.apellido_m}
                  </div>
                </div>
                <div className="col s3 m5 l3">
                  {/* <img className="foto-ponente red" src={"/storage/fotos_perfil/" + curso.teacher.foto} alt="img" /> */}
                  <img className="foto-ponente" src={"/storage/fotos_perfil/"+curso.teacher.foto} alt="img" />
                </div>
                <div className="col s9 m7 l9">
                  {/* cantidad de cursos */}
                  <div className="txt-video-course">
                      {/* cantidad de participantes */}
                      <i className="material-icons tiny">play_circle</i> 
                      <p style={{"marginLeft": "5px", "color": "#585858 !important"}}>{cursos_count} cursos</p> 
                  </div>
                  {/* cantidad de participantes */}
                  <div className="txt-video-course" style={{"marginTop":"0px"}}>
                    <i className="material-icons tiny">people</i>
                    <p style={{"marginLeft": "5px", "color": "#585858 !important"}}> {participantes_count} participantes</p>
                    {/* <p style={{"marginLeft": "5px", "color": "#585858 !important"}}> {curso.users.length} participantes</p> */}
                  </div>
                </div>
              </div>
              {/* Etiquetas */}
              <div className="col s12">
                <div className="info-title">ETIQUETAS</div>
                {/* Tags del curso */}
                <div className="col s12 courseCard_tags" style={{ "marginTop": "5px", "marginBottom": "5px", "padding" : "0px" }}>
                  <div className="container-tags" style={{"marginTop":"0px"}}>
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
        <div className="col s12 description-text" style={{"marginTop":"15px"}} dangerouslySetInnerHTML={{__html: curso.descripcion}}>
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
    <Layout title="Escuela sindical - Curso" pageTitle="Curso">
      <LayoutCursos children={page} />  
    </Layout>
  </>
)

export default Informacion