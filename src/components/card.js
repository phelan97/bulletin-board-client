import React from 'react';
import {Mutation} from 'react-apollo';
import {DELETE_CARD} from '../graphql/mutations';
import {FaTrashAlt} from 'react-icons/fa';
import './card.css';

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
            {/* <button>Edit</button> */}
            <Mutation mutation={DELETE_CARD}
              variables={{cardId: this.props.id}}
              onCompleted={data => {
                this.props.refetch();
              }}>
              {(deleteCard, {error}) => {
                return (
                  <button className="delete-button" onClick={deleteCard}>
                    <FaTrashAlt />
                  </button>
                );
              }}
            </Mutation>
          </div>
        }
      </div>
    );
  }
}

export default Card;