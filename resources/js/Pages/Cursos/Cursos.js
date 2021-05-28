import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
// import FormCurso from '../../components/cursos/FormCurso';
import CursoActual from '../../components/cursos/CursoActual';
import CursoActualPonente from '../../components/cursos/CursoActualPonente';
import HistorialCursos from '../../components/cursos/HistorialCursos';
import HistorialCursosPonente from '../../components/cursos/HistorialCursosPonente'
//COMPONENTS
import Alertas from '../../components/common/Alertas'; 

const Cursos = ({user, cursos, profesor, tags}) => {
  
  if (user.roles['0'].name == 'Ponente'){
    return (
      <>
      <Alertas />
      <CursoActualPonente cursos = {cursos} />,
      <HistorialCursosPonente />
      </>
    )
  }
  else {
    return (
    <>
    <Alertas />
    <CursoActual 
    cursos = {user.active_courses['0']}
    profesor = {profesor}
    tags = {tags}
    />,
    <HistorialCursos />
    </>)
  }
}

Cursos.layout = page => <Layout children={page} title="Mis cursos" pageTitle="MIS CURSOS"/>

export default Cursos