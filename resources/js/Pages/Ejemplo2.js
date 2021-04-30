import React from 'react';
import Layout from '../layouts/Layout';

const Home = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>Hello, welcome to your second Inertia app :V!</p>
    </>
  )
}

Home.layout = page => <Layout children={page} />

export default Home