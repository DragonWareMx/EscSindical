import React, {useEffect} from 'react'
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

    const { auth } = usePage().props;

    function initializeMaterialize(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }

    useEffect(() => {
        initializeMaterialize();
      }, [])


  return (
    <>
        <div className="row">
            <div className="col s12 m9 l10 xl10 titulo-modulo left" style={{"marginTop":"15px"}}>CALIFICACIONES</div>
            <form name="form_calif">
                <table className="col s12 striped responsive-table table-entregas">
                    <thead>
                    <tr>
                        <th>ESTUDIANTE</th>
                        <th>MÓDULO 1</th>
                        <th>MÓDULO 2</th>
                        <th>MÓDULO 2</th>
                        <th>FINAL</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={"/img/avatar1.png"} className="img-td-entregas" />Oscar André Huerta...</td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td> 
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                    </tr>
                    <tr>
                        <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={"/img/avatar2.png"} className="img-td-entregas" />José Agustín Aguilar...</td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                    </tr>
                    <tr>
                        <td style={{"fontSize":"14px", "color":"#1E1E1E","display":"flex","alignItems":"center"}}><img src={"/img/avatar3.png"} className="img-td-entregas" />Leopoldo Fernando...</td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                        <td><input type="number" className="inputs-calif" min="0" disabled /></td>
                    </tr>
                    </tbody>
                </table>
            </form>


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