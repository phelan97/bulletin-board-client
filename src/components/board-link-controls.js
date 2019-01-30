import React from 'react';
import {withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import onClickOutside from "react-onclickoutside";
import {EDIT_BOARD} from '../graphql/mutations';
import {FaEdit} from 'react-icons/fa';
import EditableTitle from './editable-title';
import './board-link-controls.css';

class BoardLinkControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      titleValue: this.props.startingTitleValue
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({titleValue: e.target.value});
  }

  handleKeyDown(e) {
    if(e.key === 'Enter') {
      this.stopEditing();
    }
  }

  handleClickOutside(e) {
    this.stopEditing();
  }

  stopEditing() {
    this.setState({editing: false});
    this.handleRename();
  }

  handleRename() {
    this.props.client.mutate({
      mutation: EDIT_BOARD,
      variables: {boardId: this.props.linkedBoardId, title: this.state.titleValue}
    });
  }
  render() {
    let titleElement = (
      <EditableTitle
        editing={this.state.editing}
        value={this.state.titleValue}
        onChange={this.handleChange}
      />
    )
    // wrap in a link if not editing
    if(!this.state.editing) {
      titleElement = (
        <Link to={`/board/${this.props.linkedBoardId}`}>
          {titleElement}
        </Link>
      );
    }
    return (
      <div className="title-region"
        onKeyDown={this.handleKeyDown}
      >
        {titleElement}
        <button 
          className="button-edit-title"
          onClick={() => this.setState({editing: true})}
        >
          <FaEdit className="icon-edit"/>
        </button>
      </div>
    )
  }
}

export default withApollo(onClickOutside(BoardLinkControls));