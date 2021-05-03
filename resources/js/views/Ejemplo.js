import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Ejemplo(){
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ejemplo')
        .then(response => {
            setData(response.data)
        })
    }, [])

    return(
        <div>
            <h1>hola soy un ejemplo xd</h1>
            {
                data.map(row => {
                    return(
                        <h2>
                        {row.nombre}
                        </h2>
                    )
                })
            }
        </div>
    );
}