import React from 'react';
import {Mutation} from 'react-apollo';
import {DELETE_BOARD} from '../graphql/mutations';
import BoardLinkControls from './board-link-controls';
import './board-link-card.css';

const BoardLinkCard = (props) => (
    <div className="board-card" key={props.id}>
      <BoardLinkControls linkedBoardId={props.id} startingTitleValue={props.title}/>
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