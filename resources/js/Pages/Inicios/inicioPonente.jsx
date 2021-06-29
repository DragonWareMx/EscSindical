import React, {useEffect} from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import CursoActualPonente from '../../components/cursos/CursoActualPonente';

//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
import { Pie } from 'react-chartjs-2';
// Hojas de estilos
import '../../styles/cursos.css'
import '../../styles/inicios.css'
import '/css/participantes.css'

const inicioPonente = ({cursos, estudiantes}) => {

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    useEffect(() => {
        initializeMaterialize();
      }, [])

        //    cantidad total de usuarios
        var total = 0;
        estudiantes.map(estudiante => {
            total = total + estudiante.cantidad;
        });

        //    datos de la grafica 1
        var labelsGraphic1 = [];
        var dataGraphic1 = [];
        estudiantes.map(estudiante => {
            if(estudiante.nombre != null && estudiante.cantidad > 0){
                labelsGraphic1.push(estudiante.nombre)
                dataGraphic1.push(estudiante.cantidad)
            }
        });

        const data1 = {
            labels: labelsGraphic1,
            datasets: [
            {
                label: 'CURSOS2',
                data: dataGraphic1,
                backgroundColor: [
                '#FFF06B',
                '#108058',
                '#FF935A',
                '#81B2D6',
                '#D3766A',
                ],
                borderColor: [
                '#FFF06B',
                '#108058',
                '#FF935A',
                '#81B2D6',
                '#D3766A',
                ],
                borderWidth: 1,
            },
            ],
        };

        //  opciones de la grafica 1
        const options1 = {
            plugins: {
            title: {
                display: true,
                text: 'CATEGORÍAS',
                position: 'bottom',
                font: {
                family: "Montserrat",
                size: 13,
                weight: "500"
                }
            },
            legend: {
                position: "right"
            }
            },
            maintainAspectRatio: false
        };
  
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
                                <div className="row">
                                    <div className="col s12" style={{ "marginBottom": "10px"}}>
                                        <span className="txt-title-card">ESTUDIANTES</span>
                                    </div>
                                    <div className="col s12 txt-sub-prov">
                                        Total de estudiantes: {total}
                                    </div>
                                    <div className="col s12 l4">
                                        <Pie
                                            data={data1}
                                            width={400}
                                            height={400}
                                            options={options1} />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

inicioPonente.layout = page => <Layout children={page} title="Inicio" pageTitle="INICIO"/>

export default inicioPonente