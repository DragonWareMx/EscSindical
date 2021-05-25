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
  
  return (
    <>
    
    {/* Componente para el historial de cursos de estudiantes y solicitudes............. */}
    {/* <HistorialCursos /> */}
    <Alertas />
    {user.roles['0'].name == 'Ponente' ? <CursoActualPonente cursos = {cursos}/> 
    : <CursoActual 
    cursos = {user.active_courses['0']}
    profesor = {profesor}
    tags = {tags}
    />}
    {/* Componente para cursos actuales de ponentes */}
    {/* <CursoActualPonente /> */}
    {/* Componente modal para crear curso */}
    {/* <FormCurso /> */}

    {/* Componente para el historial de cursos de ponentes .......................*/}
    {/* <HistorialCursosPonente /> */}
    
    </>
  )
}

Cursos.layout = page => <Layout children={page} title="Mis cursos" pageTitle="MIS CURSOS"/>

export default Cursos