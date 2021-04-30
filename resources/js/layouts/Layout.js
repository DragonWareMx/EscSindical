import React from 'react';

import MenuLateral from '../components/layout/MenuLateral';
import BarraBusqueda from '../components/layout/BarraBusqueda';

export default function Layout({ children }) {
    return(
        <React.Fragment>
            <BarraBusqueda /> 
                <div>
                    {children}
                </div>  
            <MenuLateral />
        </React.Fragment>
    )
}