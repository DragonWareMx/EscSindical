import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import '/css/alertas.css'
import { usePage } from '@inertiajs/inertia-react'


export default function Alertas() {
    const {flash}=usePage().props
    console.log(flash)
    return (
        <div>
        <ul>
            {flash.error &&  
               
                <li className="alert_error row">
                    <div className="col s11">{flash.error}</div>
                    <div><i className="col s1 tiny material-icons">clear</i></div>
                </li>
            }
            {flash.success &&  
               
               <li className="alert_sucess row">
                   <div className="col s11">{flash.success}</div>
                   <div><i className="col s1 tiny material-icons">clear</i></div>
               </li>
           }
           {flash.message &&  
               
               <li className="alert_message row">
                   <div className="col s11">{flash.message}</div>
                   <div><i className="col s1 tiny material-icons">clear</i></div>
               </li>
           }
        </ul>  
        </div>
    )
}