import React, { useEffect } from 'react';

import MenuLateral from '../components/layout/MenuLateral';
import BarraBusqueda from '../components/layout/BarraBusqueda';

export default function Layout({ title, pageTitle, children }) {
    useEffect(() => {
        document.title = title;
    }, [title])

    return(
        <React.Fragment>
            <BarraBusqueda /> 
                {/* contenido */}
                <div className="content">
                    <div className="row page-title">
                        <div className="col">
                            {pageTitle}
                        </div>
                    </div>
                    {children}
                </div>
            <MenuLateral />
        </React.Fragment>
    )
}