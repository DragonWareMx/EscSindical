import React, {useEffect} from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import CursoActual from '../../components/cursos/CursoActual';
//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
// Hojas de estilos
import '../../styles/cursos.css'
import '../../styles/inicios.css'
import '/css/participantes.css'

const inicioPonente = ({user, profesor, tags}) => {

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
                    <div className="col m12 l5">
                        Soy el inicio para el ponente owo
                    </div>
                </div>
            </>
        )
}

inicioPonente.layout = page => <Layout children={page} title="Inicio" pageTitle="INICIO"/>

export default inicioPonente