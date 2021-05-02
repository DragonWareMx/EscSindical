import React from 'react';
import Layout from '../layouts/Layout';

const Home = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>Hello, welcome to your first Inertia app!</p>
    </>
  )
}

Home.layout = page => <Layout children={page} title="Ejemplo" pageTitle="Ejemplo"/>

export default Home