import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import FormCurso from '../../components/FormCurso';
import CursoActual from '../../components/cursos/CursoActual';
import CursoActualPonente from '../../components/cursos/CursoActualPonente';
import HistorialCursosPonente from '../../components/cursos/HistorialCursosPonente';

const Cursos = ({user, cursos, profesor, tags}) => {
  console.log(user.courses)
  return (
    <>
    {/* Componente para cursos actuales de estudiantes */}
    {user.roles['0'].name == 'Ponente' ? <CursoActualPonente cursos = {cursos}/> 
    : <CursoActual 
    cursos = {user.courses}
    profesor = {profesor}
    tags = {tags}
    />}
    {/* Componente para cursos actuales de ponentes */}
    
    {/* Componente para el historial de cursos de ponentes */}
    {/* <HistorialCursosPonente /> */}
    {/* <FormCurso /> */}
    </>
  )
}

Cursos.layout = page => <Layout children={page} title="Mis cursos" pageTitle="MIS CURSOS"/>

export default Cursos