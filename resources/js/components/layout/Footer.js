import React from 'react';

import Logo from '../../../../public/images/dragonBlanco1.png'

export default function Footer(){
return(
    <div>
        {/* footer de la pagina */}
        <div className="footer-copyright center-align">
            <div style={{"color":"#707070"},{"marginBottom":"20px"}}>
                © 2021 Escuela Sindical   |   Desarrollado por DragonWare <img src={Logo} alt="logo"/>
            </div>
            
        </div>
    </div>
  );
}