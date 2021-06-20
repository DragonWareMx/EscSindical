import React, {useEffect, useState} from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react'

import '/css/asignaciones.css'
import route from 'ziggy-js';

function editar(){
    document.getElementById("btn-editar").style.display = "none";
    document.getElementById("div-btns-save").style.display = "flex";

    for (var i=0;i<document.form_calif.elements.length;i++)
        if(document.form_calif.elements[i].type == "number")
            document.form_calif.elements[i].disabled=false;
}
function cancelar(){
    document.getElementById("btn-editar").style.display = "block";
    document.getElementById("div-btns-save").style.display = "none";

    for (var i=0;i<document.form_calif.elements.length;i++)
        if(document.form_calif.elements[i].type == "number")
            document.form_calif.elements[i].disabled=true;
}

const Calificaciones = ({curso}) => {
    //valores para formulario
    //calificacion es una matriz, donde el primer valor es el id del usuario y el segundo valor es el id del modulo
    //calificaciones finales solo guarda el id del usuario
    const [values, setValues] = useState({
        calificacion: [[]],
        calificaciones_finales: []
    })

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    function initializeValues(){
        let copy = [...values.calificacion]
        if(curso.users && curso.users.length > 0 && curso.modules && curso.modules.length > 0){
            curso.users.forEach(user => {
              curso.modules.forEach(module => {
                  module.users.forEach(usuarioModulo => {
                      if(user.id == usuarioModulo.id){
                          if(usuarioModulo.pivot.calificacion || usuarioModulo.pivot.calificacion == 0){
                              console.log(usuarioModulo.pivot.calificacion)
                              copy[user.id] = [...copy, {[module.id]: usuarioModulo.pivot.calificacion}]
                            setValues(values => ({
                                ...values,
                                calificacion: [...values.calificacion, {[user.id]: {[module.id]: usuarioModulo.pivot.calificacion}}],
                            }))
                          }
                      }
                  });
              });
            })
        }
    }

    useEffect(() => {
        initializeMaterialize();
        initializeValues()
      }, [])

      useEffect(() => {
        console.log(values)
      }, [values])

    function handleChange(user, module, e){
        console.log(e)
    }

  return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{"marginTop":"15px"}}>CALIFICACIONES</div>
            <form name="form_calif">
                {curso && curso.users.length > 0 &&
                <table className="col s12 striped responsive-table table-entregas">
                    <thead>
                    <tr>
                        <th>ESTUDIANTE</th>
                        {curso.modules && curso.modules.length > 0 && curso.modules.map(module => (
                            <th>MÓDULO {module.numero}</th>
                        ))
                        }
                        <th>FINAL</th>
                    </tr>
                    </thead>

                    <tbody>
                        {curso.users.map(user => (
                            <tr>
                                <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={user.foto ? "/storage/fotos_perfil/"+user.foto : "/storage/fotos_perfil/avatar1.jpg"} className="img-td-entregas" />{user.nombre} {user.apellido_p} {user.apellido_m}</td>
                                
                                {curso.modules && curso.modules.length > 0 && curso.modules.map((module) => (
                                    <td><input type="number" className="inputs-calif" min="0" data-user={user.id} data-module={module.id} disabled value={values.calificacion[user.id] && values.calificacion[user.id][module.id] && values.calificacion[user.id][module.id]} onChange={e => {handleChange(user.id, module.id, e)}}/></td>
                                ))
                                }
                                
                                <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                }
            </form>


            {curso && curso.users.length > 0 &&
            <>
            <div className="col s12 right container-btns-as container-calif-btns paddingRight-0px" id="div-btns-save" style={{"display":"none"}}>
                <a className="no-uppercase" style={{"marginRight":"30px","fontWeight":"500","fontSize":"14px","lineHeight":"17px","color":"#8C8C8C","cursor":"pointer"}} onClick={cancelar}>
                    Cancelar
                </a>
                
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Guardar
                    <i className="material-icons right">save</i>
                </button>
            </div>

            <div className="col s12 right paddingRight-0px" id="btn-editar" onClick={editar}> 
                <button className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Editar
                    <i className="material-icons right">edit</i>
                </button>
            </div>
            </>
            }
            
            {curso && curso.users.length == 0 && 
                <div className="col s12 right paddingRight-0px">
                    No hay alumnos inscritos en el curso
                </div>
            }
            
        </div>
    </>
  )
}

Calificaciones.layout = page => (
  <Layout title="Escuela sindical - Curso" pageTitle="Calificaciones">
    <LayoutCursos children={page} />
  </Layout>
)

export default Calificaciones