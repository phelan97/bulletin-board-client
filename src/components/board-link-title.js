import React from 'react';
import EditableTitle from './editable-title';

class BoardLinkTitle extends React.Component {
  state = {
    editing: false
  }

  render() {
    return (
      <EditableTitle editing={this.state.editing} />
    )
  }
}