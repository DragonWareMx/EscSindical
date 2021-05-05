import React from 'react'

const Create2 = ({ change, values }) => {
    return (
        <div>
            <label>Categorías de estudiante permitidas</label>
            <input type="text" id="categorias" value={values.categorias} onChange={change}/>

            <label>Activar fechas de inscripción </label>
            <input type="text" id="active" value={values.active} onChange={change}/>

            <label>Fecha de inicio de inscripciones</label>
            <input type="date" id="inscIni" value={values.inscIni} onChange={change}/>

            <label>Fecha de término de inscripciones</label>
            <input type="date" id="inscFin" value={values.inscFin} onChange={change}/>
            
            <label>Tipo de inscripción al curso</label>
            <input type="radio" id="auto" name="tipo" value={values.tipo} onChange={change} />
            <label htmlFor="auto">Automática</label>
            <input type="radio" id="solicitud" name="tipo" value={values.tipo} onChange={change}/>
            <label htmlFor="solicitud">Solicitud</label>
            <input type="radio" id="onlyMe" name="tipo" value={values.tipo} onChange={change}/>
            <label htmlFor="onlyMe">Sólo yo puedo inscribir participantes</label>
            
            <label>Anterior</label>
            <label>Siguiente</label>
        </div>
    )
       
}

export default Create2