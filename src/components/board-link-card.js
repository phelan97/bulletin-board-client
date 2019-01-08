import React from 'react';
import {Link} from 'react-router-dom';

const BoardLinkCard = (props) => (
  <Link to={`/board/${props.id}`}>
    <div key={props.id}>
      <h3>{props.title}</h3>
    </div>
  </Link>
);

export default BoardLinkCard;