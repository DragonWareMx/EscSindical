import React, {useEffect} from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import CursoActualPonente from '../../components/cursos/CursoActualPonente';

//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
// Hojas de estilos
import '../../styles/cursos.css'
import '../../styles/inicios.css'
import '/css/participantes.css'

const inicioPonente = ({cursos}) => {

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    useEffect(() => {
        initializeMaterialize();
      }, [])
  
        return (
            <>
                <Alertas />
                
                <div className="row">                
                    <div className="col s12">
                        {/* cursos del ponente */}
                        <CursoActualPonente cursos = {cursos} />
                        {/* graficas */}
                        <div className="card">
                            <div className="card-content">
                                <div className="col s12" style={{ "marginBottom": "10px"}}>
                                    <span className="txt-title-card">ESTUDIANTES</span>
                                </div>
                                Aqui van a ir unas graficas bien chulas
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

inicioPonente.layout = page => <Layout children={page} title="Inicio" pageTitle="INICIO"/>

export default inicioPonente