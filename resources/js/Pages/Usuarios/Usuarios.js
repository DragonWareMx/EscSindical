import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import Paginacion from '../../components/common/Paginacion';
import FlotanteAyuda from '../../components/common/FlotanteAyuda';
import InfoAlumno from '../../components/common/InfoAlumno';
import Skeleton from 'react-loading-skeleton';

import '../../styles/usersStyle.css'
import route from 'ziggy-js';

const Usuarios = ({ users }) => {
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

    //valores para formulario
    const [values, setValues] = useState({
        nombre: "",
        apellido_p: "",
        apellido_m: "",
        email: "",
    })

    const [time, setTime] = useState({
        typingTimeout: 0
    })

    //realiza la búsqueda cada vez que se escribe en el input
    function changeName(event){  
        console.log(event.target.value)
        if (time.typingTimeout) {
           clearTimeout(time.typingTimeout);
        }

        let search = event.target.value

        console.log(route('usuarios').url())

        setTime({
            typingTimeout: setTimeout(function () {
                Inertia.replace(route('usuarios').url(),{data: {search: search}})
             }, 250)
        });
    }

    function getUser(id){
        Inertia.reload(
            { only: ['user'], 
                data: {user: id},
                onSuccess: () => {
                    const elem = document.getElementById('modalInfoAlumno');
                    const instance = M.Modal.init(elem, {dismissible: false});
                    instance.open();
                }
            }
        )
    }

    return (
        <>
            <div className="row">
                <div className="col s12">
                    <div className="card darken-1 cardUsers">
                        <a className="btn-floating btn-large waves-effect waves-light green-sind button-addUser"><i className="material-icons">add</i></a>
                        <div className="card-content">
                            <span className="card-title">Usuarios</span>
                            <nav className="searchUsers">
                                <div className="nav-wrapper">
                                    <div className="input-field">
                                        <input id="search" type="search" onChange={changeName}/>
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </div>
                            </nav>
                            <table className="striped userTable responsive-table">
                                <thead>
                                    <tr>
                                        <th>MATRÍCULA</th>
                                        <th>ROL</th>
                                        <th>NOMBRE</th>
                                        <th>UNIDAD</th>
                                        <th>CATEGORÍA</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.data.length > 0 && users.data.map(user => (
                                        <tr key={user.id} onClick={() => getUser(user.id)}>
                                            <td>{user.matricula}</td>
                                            <td>{/*user.roles['0'].name*/}</td>
                                            <td>{user.nombre} {user.apellido_p} {user.apellido_m}</td>
                                            <td>UMF80 - Morelia</td>
                                            <td>{user.categorie.nombre}</td>
                                            <td><button><i className="material-icons">edit</i> </button></td>
                                            <td><button><i className="material-icons">delete</i> </button></td>
                                            {/*<td>
                                        <InertiaLink href={`/users/${user.id}/edit`}>Edit</InertiaLink>
                                    </td>*/}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <form onSubmit={handleSubmit}>
                                <label htmlFor="nombre">Nombre(s):</label>
                                <input id="nombre" value={values.first_name} onChange={handleChange} />
                                <label htmlFor="apellido_p">Apellido Paterno:</label>
                                <input id="apellido_p" value={values.last_name} onChange={handleChange} />
                                <label htmlFor="apellido_m">Apellido Materno (opcional):</label>
                                <input id="apellido_m" value={values.last_name} onChange={handleChange} />
                                <label htmlFor="email">Email:</label>
                                <input id="email" value={values.email} onChange={handleChange} />
                                <button type="submit">Submit</button>
                            </form> */}
                            <div className="row">
                                <div className="col s12 center-align">
                                    <Paginacion links={users.links}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FlotanteAyuda />
            <InfoAlumno />
        </>
    )
}

Usuarios.layout = page => <Layout children={page} title="Escuela Sindical - Usuarios" pageTitle="USUARIOS" />

export default Usuarios