import React, {useEffect, useState} from 'react'
import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import { InertiaLink, useRemember } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react'

import '/css/asignaciones.css'
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import Alertas from '../../components/common/Alertas';

const Calificaciones = ({curso, request}) => {
    //errores de la validacion de laravel
    const { errors } = usePage().props

    //valores para formulario
    //calificacion es una matriz, donde el primer valor es el id del usuario y el segundo valor es el id del modulo
    //calificaciones finales solo guarda el id del usuario
    const [values, setValues] = useState({
        calificacion: [[]],
        calificacion_final: []
    })

    const [editar, setEditar] = useState(false)

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    //inicializa el state para las calificaciones
    function initializeValues(){
        //se inicializan solo si se tiene al menos un usuario y un modulo registrados en el curso
        if(curso.users && curso.users.length > 0 && curso.modules && curso.modules.length > 0){
            //se crea un json vacio de usuarios
            var users = {}
            
            //se crea un json vacio para las calificaciones finales
            var calificacionFinal = {}

            curso.users.forEach(user => {
                //se crea un json vacio de calificaciones
                var userModules = {}

                curso.modules.forEach(module => {
                    module.users.forEach(usuarioModulo => {
                        //si existe la relacion entre el usuario y el modulo
                        if(user.id == usuarioModulo.id){
                            //si existe la calificacion del usuario en el modulo
                            if(usuarioModulo.pivot.calificacion || usuarioModulo.pivot.calificacion == 0){
                                //se agrega el modulo en el json
                                userModules[module.id] = usuarioModulo.pivot.calificacion
                            }
                        }
                    });
                });

                //si el usuario tiene al menos un modulo se guarda en el arreglo de usuarios con sus calificaciones
                if(Object.keys(userModules).length > 0){
                    users[user.id] = userModules
                }

                curso.users.forEach(usuarioCurso => {
                    //si existe la relacion entre el usuario y el modulo
                    if(user.id == usuarioCurso.id){
                        //si existe la calificacion del usuario en el modulo
                        if(usuarioCurso.pivot.calificacion_final || usuarioCurso.pivot.calificacion_final == 0){
                            //se agrega el modulo en el json
                            calificacionFinal[user.id] = usuarioCurso.pivot.calificacion_final
                        }
                    }
                });
            })

            //si al menos un usuario tiene al menos una calificacion de modulo inicializamos la calificacion
            if(Object.keys(users).length > 0){
                setValues(values => ({
                    ...values,
                    calificacion: users,
                    calificacion_final: calificacionFinal
                }))
            }
        }
    }

    useEffect(() => {
        initializeMaterialize();
        initializeValues()
    }, [])

      function closeAlert(type){
        var divsToHide = document.getElementsByClassName(type); //divsToHide is an array
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.visibility = "hidden"; // or
            divsToHide[i].style.display = "none"; // depending on what you're doing
        }
    }

    function handleChange(user, module, e){
        var calificacion = values.calificacion
        const value = parseFloat(e.target.value)

        //si existe el usuario en el array de calificaciones
        if(calificacion[user]){
            //se agrega o actualiza la calificacion del modulo
            calificacion[user][module] = value
        }
        else{
            //se crea el json de modulos
            var modules = {[module]: value}
            //se crea la calificacion del usuario
            calificacion[user] = modules
        }
        
        setValues(values => ({
            ...values,
            calificacion: calificacion
        }))
    }

    function handleChangeCF(user, e){
        var calificacion_final = values.calificacion_final
        const value = parseFloat(e.target.value)

        //se crea o actualiza la calificacion final
        calificacion_final[user] = value
        
        setValues(values => ({
            ...values,
            calificacion_final: calificacion_final
        }))
    }

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        console.log("aver")
            Inertia.post(route('cursos.calificaciones.store', curso.id), values, {
                onSuccess: () => {
                    Inertia.visit(route('cursos.calificaciones.store', curso.id),{preserveScroll: true, preserveState: false});
                }
            })
    }

  return (
    <>
        <div className="row">
            {errors && Object.keys(errors).length > 0 && 
                <div className="col s12">
                    <div className="errores">
                        <ul>
                            <li className="alert_error">
                                <div className="col s11">Alguna calificación es incorrecta.</div>
                                <div onClick={() => {closeAlert('alert_error')}} style={{"cursor":"pointer"}}><i className="col s1 tiny material-icons">clear</i></div>
                            </li>
                        </ul>  
                    </div>
                </div>
            }
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{"marginTop":"15px"}}>CALIFICACIONES</div>
            <form name="form_calif" onSubmit={handleSubmit}>
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
                            <tr key={user.id}>
                                <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={user.foto ? "/storage/fotos_perfil/"+user.foto : "/storage/fotos_perfil/avatar1.jpg"} className="img-td-entregas" />{user.nombre} {user.apellido_p} {user.apellido_m}</td>
                                
                                {curso.modules && curso.modules.length > 0 && curso.modules.map((module) => (
                                    <td key={user.id + " " + module.id}><input type="number" className="inputs-calif" min="0" max="100" step={0.01} disabled={!editar} value={values.calificacion[user.id] && values.calificacion[user.id][module.id] && values.calificacion[user.id][module.id]} onChange={e => {handleChange(user.id, module.id, e)}} placeholder="-"/></td>
                                ))
                                }
                                <td><input type="number" className="inputs-calif" min="0" max="100" step={0.01} disabled={!editar} value={values.calificacion_final[user.id] && values.calificacion_final[user.id]} onChange={e => {handleChangeCF(user.id, e)}} placeholder="sin calificación"/></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                }

            {curso && curso.users.length > 0 &&
            <>
            {editar &&
            <div className="col s12 right container-btns-as container-calif-btns paddingRight-0px" id="div-btns-save">
                <a className="no-uppercase" style={{"marginRight":"30px","fontWeight":"500","fontSize":"14px","lineHeight":"17px","color":"#8C8C8C","cursor":"pointer"}} onClick={e => {setEditar(false); Inertia.visit(route('cursos.calificaciones.store', curso.id),{preserveScroll: true, preserveState: false});}}>
                    Cancelar
                </a>
                
                <button type="submit" className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Guardar
                    <i className="material-icons right">save</i>
                </button>
            </div>
            }

            {!editar &&
            <div className="col s12 right paddingRight-0px" id="btn-editar" onClick={e => {setEditar(true)}}> 
                <a className="btn-primary btn waves-effect waves-teal btn-login right no-uppercase" style={{"height": "40px"}}>
                    Editar
                    <i className="material-icons right">edit</i>
                </a>
            </div>
            }
            </>
            }
            </form>
            
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