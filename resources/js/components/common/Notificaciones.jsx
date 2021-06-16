import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default function Notificaciones({ }) {
    const { notif } = usePage().props;

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

    return (
        <>
            <a href="#">
                <i className="material-icons icono-notificaciones">notifications</i>
                {notif && Object.keys(notif).length > 0 &&
                    <div style={sStyle}>{Object.keys(notif).length}</div>
                }
            </a>
        </>
    )
}