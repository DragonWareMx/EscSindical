import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useEffect } from 'react'

const Informacion = () => {

  function initializeMaterialize(){
    var elems = document.querySelectorAll('.slider');
    var options = { 
      interval: 4000,
      duration: 1000, 
    }
    var instances = M.Slider.init(elems, options);
  }

  useEffect(() => {
    initializeMaterialize();
  }, [])

  return (
    <>
      <div className="row" style={{"marginTop":"10px"}}>
        <div className="col s12 m6 l4">
          <div className="slider">
            <ul className="slides">
              <li><img src="https://www.zaplo.es/blog/wp-content/uploads/2019/06/cursos-online-gratis-612x361.jpeg"></img></li>
              <li><img src="https://assets.entrepreneur.com/content/3x2/2000/20160331180223-businessman-typing-computer-laptop-writing-working-remotely-blogging-blogger-education-learning-connecting.jpeg?width=700&crop=2:1"></img></li>
              <li><img src="https://lorempixel.com/580/250/nature/3"></img></li>
            </ul>
          </div>
          <div className="col s12 m6 l4"> 
            hola
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