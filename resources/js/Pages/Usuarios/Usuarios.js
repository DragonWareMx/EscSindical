import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';

//componentes
import Paginacion from '../../components/common/Paginacion';
import Alertas from '../../components/common/Alertas';

//estilos
import '../../styles/usersStyle.css'


const Usuarios = ({ users, request }) => {
    //iconos de sort asc y desc
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
        newUser: true
    })
    
    //realiza la búsqueda cada vez que se escribe en el input
    function changeName(event) {
        if (state.typingTimeout) {
            clearTimeout(state.typingTimeout);
        }
        
        let search = event.target.value
        let data;
        
        setState({
            typingTimeout: setTimeout(function () {
                data = {
                    user_search: search
                }
                if (request.filter)
                data.filter = request.filter
                Inertia.replace(route('usuarios').url(), { data: data })
            }, 250)
        });
    }
    
    //sort de la tabla
    function sort(campo) {
        let data;
        switch (campo) {
            case "matricula":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
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
                if (!state.sortMatricula)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "rol":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
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
                if (!state.sortRol)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "nombre":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
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
                if (!state.sortNombre)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "unidad":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
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
                if (!state.sortUnidad)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "categoria":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
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
                if (!state.sortCategoria)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;

            default:
                break;
        }
    }

    //filtros de busqueda
    function filter(filtro) {
        state.filter = filtro
        let data
        switch (filtro) {
            case "matricula":
                //se inicializan los datos del request
                data = {
                    filter: "matricula"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "rol":
                //se inicializan los datos del request
                data = {
                    filter: "rol"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "nombre":
                //se inicializan los datos del request
                data = {
                    filter: "nombre"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "unidad":
                //se inicializan los datos del request
                data = {
                    filter: "unidad"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "categoria":
                //se inicializan los datos del request
                data = {
                    filter: "categoria"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "eliminado":
                //se inicializan los datos del request
                data = {
                    filter: "eliminado"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('usuarios').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;

            default:
                break;
        }
    }

    //onClick de cada elemento de la tabla, obtiene el usuario y abre el modal para editar usuario
    function getUser(id) {
        Inertia.get(route('usuarios.edit', id))
    }

    //inicializa Materialize
    function initializeMat() {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    }

    //se ejecuta cuando se monta el componente, inicializa materialize y el buscador
    useEffect(() => {
        initializeMat();

        //si hay una busqueda en el url se pone en el input
        if (request.user_search) {
            const elem = document.getElementById('user_search');
            elem.value = request.user_search;
        }
    }, [])

    return (
        <>
            <div className="row contenedor">
                <div className="col contenedor s12">
                    <div className="card darken-1 cardUsers">
                        <InertiaLink className="btn-floating btn-large waves-effect waves-light green-sind button-addUser" href={route('usuarios.create')}><i className="material-icons">add</i></InertiaLink>
                        <div className="card-content">
                            <span className="card-title">Usuarios</span>
                            <Alertas/>
                            <nav className="searchUsers">
                                <div className="nav-wrapper nav-busqueda">
                                    <div className="col filter-div">
                                        {/* Dropdown Structure */}
                                        <a className="dropdown-trigger" href="#!" data-target="dropdown-filter"><i className="material-icons">filter_alt</i></a>
                                        <ul id="dropdown-filter" className="dropdown-content" style={{ top: "0px" }}>
                                            <li><a onClick={() => { filter("matricula") }} className={request.filter == "matricula" ? "selected" : ""}>Matrícula</a></li>
                                            <li><a onClick={() => { filter("rol") }} className={request.filter == "rol" ? "selected" : ""}>Rol</a></li>
                                            <li><a onClick={() => { filter("nombre") }} className={request.hasOwnProperty('filter') ? request.filter == "nombre" ? "selected" : "" : "selected"}>Nombre</a></li>
                                            <li><a onClick={() => { filter("unidad") }} className={request.filter == "unidad" ? "selected" : ""}>Unidad</a></li>
                                            <li><a onClick={() => { filter("categoria") }} className={request.filter == "categoria" ? "selected" : ""}>Categoría</a></li>
                                            <li><a onClick={() => { filter("eliminado") }} className={request.filter == "eliminado" ? "selected" : ""}>Eliminado</a></li>
                                        </ul>
                                    </div>
                                    <div className="input-field col s11" style={{ marginLeft: "0px" }}>
                                        <input id="user_search" type="search" onChange={changeName} autoComplete="off" />
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </div>
                            </nav>
                            <table className="striped userTable responsive-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <a onClick={() => { sort("matricula") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "matricula" && request.order ? "icon-active" : ""}>
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
                                            <a onClick={() => { sort("rol") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "rol" && request.order ? "icon-active" : ""}>
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
                                            <a onClick={() => { sort("nombre") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "nombre" && request.order ? "icon-active" : ""}>
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
                                            <a onClick={() => { sort("unidad") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "unidad" && request.order ? "icon-active" : ""}>
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
                                            <a onClick={() => { sort("categoria") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "categoria" && request.order ? "icon-active" : ""}>
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
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.data.length > 0 && users.data.map(usuario => (
                                        <tr style={{"cursor":"pointer"}} key={usuario.id} onClick={() => getUser(usuario.id)}>
                                            <td>{usuario.matricula}</td>
                                            <td>{usuario.roles && usuario.roles.length > 0 ? usuario.roles.map(rol => (rol.name + " ")) : "Sin Rol"}</td>
                                            <td>{usuario.nombre} {usuario.apellido_p} {usuario.apellido_m}</td>
                                            <td>{usuario.unit ? usuario.unit.nombre : "Sin unidad"}</td>
                                            <td>{usuario.category ? usuario.category.nombre : "Sin Categoría"}</td>
                                            <td><button><i className="material-icons">edit</i> </button></td>
                                            {/*<td>
                                        <InertiaLink href={`/users/${user.id}/edit`}>Edit</InertiaLink>
                                    </td>*/}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="row">
                                <div className="col s12 center-align">
                                    <Paginacion links={users.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Usuarios.layout = page => <Layout children={page} title="Escuela Sindical - Usuarios" pageTitle="USUARIOS" />

export default Usuarios