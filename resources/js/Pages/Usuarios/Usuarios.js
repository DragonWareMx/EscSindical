import React from 'react';
import Layout from '../../layouts/Layout';

const Usuarios = ({users}) => {
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
                    </div>
                    <div className="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

Usuarios.layout = page => <Layout children={page} title="Escuela Sindical - Usuarios" pageTitle="USUARIOS"/>

export default Usuarios