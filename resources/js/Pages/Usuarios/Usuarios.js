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

const Usuarios = ({ users, user, request }) => {
    const iconASC = "M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"
    const iconDESC = "M6 2l-6 8h4v12h4v-12h4l-6-8zm11.694.003h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"
    const [state, setState] = useState({
        typingTimeout: 0,
        sortMatricula: true,
        sortRol: true,
        sortNombre: true,
        sortUnidad: true,
        sortCategoria: true,
        filter: "nombre",
    })

    //realiza la búsqueda cada vez que se escribe en el input
    function changeName(event) {
        if (state.typingTimeout) {
            clearTimeout(state.typingTimeout);
        }

        let search = event.target.value

        setState({
            typingTimeout: setTimeout(function () {
                Inertia.replace(route('usuarios').url(), { data: { user_search: search } })
            }, 250)
        });
    }

    function sort(campo){
        let data;
        switch (campo) {
            case "matricula":
                //si no hay order en el request entonces el orden es de AZ
                if(!request.order)
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                else
                    setState(state => ({
                            ...state, 
                            sortMatricula: !state.sortMatricula,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                
                //se inicializan los datos del request
                data = {
                    sort: "matricula"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if(!state.sortMatricula)
                    data.order = "asc"
                else
                    data.order = "desc"
                    
                if(request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(), 
                { 
                    data: data,
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (data2) => {
                        console.log(data2)
                    }
                })
                break;
            case "rol":
                //si no hay order en el request entonces el orden es de AZ
                if(!request.order)
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                else
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: !state.sortRol,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                
                //se inicializan los datos del request
                data = {
                    sort: "rol"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if(!state.sortRol)
                    data.order = "asc"
                else
                    data.order = "desc"
                    
                if(request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(), 
                { 
                    data: data,
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (data2) => {
                        console.log(data2)
                    }
                })
                break;
            case "nombre":
                //si no hay order en el request entonces el orden es de AZ
                if(!request.order)
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                else
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: !state.sortNombre,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                
                //se inicializan los datos del request
                data = {
                    sort: "nombre"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if(!state.sortNombre)
                    data.order = "asc"
                else
                    data.order = "desc"
                    
                if(request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(), 
                { 
                    data: data,
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (data2) => {
                        console.log(data2)
                    }
                })
                break;
            case "unidad":
                //si no hay order en el request entonces el orden es de AZ
                if(!request.order)
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                else
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: !state.sortUnidad,
                            sortCategoria: true,
                        })
                    )
                
                //se inicializan los datos del request
                data = {
                    sort: "unidad"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if(!state.sortUnidad)
                    data.order = "asc"
                else
                    data.order = "desc"
                    
                if(request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(), 
                { 
                    data: data,
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (data2) => {
                        console.log(data2)
                    }
                })
                break;
            case "categoria":
                //si no hay order en el request entonces el orden es de AZ
                if(!request.order)
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: true,
                        })
                    )
                else
                    setState(state => ({
                            ...state, 
                            sortMatricula: true,
                            sortRol: true,
                            sortNombre: true,
                            sortUnidad: true,
                            sortCategoria: !state.sortCategoria,
                        })
                    )
                
                //se inicializan los datos del request
                data = {
                    sort: "categoria"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if(!state.sortCategoria)
                    data.order = "asc"
                else
                    data.order = "desc"
                    
                if(request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(), 
                { 
                    data: data,
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (data2) => {
                        console.log(data2)
                    }
                })
                break;
        
            default:
                break;
        }
    }

    function filter(filtro){
        state.filter = filtro
    }

    //obtiene el usuario y abre el modal
    function getUser(id) {
        Inertia.reload(
            {
                only: ['user'],
                data: { user: id },
                onSuccess: ({ props }) => {
                    //busca el modal infoAlumno
                    const elem = document.getElementById('modalInfoAlumno');
                    const instance = M.Modal.init(elem, { dismissible: false });

                    //actualiza los textfields para que no se amontonen los labels
                    M.updateTextFields();

                    //abre el modal
                    instance.open();
                }
            }
        )
    }

    useEffect(() => {
        initializeMat();

        //si hay una busqueda en el url se pone en el input
        if(request.user_search){
            const elem = document.getElementById('user_search');
            elem.value = request.user_search;
        }
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
                                            <li><a onClick={() => {filter("matricula")}} className={request.filter == "matricula" ? "selected" : ""}>Matrícula</a></li>
                                            <li><a onClick={() => {filter("rol")}} className={request.filter == "rol" ? "selected" : ""}>Rol</a></li>
                                            <li><a onClick={() => {filter("nombre")}} className={request.filter == "nombre" || request.filter ? "selected" : ""}>Nombre</a></li>
                                            <li><a onClick={() => {filter("unidad")}} className={request.filter == "unidad" ? "selected" : ""}>Unidad</a></li>
                                            <li><a onClick={() => {filter("categoria")}} className={request.filter == "categoria" ? "selected" : ""}>Categoría</a></li>
                                            <li><a onClick={() => {filter("eliminado")}} className={request.filter == "eliminado" ? "selected" : ""}>Eliminado</a></li>
                                        </ul>
                                    </div>
                                    <div className="input-field col s11">
                                        <input id="user_search" type="search" onChange={changeName}/>
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </div>
                            </nav>
                            <table className="striped userTable responsive-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <a onClick={() => {sort("matricula")}} style={{cursor: "pointer", userSelect: "none"}} className={request.sort == "matricula" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    MATRÍCULA
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ? 
                                                        request.sort == "matricula" ? 
                                                            request.order ? 
                                                                request.order == "desc" ? iconDESC 
                                                                : iconASC
                                                            : iconASC 
                                                        : iconASC 
                                                    : iconASC
                                                } /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a onClick={() => {sort("rol")}} style={{cursor: "pointer", userSelect: "none"}} className={request.sort == "rol" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    ROL
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ? 
                                                        request.sort == "rol" ? 
                                                            request.order ? 
                                                                request.order == "desc" ? iconDESC 
                                                                : iconASC
                                                            : iconDESC 
                                                        : iconASC 
                                                    : iconASC
                                                } /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a onClick={() => {sort("nombre")}} style={{cursor: "pointer", userSelect: "none"}} className={request.sort == "nombre" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    NOMBRE
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ? 
                                                        request.sort == "nombre" ? 
                                                            request.order ? 
                                                                request.order == "desc" ? iconDESC 
                                                                : iconASC   
                                                            : iconDESC 
                                                        : iconASC 
                                                    : iconASC
                                                } /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a onClick={() => {sort("unidad")}} style={{cursor: "pointer", userSelect: "none"}} className={request.sort == "unidad" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    UNIDAD
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ? 
                                                        request.sort == "unidad" ? 
                                                            request.order ? 
                                                                request.order == "desc" ? iconDESC 
                                                                : iconASC
                                                            : iconDESC 
                                                        : iconASC 
                                                    : iconASC
                                                } /></svg>
                                            </a>
                                        </th>
                                        <th>
                                            <a onClick={() => {sort("categoria")}} style={{cursor: "pointer", userSelect: "none"}} className={request.sort == "categoria" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    CATEGORÍA
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ? 
                                                        request.sort == "categoria" ? 
                                                            request.order ? 
                                                                request.order == "desc" ? iconDESC 
                                                                : iconASC
                                                            : iconDESC 
                                                        : iconASC 
                                                    : iconASC
                                                } /></svg>
                                            </a>
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.data.length > 0 && users.data.map(usuario => (
                                        <tr key={usuario.id} onClick={() => getUser(usuario.id)}>
                                            <td>{usuario.matricula}</td>
                                            <td>{usuario.roles && usuario.roles.length > 0 ? usuario.roles.map(rol => (rol.name + " ")) : "Sin Rol"}</td>
                                            <td>{usuario.nombre} {usuario.apellido_p} {usuario.apellido_m}</td>
                                            <td>UMF80 - Morelia</td>
                                            <td>{usuario.categorie ? usuario.categorie.nombre : "Sin Categoría"}</td>
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