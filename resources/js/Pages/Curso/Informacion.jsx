import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useEffect } from 'react'

import '/css/informacionCursos.css'

const Informacion = () => {

  function initializeMaterialize(){
    var elems = document.querySelectorAll('.slider');
    var options = { 
      interval: 4000,
      duration: 1000, 
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
      <div className="row" style={{"marginTop":"10px"}}>
        {/* Slider con las fotos del curso */}
        <div className="col s12 m6 l4">
          <div className="slider">
            <ul className="slides">
              <li><img src="https://www.zaplo.es/blog/wp-content/uploads/2019/06/cursos-online-gratis-612x361.jpeg"></img></li>
              <li><img src="https://assets.entrepreneur.com/content/3x2/2000/20160331180223-businessman-typing-computer-laptop-writing-working-remotely-blogging-blogger-education-learning-connecting.jpeg?width=700&crop=2:1"></img></li>
              <li><img src="https://lorempixel.com/580/250/nature/3"></img></li>
            </ul>
          </div>
        </div>
        {/* Informacion general del curso */}
        <div className="col s12 m6 l8">
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
                    <i className="material-icons" style={{"font-size": "15px","color":"#134E39"}}>videocam</i>
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
                aqui van los tags
              </div>
            </div>
          </div>
        </div>
        {/* Descripcion del curso */}
        <div className="col s12" style={{"marginTop":"15px"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quaerat nemo tempora aperiam facere velit officia veniam rerum autem suscipit, molestiae, reiciendis doloremque minima placeat! Suscipit repellat neque rerum odit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi debitis voluptatem sunt. In, cupiditate officia repellat laudantium corrupti aliquid necessitatibus est officiis nisi aut, accusamus, suscipit minima quibusdam dolorem! Eos?
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eum, dolore necessitatibus ad assumenda laborum. Aliquam minus, ratione voluptatibus ab corporis similique tempora ipsum autem reprehenderit nesciunt laudantium minima ea.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolorum rem praesentium eligendi ut similique nobis corporis doloribus perferendis, necessitatibus soluta libero tenetur aliquid tempora aut consectetur maiores in expedita.
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
                <div class="collapsible-header"><i class="material-icons">attach_file</i>Bibliografía</div>
                <div class="collapsible-body">
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
  <Layout title="Escuela sindical - Curso" pageTitle="Curso Nombre del curso">
    <LayoutCursos children={page} id={1} /> 
  </Layout>
)

export default Informacion