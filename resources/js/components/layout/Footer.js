import React from 'react';

import Logo from '../../../../public/images/dragonBlanco1.png'

export default function Footer() {
    return (
        <div>
            {/* footer de la pagina */}
            <div className="footer-copyright center-align">
                <div style={{ "color": "#707070" }}>
                    © 2021 Formación XX Mich   |   <a href="www.dragonware.com.mx" target="_blank" style={{ color: "#707070" }}> Desarrollado por DragonWare <img src={Logo} alt="logo" /></a>
                </div>

            </div>
        </div>
    );
}