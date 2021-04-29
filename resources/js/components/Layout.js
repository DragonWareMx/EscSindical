import React from 'react';

import MenuLateral from './layout/MenuLateral';
import BarraBusqueda from './layout/BarraBusqueda';

export default function Layout(props){
    return(
      <React.Fragment> 
        <BarraBusqueda />
          
        {/* contenido */}
        <div className="content">
          {props.children}
        </div>

        <MenuLateral />
      </React.Fragment>
    );
}