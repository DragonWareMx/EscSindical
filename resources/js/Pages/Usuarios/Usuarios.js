import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import Paginacion from '../../components/common/Paginacion';
import FlotanteAyuda from '../../components/common/FlotanteAyuda';
import InfoAlumno from '../../components/common/InfoAlumno';
import Skeleton from 'react-loading-skeleton';

import '../../styles/usersStyle.css'
import route from 'ziggy-js';

function initializeMat() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
}

const Usuarios = ({ users, user }) => {
    const [state, setState] = useState({
        typingTimeout: 0
    })

    //realiza la búsqueda cada vez que se escribe en el input
    function changeName(event) {
        console.log(event.target.value)
        if (time.typingTimeout) {
            clearTimeout(time.typingTimeout);
        }

        let search = event.target.value

        console.log(route('usuarios').url())

        setState({
            typingTimeout: setTimeout(function () {
                Inertia.replace(route('usuarios').url(), { data: { search: search } })
            }, 250)
        });
    }

    //obtiene el usuario y abre el modal
    function getUser(id) {
        Inertia.reload(
            {
                only: ['user'],
                data: { user: id },
                onSuccess: ({ props }) => {
                    const elem = document.getElementById('modalInfoAlumno');
                    const instance = M.Modal.init(elem, { dismissible: false });
                    M.updateTextFields();
                    instance.open();
                }
            }
        )
    }

    useEffect(() => {
        initializeMat();
    }, [])

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
                                    <div className="col filter-div">
                                        {/* Dropdown Structure */}
                                        <a className="dropdown-trigger" href="#!" data-target="dropdown-filter"><i className="material-icons">filter_alt</i></a>
                                        <ul id="dropdown-filter" className="dropdown-content" style={{ top: "0px" }}>
                                            <li><a href="#!" className="selected">one</a></li>
                                            <li><a href="#!">two</a></li>
                                            <li><a href="#!">three</a></li>
                                        </ul>
                                    </div>
                                    <div className="input-field col s11">
                                        <input id="search" type="search" onChange={changeName} />
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </div>
                            </nav>
                            <table className="striped userTable responsive-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <a href="">
                                                <div>
                                                    MATRÍCULA
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d="M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z" /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="">
                                                <div>
                                                    ROL
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d="M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z" /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="">
                                                <div>
                                                    NOMBRE
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d="M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z" /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="">
                                                <div>
                                                    UNIDAD
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d="M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z" /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a href="">
                                                <div>
                                                    CATEGORÍA
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d="M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z" /></svg>
                                            </a>
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.data.length > 0 && users.data.map(user => (
                                        <tr key={user.id} onClick={() => getUser(user.id)}>
                                            <td>{user.matricula}</td>
                                            <td>{/*user.roles['0'].name*/}Es admin</td>
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
                                    <Paginacion links={users.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FlotanteAyuda />
            <InfoAlumno user={user} />
        </>
    )
}

Usuarios.layout = page => <Layout children={page} title="Escuela Sindical - Usuarios" pageTitle="USUARIOS" />

export default Usuarios