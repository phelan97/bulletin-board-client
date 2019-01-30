import React from 'react';

const EditableTitle = (props) => {
  let titleElement;
  if(props.editing) {
    titleElement = (
      <input type="text"
        value={props.value}
        onChange={props.onChange}
        autoFocus
      >
      </input>
    );
  } else {
    titleElement = <h3>{props.value}</h3>
  }

  return titleElement;
}

export default EditableTitle;