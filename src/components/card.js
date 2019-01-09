import React from 'react';
import './card-item.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false
    }
  }

  handleMouseHover() {
    this.setState({isHovering: !this.state.isHovering});
  }
  render() {
    return (
      <div className="card-item"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <span>{this.props.content}</span>
        {this.state.isHovering &&
          <div className="edit-controls">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        }
      </div>
    )
  }
}

export default Card;