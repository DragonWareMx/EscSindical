import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

const Informacion = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>Hello soy un modulo jajaja, welcome to your first Inertia app!</p>
    </>
  )
}

Informacion.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Curso Nombre del curso">
    <LayoutCursos children={page} id={1} />
  </Layout>
)

export default Informacion