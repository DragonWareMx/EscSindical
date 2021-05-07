import React from 'react'

const Create3 = ({ change, values }) => {
    return (
        <div>
           <label>Descripción breve del curso</label>
           <input type='text' id="descripcion" value={values.descripcion} onChange={change}/>
           <label>Imágenes del curso</label>
           <input type= 'text' id="imgs" value={values.imgs} onChange={change}/>
           <label>Anterior</label>
           <button type="submit">Agregar</button>
        </div>
    )
       
}

export default Create3