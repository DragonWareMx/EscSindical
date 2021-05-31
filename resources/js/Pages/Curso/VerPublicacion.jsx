import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';

import '/css/modulos.css'


function transformaFechaModulo(fecha) {
  const dob = new Date(fecha);
  const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const day = dob.getDate();
  const monthIndex = dob.getMonth();
  const year = dob.getFullYear();
  const hour = ("0" + dob.getHours()).slice(-2);
  const minutes = ("0" + dob.getMinutes()).slice(-2);
  return `${day} ${monthNames[monthIndex]} ${year} a las ${hour}:${minutes}`;
}

function getFileSize(archivo){
  alert(archivo.size)
  return 0
}

const Informacion = ({curso,entrada}) => {
  return (
    <>
      <div className="row">
        {entrada.tipo = "Aviso" &&
            <div>
                <div className="row">
                    {/* titulo e fecha de publicacion */}
                    <div className="col s11">
                        <div className="row valign-wrapper">
                        <div className="col s2 l1 center-align">
                            <i className="material-icons" style={{"color":"#D14747"}}>announcement</i>
                        </div>
                        <div className="col s10 l11" style={{"paddingLeft":"0px"}}>
                            <div className="col s12 advice-text">
                                {entrada.titulo}
                            </div>
                            <div className="col s12 posted-date">
                                Publicado el {transformaFechaModulo(entrada.created_at)} 
                            </div>
                        </div>


                        </div>
                    </div>
                    {/* icono con cantidad de comentarios */}
                    <div className="col s1">
                        <div className="row center-align">
                            <span>
                                <i className="material-icons" style={{"color":"#848484","fontSize":"13px"}}>comment</i>
                            </span>
                            <span style={{"color":"#848484","fontSize":"13px","marginLeft":"3px"}}>0</span>
                        </div>
                    </div>
                </div>
                
            </div>
        }
      </div>
    </>
  )
}

Informacion.layout = page => (
  <Layout title="Escuela sindical - Modulo" pageTitle="Modulo">
    <LayoutCursos children={page} />
  </Layout>
)

export default Informacion