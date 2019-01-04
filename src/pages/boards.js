import React from 'react';
import {Query} from 'react-apollo';
import {ALL_BOARDS} from '../graphql/queries';

const BoardsPage = () => (
  <div>
    <h2>Boards page</h2>
    <Query query={ALL_BOARDS} onCompleted={data => {
      console.log('BOARDS', data);
    }}>
    {({data, error, loading}) => {
      return <p>Boards</p>
    }}
    </Query>
  </div>
);

export default BoardsPage;