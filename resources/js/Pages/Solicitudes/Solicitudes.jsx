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

const Solicitudes = () => {
  
    useEffect(() => {
        materialize();
    }, [])

    function getSolicitud(id) {
        // esta ruta no es jsjs
        Inertia.get(route('usuarios.edit', id))
    }

        return (
            <>

            <div className="row contenedor">
                <div className="col contenedor s12">
                    <div className="card darken-1 cardUsers">
                        <div className="card-content">
                            <span className="card-title">Solicitudes al sistema</span>
                            <Alertas/>
                            <nav className="searchUsers">
                                <div className="nav-wrapper nav-busqueda">
                                    <div className="col filter-div">
                                        {/* Dropdown Structure */}
                                        <a className="dropdown-trigger" href="#!" data-target="dropdown-filter"><i className="material-icons">filter_alt</i></a>
                                        <ul id="dropdown-filter" className="dropdown-content" style={{ top: "0px" }}>
                                            {/* <li><a onClick={() => { filter("filter") }} className={request.filter == "filter" ? "selected" : ""}>Matrícula</a></li>
                                            <li><a onClick={() => { filter("unidad") }} className={request.filter == "unidad" ? "selected" : ""}>Unidad</a></li> */}
                                            <li><a >Matricula</a></li>
                                            <li><a >Usuario</a></li>
                                            <li><a >Tipo de solicitud</a></li>
                                            <li><a >Estatus</a></li>
                                        </ul>
                                    </div>
                                    <div className="input-field col s11" style={{ marginLeft: "0px" }}>
                                        {/* <input id="user_search" type="search" onChange={changeName} autoComplete="off" /> */}
                                        <input id="user_search" type="search" autoComplete="off" />
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </div>
                            </nav>
                            <table className="striped userTable responsive-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <a >
                                                <div>
                                                    MATRÍCULA
                                                </div>
                                            </a>
                                        </th>

                                        <th>
                                            <a >
                                                <div>
                                                    USUARIO
                                                </div>
                                            </a>
                                        </th>

                                        <th>
                                            <a >
                                                <div>
                                                    TIPO DE SOLICITUD
                                                </div>
                                            </a>
                                        </th>

                                        <th>
                                            <a >
                                                <div>
                                                    ESTATUS
                                                </div>
                                            </a>
                                        </th>

                                        <th>
                                            <a >
                                                <div>
                                                    FECHA
                                                </div>
                                            </a>
                                        </th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* {solicitudes.data.length > 0 && solicitudes.data.map(solicitudes, index => ( */}
                                        {/* <tr style={{"cursor":"pointer"}} key={solicitudes.id} onClick={() => getSolicitud(solicitudes.id)}> */}
                                        <tr style={{"cursor":"pointer"}}>
                                            <td>17121037</td>
                                            <td>Oscar Andre Huerta...</td>
                                            <td>Baja del cursor</td>
                                            <td>Sin revisar</td>
                                            <td>05/05/2021</td>
                                            <td><button ><i className="material-icons tiny" style={{"color":"#134E39"}}>edit</i> </button></td>
                                        </tr>
                                    {/* ))} */}
                                </tbody>
                            </table>

                            <div className="row">
                                <div className="col s12 center-align">
                                    {/* <Paginacion links={solicitudes.links} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

Solicitudes.layout = page => <Layout children={page} title="Solicitudes" pageTitle="SOLICITUDES"/>

export default Solicitudes