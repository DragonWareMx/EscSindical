import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';

//COMPONENTS
import Alertas from '../../components/common/Alertas'; 
import Paginacion from '../../components/common/Paginacion';
// Hojas de estilos
import '../../styles/usersStyle.css'

function materialize(){
    var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
}

const SolicitudesAlumno = ({solicitudes, request}) => {
    //iconos de sort asc y desc
    const iconASC = "M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"
    const iconDESC = "M6 2l-6 8h4v12h4v-12h4l-6-8zm11.694.003h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"

    const [state, setState] = useState({
        typingTimeout: 0,
        sortMatricula: true,
        sortId: true,
        sortUsuario: true,
        sortCurso: true,
        sortFecha: true,
        filter: "usuario", //?
        newUser: true //?
    })

    function transformaFecha(fecha) {
        let dob
        if(fecha)
            dob = new Date(fecha.replace(/-/g, '\/').replace(/T.+/, ''));
        else
            dob = new Date()
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const day = dob.getDate();
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        let hour = ("0" + dob.getHours()).slice(-2);
        const minutes = ("0" + dob.getMinutes()).slice(-2);
        let formato

        if(hour > 12){
            hour = hour - 12
            formato = "pm"
        }
        else
            formato = "am"

        return `${day} de ${monthNames[monthIndex]} de ${year} a las ${hour}:${minutes} ${formato}`;
    }
    
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
                Inertia.replace(route('solicitudes.alumno').url(), { data: data })
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
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: !state.sortMatricula,
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: true,
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

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "id":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: !state.sortId,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: true,
                    })
                    )

                //se inicializan los datos del request
                data = {
                    sort: "id"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if (!state.sortId)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "usuario":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: true,
                        sortUsuario: !state.sortUsuario,
                        sortCurso: true,
                        sortFecha: true,
                    })
                    )

                //se inicializan los datos del request
                data = {
                    sort: "usuario"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if (!state.sortUsuario)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "curso":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: !state.sortCurso,
                        sortFecha: true,
                    })
                    )

                //se inicializan los datos del request
                data = {
                    sort: "curso"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if (!state.sortCurso)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.user_search)
                    data.user_search = request.user_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "fecha":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortId: true,
                        sortUsuario: true,
                        sortCurso: true,
                        sortFecha: !state.sortFecha,
                    })
                    )

                //se inicializan los datos del request
                data = {
                    sort: "fecha"
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

                Inertia.replace(route('solicitudes.alumno').url(),
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

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "estatus":
                //se inicializan los datos del request
                data = {
                    filter: "estatus"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "usuario":
                //se inicializan los datos del request
                data = {
                    filter: "usuario"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "curso":
                //se inicializan los datos del request
                data = {
                    filter: "curso"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('solicitudes.alumno').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            // case "fecha":
            //     //se inicializan los datos del request
            //     data = {
            //         filter: "fecha"
            //     }

            //     if (request.user_search)
            //         data.user_search = request.user_search

            //     Inertia.replace(route('solicitudes').url(),
            //         {
            //             data: data,
            //             preserveScroll: true,
            //             preserveState: true,
            //         })
            //     break;
            case "eliminado":
                //se inicializan los datos del request
                data = {
                    filter: "eliminado"
                }

                if (request.user_search)
                    data.user_search = request.user_search

                Inertia.replace(route('solicitudes.alumno').url(),
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
    function getSolicitud(id) {
        Inertia.get(route('verSolicitud', [id, 'drop']))
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
    
    ////////////////////////////////////////////7
    return (
            <>

            <div className="row contenedor">
                <div className="col contenedor s12">
                    <div className="card darken-1 cardUsers">
                        <InertiaLink className="btn-floating btn-large waves-effect waves-light green-sind button-addUser" href={route('solicitudes')}><i className="material-icons"><span class="material-icons-outlined">school</span></i></InertiaLink>
                        <div className="card-content">
                            <span className="card-title">Solicitudes al sistema (baja de curso)</span>
                            <Alertas/>
                            
                            <nav className="searchUsers">
                                <div className="nav-wrapper nav-busqueda">
                                    <div className="col filter-div">
                                        {/* Dropdown Structure */}
                                        <a className="dropdown-trigger" href="#!" data-target="dropdown-filter"><i className="material-icons">filter_alt</i></a>
                                        <ul id="dropdown-filter" className="dropdown-content" style={{ top: "0px" }}>
                                            <li><a onClick={() => { filter("matricula") }} className={request.filter == "matricula" ? "selected" : ""}>Matrícula</a></li>
                                            <li><a onClick={() => { filter("usuario") }} className={request.filter == "usuario" ? "selected" : ""}>Usuario</a></li> 
                                            <li><a onClick={() => { filter("estatus") }} className={request.filter == "estatus" ? "selected" : ""}>Estatus</a></li> 
                                            <li><a onClick={() => { filter("curso") }} className={request.filter == "curso" ? "selected" : ""}>Curso</a></li> 
                                            <li><a onClick={() => { filter("eliminado") }} className={request.filter == "eliminado" ? "selected" : ""}>Eliminados</a></li> 
                                            
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
                                            <a onClick={() => { sort("usuario") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "usuario" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    USUARIO
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ?
                                                        request.sort == "usuario" ?
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
                                            <a onClick={() => { sort("curso") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "curso" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    CURSO
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ?
                                                        request.sort == "curso" ?
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
                                            <a onClick={() => { sort("estatus") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "estatus" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    ESTATUS
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ?
                                                        request.sort == "estatus" ?
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
                                            <a onClick={() => { sort("fecha") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "fecha" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    FECHA
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ?
                                                        request.sort == "fecha" ?
                                                            request.order ?
                                                                request.order == "desc" ? iconDESC
                                                                    : iconASC
                                                                : iconASC
                                                            : iconASC
                                                        : iconASC
                                                } /></svg>
                                            </a>
                                        </th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {solicitudes.data.length > 0 && solicitudes.data.map(solicitud => (
                                        <tr style={{"cursor":"pointer"}} key={solicitud.id} onClick={() => getSolicitud(solicitud.id)}>
                                            <td>{solicitud.user.matricula}</td>
                                            <td>{solicitud.user.nombre} {solicitud.user.apellido_p} {solicitud.user.apellido_m} </td>
                                            <td>{solicitud.course ? solicitud.course.nombre : "Este curso fue eliminado, da click para más información" }</td>
                                            <td>{solicitud.status}</td>
                                            <td>{solicitud.created_at ? transformaFecha(solicitud.created_at) : "Sin fecha"}</td>
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
                                    <Paginacion links={solicitudes.links} /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

SolicitudesAlumno.layout = page => <Layout children={page} title="Solicitudes" pageTitle="SOLICITUDES"/>

export default SolicitudesAlumno