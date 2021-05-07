import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import Create1 from './Create1.js' 
import Create2 from './Create2.js' 
import Create3 from './Create3.js' 


const FormCurso = () => {
    
    const [values, setValues] = useState({
        nombre : "",
        tags : "",
        dateIni : "",
        dateFin : "",
        link : "",
        vc:0,
        categorias:"",
        active: false,
        inscIni:"",
        inscFin: "",
        tipo: "",
        descripcion: "",
        imgs: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/storeCourse', values)
    }

    
    return(
    <>
        <div>
            Agregar curso
        </div>      
        <div className="linea">
            <div className="circle">
                1 Generalidades
            </div>
            <div className="circle">
                1 Participantes
            </div>
            <div className="circle">
                1 Presentación
            </div>
        </div>
        <form onSubmit={handleSubmit}>
           <Create1 change = {handleChange} values = {useState}/>
           <Create2 change = {handleChange} values = {useState}/>
           <Create3 change = {handleChange} values = {useState}/>
        </form>
    </>
    )
}

export default FormCurso