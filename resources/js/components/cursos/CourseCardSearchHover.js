import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../styles/cursos.css'
import '/css/courseCardSearch.css'

export default class CourseCardSearchHover extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    return (
      <div>
        {/* CUERPO DEL CARD */}
        <div
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
        >
            <div className="col s12 orange">
                <div className="card blue">
                    {/* Imagen del curso */}
                    <div className="col s12 course-image-container center-align">
                        <img src="/images/monita.jpg" alt="imagen del curso" className="course-image" />
                        {/* <img className="course-image" src={curso.first_image.length > 0 ? '/storage/imagenes_curso/' + curso.first_image[0].imagen : '/storage/imagenes_curso/default.png'} alt="img" /> */}
                    </div>
                    <div className="card-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quidem architecto atque totam culpa mollitia vel quas modi dolore eligendi labore, fugiat libero, suscipit impedit ratione maiores enim. Aut, esse.
                    </div>
                </div>
            </div>
          {/*  */}
        </div>

        {/* HOVER */}
        {this.state.isHovering && 
            <div 
                onMouseEnter={this.handleMouseHover} 
                onMouseLeave={this.handleMouseHover}
                style={{"position":"relative","left":"0px"}}
            >
                <div className="col s12 hover-container">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus quae ipsum laudantium id, quibusdam natus, reiciendis provident voluptate, ducimus consectetur ea temporibus sunt? Nam laudantium eius unde praesentium distinctio!
                </div>
                {/* Hovering right meow! 🐱 xdxd */}
            </div>
        }
        
      </div>
    );
  }
}

// render(<CourseCardSearchHover />, document.getElementById('root'));