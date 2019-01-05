import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {ALL_BOARDS} from '../graphql/queries';
import {CREATE_BOARD} from '../graphql/mutations';

class BoardsPage extends React.Component {
  state = {
    boardName: ''
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }

  render() {
    return (
      <div>
        <h2>Boards page</h2>
        <Query query={ALL_BOARDS} onCompleted={data => {
          console.log('BOARDS', data);
        }}>
        {({error, loading, data, refetch}) => {
          let boards;
          if(error) {
            boards = <p>Error</p>
          }
          if(loading) {
            boards = <p>Loading</p>
          }
          if(data.boards) {
            boards = data.boards.map((board, index) => {
              return <div>{board.title}</div>
            });
          }
          return (
            <React.Fragment>
              {boards}
              <Mutation mutation={CREATE_BOARD} variables={{title: this.state.boardName}} onCompleted={data => {
                refetch();
              }}>
                {(addBoard, {error}) => {
                  return (
                    <form onSubmit={e => {
                      e.preventDefault();
                      addBoard();
                      this.setState({boardName: ''});
                    }}>
                      <label htmlFor="boardName">Board name</label>
                      <input type="text" name="boardName" placeholder="Title"
                        value={this.state.boardName} onChange={this.saveToState}></input>
                      <button type="submit">Add board</button>
                    </form>
                  ); 
                }}
              </Mutation>
            </React.Fragment>
          )
        }}
        </Query>
      </div>
    );
  }
}

export default BoardsPage;