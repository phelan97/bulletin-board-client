import React from 'react';
import {Mutation, withApollo} from 'react-apollo';
import {DELETE_CARD} from '../graphql/mutations';
import {FaTrashAlt} from 'react-icons/fa';
import './card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    }
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseOver() {
    this.setState({isHovering: true});
  }

  handleMouseLeave() {
    this.setState({isHovering: false});
  }
  render() {
    return (
      <div className="card-item"
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        draggable="true"
        onDragStart={(e) => {
          this.props.client.writeData({data: {draggedCard: this.props.data}});
          // e.dataTransfer.setData('application/json', JSON.stringify({cardId: this.props.id}))

        }}
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

export default withApollo(Card);