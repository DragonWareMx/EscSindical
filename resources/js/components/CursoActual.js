import React from 'react'
import ReactDom from 'react-dom'

//import circlesImg from '../images/circles.png'
//import emptyImg from '../images/empty.png'
//import './styles/Card.css'

class CursoActual extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="card ">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">MIS CURSOS<i class="material-icons right">more_vert</i></span>
                            <p><a href="#">MIS CURSOS</a></p>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default CursoActual