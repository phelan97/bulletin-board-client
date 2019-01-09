import React from 'react';
import {Link} from 'react-router-dom';
import {Mutation} from 'react-apollo';
import {DELETE_BOARD} from '../graphql/mutations';
import './board-link-card.css';

const BoardLinkCard = (props) => (
    <div className="board-card" key={props.id}>
      <Link to={`/board/${props.id}`}>
        <h3>{props.title}</h3>
      </Link>
      <Mutation mutation={DELETE_BOARD} variables={{boardId: props.id}}
        onCompleted={data => {
          props.refetch();
        }}>
        {(deleteBoard, {error}) => {
          if(error) {
            console.log(error);
          }
          return <button onClick={deleteBoard}>Delete</button>
        }}
      </Mutation>
    </div>
);

export default BoardLinkCard;