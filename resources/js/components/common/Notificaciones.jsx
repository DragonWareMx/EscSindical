import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default function Notificaciones({ }) {
    const { notif } = usePage().props;

    const sStyle = {
        fontSize: '11px',
        lineHeight: '11px',
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: 'rgb(16, 128, 88)',
        borderRadius: '50%',
        position: 'relative',
        bottom: '15px',
        right: '-15px',
        width: '15px',
        height: '15px',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: '2.5px 0px',
    };

    return (
        <>
            <a href="#">
                <i className="material-icons icono-notificaciones">notifications</i>
                <div style={sStyle}>32</div>
            </a>
        </>
    )
}