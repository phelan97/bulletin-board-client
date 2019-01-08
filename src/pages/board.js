import React from 'react';
import {withRouter} from 'react-router-dom';
import {Query} from 'react-apollo';
import {BOARD_LISTS} from '../graphql/queries';
import List from '../components/list';

const BoardPage = (props) => (
  <Query query={BOARD_LISTS} variables={{boardId: props.match.params.id}}>
    {({data, error, loading}) => {
      if(error) {
        return <p>Could not find this board. It may have been deleted or the url may be malformed</p>
      }
      if(loading) {
        return <p>Loading</p>
      }
      if(data.lists) {
        const renderedLists = data.lists.map(list => {
          return <li key={list.id}><List data={list} /></li>
        })
        return (
          <ul>
            {renderedLists}
          </ul>
        )
      }
    }}
  </Query>
);

export default withRouter(BoardPage);