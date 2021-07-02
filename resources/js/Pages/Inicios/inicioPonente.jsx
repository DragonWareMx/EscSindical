import React, {useEffect} from 'react'
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import CursoActualPonente from '../../components/cursos/CursoActualPonente';

//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
import { Pie } from 'react-chartjs-2';
// Hojas de estilos
import '../../styles/cursos.css'
import '../../styles/inicios.css'
import '/css/participantes.css'

const inicioPonente = ({cursos, estudiantes, participantes}) => {

    var i=0;

    const { auth } = usePage().props;

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
                        <div className="row">
                            {/* grafica */}
                            <div className="col s12 l4">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="row">
                                            <div className="col s12" style={{ "marginBottom": "10px"}}>
                                                <span className="txt-title-card">ESTUDIANTES</span>
                                            </div>
                                            <div className="col s12 txt-sub-prov">
                                                Total de estudiantes: {total}
                                            </div>
                                            <div className="col s12">
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
                            {/* tabla de alumnos */}
                            <div className="col s12 l8">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="col s12 txt-title-card">ALUMNOS DE CLASE</div>
                                                {/* ITEM DE ALUMNOS, solo se muestran 3*/}
                                                                                
                                                {participantes && participantes.users.length > 1 ?
                                                    participantes.users.map((alumno, index)=>(
                                                    <div key={index}>
                                                        {i < 3 && alumno.id != auth.user.id &&
                                                        <div key={i++} className="col s12 div-collection-item">
                                                            <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' data-target={'dropdown-option-classmate'+index}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                                                            <ul id={'dropdown-option-classmate'+index} className='dropdown-content dropdown_LC'>
                                                                <li><a className="dropdown-text" href={"mailto:"+alumno.email}><i className="material-icons">mail</i>Enviar mensaje</a></li>
                                                                <li className="divider" tabIndex="-1"></li>
                                                                <li><a className="dropdown-text modal-trigger" href="#modalReportar"><i className="material-icons">report_problem</i>Reportar</a></li>
                                                            </ul>

                                                            {/* Información del usuario */}
                                                            <div className=" P_collection_item col s12 m11 l11 xl11 left" style={{"padding":"0px 0px 0px 0px"}}>
                                                                <InertiaLink  href={route('perfil.public',alumno.id)}><img className="P_collection_image" width="50" height="50" src={"/storage/fotos_perfil/"+alumno.foto}></img></InertiaLink>
                                                                <div>
                                                                    <InertiaLink  href={route('perfil.public',alumno.id)} className="P_collection_title">{alumno.nombre} {alumno.apellido_p} {alumno.apellido_m}</InertiaLink>
                                                                    <div className="P_collection_subtitle">Estudiante</div>
                                                                </div>
                                                            </div>    
                                                        </div>
                                                        }
                                                    </div>
                                                    ))
                                                    :
                                                    <><div className="txt-not-found col s12">NO TIENES COMPAÑEROS HASTA AHORA</div></>
                                                }
                                            </div>
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

inicioPonente.layout = page => <Layout children={page} title="Inicio" pageTitle="INICIO"/>

export default inicioPonente