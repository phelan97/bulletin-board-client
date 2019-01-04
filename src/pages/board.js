import React from 'react';
import {withRouter} from 'react-router-dom';
import Board from '../components/board';

const BoardPage = () => (
  <Board id={this.props.match.params.id}/>
);

export default withRouter(BoardPage);