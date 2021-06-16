import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia'

import '/css/notificaciones.css'

export default function Notificaciones({ }) {
    const { notificat } = usePage().props;

    const sStyle = {
        fontSize: '11px',
        lineHeight: '11px',
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: '#ff3333',
        borderRadius: '50%',
        position: 'relative',
        bottom: '15px',
        right: '-15px',
        width: '16px',
        height: '16px',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: '3px 0px',
    };

    //valores para formulario
    const [values, setValues] = useState({
        _method: "post",
        notif: notificat,
    })

    var down = false;
    function toggleNotif() {
        var box = document.getElementById('box');
        if (down) {
            box.style.maxHeight = '0px';
            box.style.opacity = 0;
            down = false;
        } else {
            box.style.maxHeight = '300px';
            box.style.opacity = 1;
            down = true;
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const ruta = route('notif.vista', e.target.getAttribute("data-id")).urlBuilder.domain + "notificacion/vista/" + e.target.getAttribute("data-id")
        axios.post(ruta).then(response => {
            setValues(values => ({
                ...values,
                notif: response.data,
            })).catch(function (error) {
                setValues(values => ({
                    ...values
                }))
            });
        })
    }

    return (
        <>
            <a style={{ cursor: "pointer" }} id="icono-notif" onClick={toggleNotif}>
                <i className="material-icons icono-notificaciones" style={{ marginTop: "20px" }}>notifications</i>
                {values.notif && Object.keys(values.notif).length > 0 &&
                    <div style={sStyle}>{Object.keys(values.notif).length}</div>
                }
            </a>
            <div className="notifi-box" id="box">
                <h2>Notificaciones <span>{Object.keys(values.notif).length}</span> </h2>
                {values.notif && values.notif.length > 0 ? values.notif.map((not, index) => (
                    <div className="notifi-item" key={index}>
                        <div className="text">
                            <h4>{not.titulo}</h4>
                            {values.notif.link &&
                                <p >{values.notif.link}</p>
                            }
                        </div>
                        <div className="close">
                            <span className="material-icons" style={{ color: "gray", cursor: "pointer" }} data-id={not.id} onClick={handleSubmit}>
                                close
                            </span>
                        </div>
                    </div>
                )) :
                    <div className="notifi-item">
                        <div className="text">
                            <h4>No tienes ninguna notificación</h4>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}