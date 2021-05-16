import React, { Component } from 'react';
import { render } from 'react-dom';

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
        <div
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
          style={{'background-color':'green'}}
        >
          {/* CUERPO DEL CARD */}
            Hover me
          {/*  */}
        </div>

        {/* HOVER */}
        {this.state.isHovering && <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} style={{'background-color':'red'}}>Hovering right meow! 🐱 xdxd</div>}
        
      </div>
    );
  }
}

// render(<CourseCardSearchHover />, document.getElementById('root'));