import React from 'react';
import Layout from '../layouts/Layout';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import '../styles/inicios.css'

const Home = () => {
  return (
    <>
      <div className="row">                
        <div className="col s12">
            <div className="card">
                <div className="card-content">
                    {/* TITULO CARD */}
                    <div className="row" style={{"marginBottom":"0px"}}>
                        <div className="col s12">
                          <div className="col s12 m6">
                            <div className="col s12 txt-welcome-prov">¡BIENVENIDO DE NUEVO!</div>
                            <div className="col s12 txt-sub-prov">Explorá los cursos que Escuela Sindical tiene para ti</div>
                            <div className="col s12 txt-prov">Encuentra el curso adecuado para ti y unete a la clase. <br></br>Nuestras conquistas se traducen a un sin fin de prestaciones económicas y sociales para los Trabajadores del IMSS y sus familias. </div>
                            <div className="col s12" style={{"marginTop":"50px","marginBottom":"20px"}}><InertiaLink href={route('cursosBuscar')} className="btn-search-prov">Buscar cursos</InertiaLink></div>
                          </div>
                          <div className="col s12 m6">
                            <img src="img/imagenes/Learning2.gif" className="img-course" style={{"width":"95%"}} />
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

Home.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio"/>

export default Home