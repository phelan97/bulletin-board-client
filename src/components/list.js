import React from 'react';
import {Query} from 'react-apollo';
import {LIST_CARDS} from '../graphql/queries';

const List = (props) => (
  <Query query={LIST_CARDS} variables={{listId: props.data.id}}
    onCompleted={data => {
      console.log('DATA', data);
    }}>
    {({data, error, loading}) => {
      if(error) {
        return <div>Error</div>
      }
      if(loading) {
        return <div>Loading</div>
      }
      if(data.lists) {
        const renderedCards = data.lists.map(list => {
          return <li key={list.id}><List data={list} /></li>
        })
        return (
          <ul>
            {renderedCards}
          </ul>
        )
      }
    }}
  </Query>
);

export default List;