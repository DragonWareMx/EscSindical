import React from 'react';
import ReactDOM from 'react-dom';
import ComponentePrueba from './ComponentePrueba'


function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">EEEEEEEEY SOY UN PUTO EJEMPLO de react</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render( 
        //<Example/>,
        //ReactDOM.render (componente, contenedor);
         <ComponentePrueba
             title="soy un título"
             description="soy una descripción"
         />,
        document.getElementById('example')
        
    );
}
