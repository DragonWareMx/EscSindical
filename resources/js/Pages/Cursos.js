import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import Layout from '../layouts/Layout';
import FormCurso from '../components/FormCurso';
import CursoActual from '../components/CursoActual';


const Cursos = () => {
  return (
    <>
    <CursoActual />
    {/* <FormCurso /> */}
    </>
  )
}

Cursos.layout = page => <Layout children={page} title="Mis cursos" pageTitle="MIS CURSOS"/>

export default Cursos