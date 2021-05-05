import React from 'react'

const Create1 = ({ change, values }) => {
    return (
        <div>
            <label>Nombre del curso</label>
            <input type="text" id="nombre" value={values.nombre} onChange={change}/>

            <label>Tags de búsqueda</label>
            <input type="text" id="tags" value={values.tags} onChange={change}/>

            <label>Fecha de inicio de curso</label>
            <input type="date" id="dateIni" value={values.dateIni} onChange={change}/>

            <label>Fecha de término de curso</label>
            <input type="date" id="dateFin" value={values.dateFin} onChange={change}/>

            <label>Link de videoconferencias</label>
            <input type="url" id="link" value={values.link} onChange={change}/>
            
            <label>Valor curricular</label>
            <input type="hidden" id="vc" value={values.vc} onChange={change}/>

            {/*falta lo de los horarios  */}
            <label>Siguiente</label>
        </div>
    )
       
}

export default Create1