import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import Layout from '../../layouts/Layout';
import FormCurso from '../../components/FormCurso';
import CursoActual from '../../components/cursos/CursoActual';
import CursoActualPonente from '../../components/cursos/CursoActualPonente';


const Cursos = () => {
  return (
    <>
    {/* Componente para cursos actuales de estudiantes */}
    <CursoActual />

    {/* Componente para cursos actuales de ponentes */}
    <CursoActualPonente />
    {/* <FormCurso /> */}
    </>
  )
}

Cursos.layout = page => <Layout children={page} title="Mis cursos" pageTitle="MIS CURSOS"/>

export default Cursos