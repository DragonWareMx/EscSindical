import React from 'react';

import ProfilePic from '../../../../public/imgPrueba/profile.jpg'

export default function BarraBusqueda(){
return(
    <div>
        {/* bara de busqueda superior */}
        <div className="main-bar">
        {/* Parte izquierda de la barra superior */}
        <form action="#" method="post" className="main-bar-search">
        <i className="small material-icons" style={{color: '#FFFFFF'}}>search</i>
        <input type="text" className="main-bar-input" placeholder="Ingresa tu búsqueda" />
        </form>
        {/* Parte derecha de la barra superior*/}
        <div className="main-bar-right">
        <div className="main-bar-right-leftSide">
            <i className="small material-icons" style={{color: 'white'}}>backpack</i>
            <i className="small material-icons" style={{color: '#FFFFFF'}}>notifications_none</i>
        </div>
        <div className="main-bar-right-rightSide">
            <div className="main-username">Monse Jocabed Marín Piñón</div>
            <img className="main-userimage" src={ProfilePic} alt="" />
        </div>
        </div>
    </div>
    {/* background verde */}
    <div className="main-bar-background" />
  </div>
  );
}