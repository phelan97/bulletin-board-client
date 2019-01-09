import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {ALL_BOARDS} from '../graphql/queries';
import {CREATE_BOARD} from '../graphql/mutations';
import BoardLinkCard from '../components/board-link-card'
import './boards.css';

class BoardsPage extends React.Component {
  state = {
    boardName: ''
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }

  render() {
    return (
      <React.Fragment>
        <h2>Boards</h2>
        <Query query={ALL_BOARDS}>
        {({error, loading, data, refetch}) => {
          let boards;
          if(error) {
            boards = <p>Error</p>
          }
          if(loading) {
            boards = <p>Loading</p>
          }
          if(data.boards) {
            boards = data.boards.map(board => {
              return <BoardLinkCard title={board.title} id={board.id} refetch={refetch}/>
            });
          }
          return (
            <div className="board-container">
              {boards}
              <Mutation mutation={CREATE_BOARD} variables={{title: this.state.boardName}} onCompleted={data => {
                refetch();
              }}>
                {(addBoard, {error}) => {
                  return (
                    <form className="board-add-form"
                      onSubmit={e => {
                        e.preventDefault();
                        addBoard();
                        this.setState({boardName: ''});
                    }}>
                      <label htmlFor="boardName">Add a new board</label>
                      <input type="text" name="boardName" placeholder="Board title"
                        value={this.state.boardName} onChange={this.saveToState}></input>
                      <button type="submit">Create board</button>
                    </form>
                  ); 
                }}
              </Mutation>
            </div>
          )
        }}
        </Query>
      </React.Fragment>
    );
  }
}

export default BoardsPage;