import React, { useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import route from 'ziggy-js'


export default function Tag({nombre}) {
    return (
        <InertiaLink className="div-tag" href={route('cursosBuscar')} data={{ busqueda: nombre }}>
            {nombre} <i className="material-icons" style={{ "fontSize": "12px" }}>local_offer</i>
        </InertiaLink>
    )
}