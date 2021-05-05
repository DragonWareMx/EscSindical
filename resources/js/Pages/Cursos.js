import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import Layout from '../layouts/Layout';
import FormCurso from '../components/FormCurso';

const Cursos = () => {
  return (
    <>
    <FormCurso />
    </>
  )
}

Cursos.layout = page => <Layout children={page} title="Cursos" pageTitle="Cursos"/>

export default Cursos