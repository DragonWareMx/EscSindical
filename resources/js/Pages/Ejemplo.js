import React from 'react';
import Layout from '../layouts/Layout';
import '../styles/cursos.css'

const Home = () => {
  return (
    <>
      <div className="row">                
        <div className="col s12">
            <div className="card ">
                <div className="card-content">
                    {/* TITULO CARD */}
                    <div className="row" style={{"marginBottom":"0px"}}>
                        <div className="col s12" style={{ "marginBottom": "10px"}}>
                            <div className="col s12 txt-title-card">BIENVENIDO</div>
                            
                        </div>
                        <h6 className="col s12 center"><b>ESCUELA SINDICAL</b></h6>
                        <div className="col s12 center">
                        <img src="img/Learning.gif" className="img-course" style={{"width":"40%"}} />
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