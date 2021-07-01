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

const inicioAdmin = ({usuariosRoles, inscritos, cantidadPonentes, cursosActuales, totalCursosActuales, cursosTerminados, totalCursosTerminados}) => {

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    useEffect(() => {
        initializeMaterialize();
      }, [])

      //    cantidad total de usuarios
      var total = 0;
      usuariosRoles.map(userRole => {
        total = total + userRole.cantidad;
      });

      //    datos de la grafica 1
      var labelsGraphic1 = [];
      var dataGraphic1 = [];
      usuariosRoles.map(userRole => {
        labelsGraphic1.push(userRole.name)
        dataGraphic1.push(userRole.cantidad)
      });

      const data1 = {
        labels: labelsGraphic1,
        datasets: [
          {
            label: 'USUARIOS1',
            data: dataGraphic1,
            backgroundColor: [
              '#F1B0D8',
              '#108058',
              '#D3766A',
            ],
            borderColor: [
                '#F1B0D8',
                '#108058',
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
            text: 'ROLES DE USUARIOS',
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

    //  datos grafica 2
    var cantEstudiantes = dataGraphic1[1];
    var dataGraphic2 = [inscritos.cantidad, (cantEstudiantes-inscritos.cantidad)];
    const data2 = {
        labels: ['Inscritos','No inscritos'],
        datasets: [
          {
            label: 'USUARIOS2',
            data: dataGraphic2,
            backgroundColor: [
                '#F1B0D8',
                '#CACACA',
            ],
            borderColor: [
                '#F1B0D8',
                '#CACACA',
            ],
            borderWidth: 1,
          },
        ],
      };

      //  opciones de la grafica 2
    const options2 = {
        plugins: {
        title: {
            display: true,
            text: 'ALUMNOS INSCRITOS A CURSOS',
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

    //  datos de la grafica 3
    var cantPonentes = dataGraphic1[2];
    var dataGraphic3 = [cantidadPonentes, (cantidadPonentes-cantPonentes)];
    const data3 = {
        labels: ['1 o más cursos','0 cursos'],
        datasets: [
          {
            label: 'USUARIOS3',
            data: dataGraphic3,
            backgroundColor: [
                '#108058',
                '#CACACA',
            ],
            borderColor: [
                '#108058',
                '#CACACA',
            ],
            borderWidth: 1,
          },
        ],
      };

    //  opciones de la grafica 3
    const options3 = {
        plugins: {
        title: {
            display: true,
            text: 'PONENTES QUE IMPARTEN CURSOS',
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


    //    datos de la grafica 4
    var labelsGraphic4 = [];
    var dataGraphic4 = [];
    cursosActuales.map(cursoActual => {
      labelsGraphic4.push(cursoActual.nombre)
      dataGraphic4.push(cursoActual.total)
    });

    const data4 = {
      labels: labelsGraphic4,
      datasets: [
        {
          label: 'CURSOS1',
          data: dataGraphic4,
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

  //  opciones de la grafica 4
  const options4 = {
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

  //    datos de la grafica 5
  var labelsGraphic5 = [];
  var dataGraphic5 = [];
  cursosTerminados.map(cursoTerminado => {
    labelsGraphic5.push(cursoTerminado.nombre)
    dataGraphic5.push(cursoTerminado.total)
  });

  const data5 = {
    labels: labelsGraphic5,
    datasets: [
      {
        label: 'CURSOS2',
        data: dataGraphic5,
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

//  opciones de la grafica 5
const options5 = {
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
                        {/* graficas de usuarios */}
                        <div className="card">
                            <div className="card-content">
                                <div className="row">
                                    <div className="col s12" style={{ "marginBottom": "10px"}}>
                                        <span className="txt-title-card">USUARIOS</span>
                                    </div>
                                    {/* cantidad de usuarios totales */}
                                    <div className="col s12 txt-sub-prov">
                                    <span>Total de usuarios: {total}</span>
                                    </div>
                                    {/* grafica 1 -> total de usuarios separados por rol */}
                                    <div className="col s12 l4">
                                        <Pie
                                            data={data1}
                                            width={400}
                                            height={400}
                                            options={options1} />
                                    </div>
                                    {/* grafica 2 -> estudiantes inscritos a un curso */}
                                    <div className="col s12 l4">
                                        <Pie
                                            data={data2}
                                            width={400}
                                            height={400}
                                            options={options2} />
                                    </div>
                                    {/* grafica 3 -> ponentes que estan dando al menos un curso */}
                                    <div className="col s12 l4">
                                        <Pie
                                            data={data3}
                                            width={400}
                                            height={400}
                                            options={options3} />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {/* graficas de cursos */}
                        <div className="card">
                            <div className="card-content">
                                <div className="col s12" style={{ "marginBottom": "10px"}}>
                                    <span className="txt-title-card">CURSOS</span>
                                </div>
                                <div className="row">
                                    {/* grafica 4 -> cursos activos separados por training_types */}
                                    <div className="col s12 l4">
                                      <span className="col s12 txt-sub-prov">Total de cursos actuales: {totalCursosActuales}</span>
                                      <div className="col s12">
                                          <Pie
                                              data={data4}
                                              width={400}
                                              height={400}
                                              options={options4} />
                                      </div>
                                    </div>
                                    <div className="col s12 l4">
                                      <span className="col s12 txt-sub-prov">Total de cursos terminados: {totalCursosTerminados}</span>
                                      <div className="col s12">
                                          <Pie
                                              data={data5}
                                              width={400}
                                              height={400}
                                              options={options5} />
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

inicioAdmin.layout = page => <Layout children={page} title="Inicio" pageTitle="INICIO"/>

export default inicioAdmin