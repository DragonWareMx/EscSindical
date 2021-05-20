import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

const Informacion = ({curso}) => {
  return (
    <>
      <h1>Welcome</h1>
      <p>Hello soy un modulo jajaja, welcome to your first Inertia app!</p>
    </>
  )
}

Informacion.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Curso Nombre del curso">
    <LayoutCursos children={page} />
  </Layout>
)

export default Informacion