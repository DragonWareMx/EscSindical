import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useEffect } from 'react';
import '/css/informacionCursos.css'
import '../../styles/cursos.css'
import '/css/courseCardSearch.css'
import '/css/modulos.css'
import Tag from '../../components/common/Tag';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

function transformaFecha(fecha) {
  const dob = new Date(fecha);
  const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const day = dob.getDate();
  const monthIndex = dob.getMonth();
  const year = dob.getFullYear();
  return `${day} ${monthNames[monthIndex]} ${year}`;
}

const Informacion = ({curso}) => {
  const { auth } = usePage().props;

  function initializeMaterialize(){
    
  }

  useEffect(() => {
    initializeMaterialize();
  }, [])

  return (
    <>
      <div className="row">
          {/* titulo de la seccion */}
        <div className="col s12 titulo-modulo" style={{marginTop:"15px"}}>ESTADÍSTICAS</div>
        {/* apartir de aqui van las graficas */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius facere at atque mollitia voluptatum. Facilis dolorem maiores blanditiis fuga repellendus error, dolores pariatur enim fugit saepe eveniet delectus ad incidunt.
        <br />
        aqui van las graficas xd
      </div>
    </>
  )
}

Informacion.layout = page => (
  <>
    <Layout title="Escuela sindical - Curso" pageTitle="Estadísticas">
      <LayoutCursos children={page} />  
    </Layout>
  </>
)

export default Informacion