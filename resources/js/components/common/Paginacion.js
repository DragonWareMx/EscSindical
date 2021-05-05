import { InertiaLink } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react';
//import circlesImg from '../images/circles.png'
//import emptyImg from '../images/empty.png'
//import './styles/Card.css'

const Paginacion = ({links}) => {
    if(links.length > 3){
        return (
            <ul className="pagination">
                {
                    links.map((link, index) => (
                        <li className={link.active ? "active" : link.url ? "waves-effect" : "disabled"} key={index}>
                            <InertiaLink href={link.url ?? "#"} preserveState>{
                            isNaN(link.label) ? 
                                index == 0 ? <i className="material-icons">chevron_left</i> 
                                : index != links.length-1 ? "..."
                                    : <i className="material-icons">chevron_right</i> 
                            : link.label}</InertiaLink>
                        </li>
                    ))
                }
            </ul>
        )
    }
    else
    {
        return (<></>)
    }
}

export default Paginacion
