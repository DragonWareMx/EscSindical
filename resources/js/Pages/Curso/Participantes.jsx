import React, {useEffect} from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react'
import ModalDarBaja from '../../components/common/ModalDarBaja';
import ModalReportar from '../../components/common/ModalReportar';
import Alertas from '../../components/common/Alertas'; 

import '/css/participantes.css'
import '/css/modulos.css'
import route from 'ziggy-js';

const Participantes = ({curso}) => {

    const { auth } = usePage().props;

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    useEffect(() => {
        initializeMaterialize();
      }, [])


  return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{"marginTop":"15px"}}>PARTICIPANTES</div>
            { auth.roles['0'].name == 'Ponente' &&
                <div>
                    <div className="col s12 m3 l2 xl2 right" style={{"textAlign":"right","marginTop":"15px"}}><InertiaLink href={route('cursos.solicitudes', curso.id)} className="link-solicitudes">Solicitudes<i class="material-icons tiny" style={{"marginLeft":"10px","marginRight":"5px"}}>mail</i></InertiaLink></div>
                    <div className="col s12">
                        <InertiaLink className="a-select-all" href={route('cursos.agregarParticipante', curso.id)}>Agregar participantes</InertiaLink>
                    </div>
                </div>
                
            }
            <div className="col s12 P_sub" style={{marginTop:"15px"}}>Ponente</div>
            
            {/* Row de ponente */}
            <div className="col s12 div-collection-item ">
                {/* Información del usuario */}
                <div className=" P_collection_item col s12 m11 l11 xl11 left">
                    <InertiaLink  href={route('perfil.public',curso.teacher.id)}><img className="P_collection_image" width="50" height="50" src={"/storage/fotos_perfil/"+curso.teacher.foto}></img></InertiaLink>
                    <div>
                        <InertiaLink  href={route('perfil.public',curso.teacher.id)} className="P_collection_title">{curso.teacher.nombre} {curso.teacher.apellido_p} {curso.teacher.apellido_m} </InertiaLink>
                        <div className="P_collection_subtitle">Ponente</div>
                    </div>
                </div>
            </div>

            <div className="col s12 P_sub" style={{marginTop:"15px"}}>{curso.users && curso.users.length > 0 ? "Compañeros de clase" : "Sin alumnos registrados" }</div>
            
            {/* Rows de estudiantes */}
            {curso.users && curso.users.length>0 && curso.users.map((user, index) =>
                <div className="col s12 div-collection-item" key={index}>
                    {/* btn de opciones */}
                    <div className="col s12 m1 l1 xl1 right "><a className='dropdown-trigger right' href='#' data-target={'dropdown-option-student'+index}><i className="material-icons" style={{"color":"#727272", "fontSize":"22px"}}>more_vert</i></a></div>
                    <ul id={'dropdown-option-student'+index} className='dropdown-content dropdown_LC'>
                        <li><a className="dropdown-text" href={"mailto:"+user.email}><i className="material-icons">mail</i>Enviar mensaje</a></li>
                        <li className="divider" tabIndex="-1"></li>
                        {/* Opción exclusiva para el ponente */}
                        { auth.roles['0'].name == 'Ponente' &&
                            <div>
                                <li><a className="dropdown-text modal-trigger" data-target={'modalDarBaja'+user.id}><i className="material-icons">error_outline</i>Dar de baja del curso</a></li>
                                <li className="divider" tabIndex="-1"></li>
                            </div>
                        }
                        <li><a className="dropdown-text modal-trigger" data-target={'modalReportar'+user.id}><i className="material-icons">report_problem</i>Reportar</a></li>
                    </ul>
                    {/* Información del usuario */}
                    <div className=" P_collection_item col s12 m11 l11 xl11 left">
                        <InertiaLink  href={route('perfil.public',user.id)}><img className="P_collection_image" width="50" height="50" src={"/storage/fotos_perfil/"+user.foto}></img></InertiaLink>
                        <div>
                            <InertiaLink  href={route('perfil.public',user.id)} className="P_collection_title">{user.nombre} {user.apellido_p} {user.apellido_m}</InertiaLink>
                            <div className="P_collection_subtitle">Estudiante</div>
                        </div>
                    </div>
                    <ModalDarBaja url={route('dar-baja-estudiante', user.id)} nombre={user.nombre+' '+user.apellido_p+' '+user.apellido_m} id={user.id} curso={curso.nombre} />
                    <ModalReportar url={route('CrearReporte')} nombre={user.nombre+' '+user.apellido_p+' '+user.apellido_m} id={user.id} />
                </div>
                
            )}
            
        </div>
    </>
  )
}

Participantes.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Participantes">
    <LayoutCursos children={page} />
  </Layout>
)

export default Participantes