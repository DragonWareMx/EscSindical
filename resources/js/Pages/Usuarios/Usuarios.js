import React, { useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'

const Usuarios = ({users}) => {
    const [values, setValues] = useState({
        nombre: "",
        apellido_p: "",
        apellido_m: "",
        email: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }

      function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/users', values)
      }

  return (
    <>
        <div className="row">
            <div className="col">
                <div className="card darken-1">
                    <div className="card-content">
                        <span className="card-title">Usuarios</span>
                        <table className="striped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                            </thead>

                            <tbody>
                            { users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.email}</td>
                                    {/*<td>
                                        <InertiaLink href={`/users/${user.id}/edit`}>Edit</InertiaLink>
                                    </td>*/}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="nombre">Nombre(s):</label>
                            <input id="nombre" value={values.first_name} onChange={handleChange} />
                            <label htmlFor="apellido_p">Apellido Paterno:</label>
                            <input id="apellido_p" value={values.last_name} onChange={handleChange} />
                            <label htmlFor="apellido_m">Apellido Materno (opcional):</label>
                            <input id="apellido_m" value={values.last_name} onChange={handleChange} />
                            <label htmlFor="email">Email:</label>
                            <input id="email" value={values.email} onChange={handleChange} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

Usuarios.layout = page => <Layout children={page} title="Escuela Sindical - Usuarios" pageTitle="USUARIOS"/>

export default Usuarios