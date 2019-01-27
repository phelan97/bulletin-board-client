import React from 'react';
import './editable-title.css';

class EditableTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      input: this.props.text
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.titleInput = React.createRef();
  }

  componentDidUpdate() {
    if(this.state.editing) {
      this.titleInput.current.focus();
    }
  }

  handleClick() {
    this.setState({editing: true});
  }

  handleKeyDown(e) {
    if(e.key === 'Enter') {
      this.dismiss();
    }
  }

  handleBlur() {
    this.dismiss();
  }

  dismiss() {
    this.setState({editing: false});
    if(this.state.title !== this.props.text) {
      this.props.onRename(this.state.input);
    }
  }
  render() {
    return (
      <span className="list-title"
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >
        {
          this.state.editing ? 
            <input type="text"
              value={this.state.input}
              ref={this.titleInput}
              onChange={e => this.setState({input: e.target.value})}>
            </input>
          :
            <h3>{this.state.input}</h3>
        }
      </span>
    );
  }
}

export default EditableTitle;