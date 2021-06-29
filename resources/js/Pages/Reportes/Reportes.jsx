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

const Reportes = ({reportes, request}) => {

    //iconos de sort asc y desc
    const iconASC = "M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"
    const iconDESC = "M6 2l-6 8h4v12h4v-12h4l-6-8zm11.694.003h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"
  
    const [state, setState] = useState({
        typingTimeout: 0,
        sortMatricula: true,
        sortUsuario: true,
        sortMotivo: true,
        sortEstatus: true,
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
                    reporte_search: search
                }
                if (request.filter)
                data.filter = request.filter
                Inertia.replace(route('reportes').url(), { data: data })
            }, 250)
        });
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

                if (request.reporte_search)
                    data.reporte_search = request.reporte_search

                Inertia.replace(route('reportes').url(),
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

                if (request.reporte_search)
                    data.reporte_search = request.reporte_search

                Inertia.replace(route('reportes').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "comentario":
                //se inicializan los datos del request
                data = {
                    filter: "comentario"
                }

                if (request.reporte_search)
                    data.reporte_search = request.reporte_search

                Inertia.replace(route('reportes').url(),
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
                        sortUsuario: true,
                        sortMotivo: true,
                        sortEstatus: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: !state.sortMatricula,
                        sortUsuario: true,
                        sortMotivo: true,
                        sortEstatus: true,
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

                if (request.reporte_search)
                     data.reporte_search = request.reporte_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('reportes').url(),
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
                        sortUsuario: true,
                        sortMotivo: true,
                        sortEstatus: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortUsuario: !state.sortUsuario,
                        sortMotivo: true,
                        sortEstatus: true,
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

                if (request.reporte_search)
                     data.reporte_search = request.reporte_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('reportes').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "motivo":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortUsuario: true,
                        sortMotivo: true,
                        sortEstatus: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortUsuario: true,
                        sortMotivo: !state.sortMotivo,
                        sortEstatus: true,
                    })
                    )

                //se inicializan los datos del request
                data = {
                    sort: "motivo"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if (!state.sortMotivo)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.reporte_search)
                     data.reporte_search = request.reporte_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('reportes').url(),
                    {
                        data: data,
                        preserveScroll: true,
                        preserveState: true,
                    })
                break;
            case "estatus":
                //si no hay order en el request entonces el orden es de AZ
                if (!request.order)
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortUsuario: true,
                        sortMotivo: true,
                        sortEstatus: true,
                    })
                    )
                else
                    setState(state => ({
                        ...state,
                        sortMatricula: true,
                        sortUsuario: true,
                        sortMotivo: true,
                        sortEstatus: !state.sortEstatus,
                    })
                    )

                //se inicializan los datos del request
                data = {
                    sort: "estatus"
                }

                //state.sortMatricula debe ir negado porque el state no se ha actualizado en este momento
                if (!state.sortEstatus)
                    data.order = "asc"
                else
                    data.order = "desc"

                if (request.reporte_search)
                     data.reporte_search = request.reporte_search

                if (request.filter)
                    data.filter = request.filter

                Inertia.replace(route('reportes').url(),
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




    useEffect(() => {
        materialize();
    }, [])

    function getReport(id) {
        Inertia.get(route('VerReportes', id))
    }

        return (
            <>

            <div className="row contenedor">
                <div className="col contenedor s12">
                    <div className="card darken-1 cardUsers">
                        <div className="card-content">
                            <span className="card-title">Reportes de usuarios</span>
                            <Alertas/>
                            <nav className="searchUsers">
                                <div className="nav-wrapper nav-busqueda">
                                    <div className="col filter-div">
                                        {/* Dropdown Structure */}
                                        <a className="dropdown-trigger" href="#!" data-target="dropdown-filter"><i className="material-icons">filter_alt</i></a>
                                        <ul id="dropdown-filter" className="dropdown-content" style={{ top: "0px" }}>
                                            <li><a onClick={() => { filter("matricula") }} className={request.filter == "matricula" ? "selected" : ""}>Matrícula</a></li>
                                            <li><a onClick={() => { filter("usuario") }} className={request.hasOwnProperty('filter') ? request.filter == "usuario" ? "selected" : "" : "selected"}>Usuario</a></li>
                                            <li><a onClick={() => { filter("comentario") }} className={request.filter == "comentario" ? "selected" : ""}>Motivo</a></li>
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
                                                    USUARIO REPORTADO
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
                                            <a onClick={() => { sort("motivo") }} style={{ cursor: "pointer", userSelect: "none" }} className={request.sort == "motivo" && request.order ? "icon-active" : ""}>
                                                <div>
                                                    MOTIVO
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path d={
                                                    request.sort ?
                                                        request.sort == "motivo" ?
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
                                        
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                {reportes && reportes.data.length > 0 && reportes.data.map(reporte=>(
                                    <tr style={{"cursor":"pointer"}} key={reporte.id} onClick={() => getReport(reporte.id)}>
                                        <td>{reporte.matricula}</td>
                                        <td>{reporte.nombre}</td>
                                        <td>{reporte.comentario}</td>
                                        <td>{reporte.status == 0 ? 'Sin revisar' : 'Revisado'}</td>
                                        <td><button ><i className="material-icons tiny" style={{"color":"#134E39"}}>edit</i> </button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="row">
                                <div className="col s12 center-align">
                                    <Paginacion links={reportes.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

Reportes.layout = page => <Layout children={page} title="Reportes" pageTitle="REPORTES"/>

export default Reportes