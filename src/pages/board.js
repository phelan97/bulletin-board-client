import React from 'react';
import {withRouter} from 'react-router-dom';
import {Query, Mutation} from 'react-apollo';
import {BOARD_LISTS} from '../graphql/queries';
import {CREATE_LIST} from '../graphql/mutations';
import List from '../components/list';

class BoardPage extends React.Component {
  state = {
    listName: '',
    boardId: this.props.match.params.id
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }

  render() {
    return (
      <Query query={BOARD_LISTS} variables={{boardId: this.state.boardId}}>
        {({data, error, loading, refetch}) => {
        if(error) {
          return <p>Could not find this board. It may have been deleted or the url may be malformed</p>
        }
        if(loading) {
          return <p>Loading</p>
        }
        let renderedLists;
        if(data.lists) {
          console.log('lists', data.lists);
          renderedLists = data.lists.map(list => {
            return <li key={list.id}><List data={list} boardId={this.state.boardId} /></li>
          });
        }
        return (
          <React.Fragment>
            <Mutation mutation={CREATE_LIST}
              variables={{title: this.state.listName, boardId: this.state.boardId}}
              onCompleted={data => {
                refetch();
            }}>
              {(addList, {error}) => {
                return (
                  <form onSubmit={e => {
                    e.preventDefault();
                    addList();
                    this.setState({listName: ''});
                  }}>
                    <label htmlFor="listName">List name</label>
                    <input type="text" name="listName" placeholder="Title"
                      value={this.state.listName} onChange={this.saveToState}></input>
                    <button type="submit">Add list</button>
                  </form>
                );
              }}
            </Mutation>
            <ul>
              {renderedLists}
            </ul>
          </React.Fragment>
        );
      }}
      </Query>
    );
    }
  }

export default withRouter(BoardPage);