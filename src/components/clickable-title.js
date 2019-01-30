import React from 'react';
import EditableTitle from './editable-title';
import './clickable-title.css';

class ClickableTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      titleValue: this.props.startingValue
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
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
    if(!this.state.titleValue) {
      this.setState({titleValue: this.props.startingValue});
    }

    this.setState({editing: false});

    if(this.state.titleValue !== this.props.startingValue) {
      this.props.onRename(this.state.titleValue);
    }
  }

  handleTitleChange(e) {
    this.setState({titleValue: e.target.value})
  }

  render() {
    return (
      <span className="list-title"
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >
        <EditableTitle
          value={this.state.titleValue}
          editing={this.state.editing}
          onChange={this.handleTitleChange}
        />
      </span>
    );
  }
}

export default ClickableTitle;