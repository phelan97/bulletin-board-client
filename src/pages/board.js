import React from 'react';
import {withApollo} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {Query, Mutation} from 'react-apollo';
import {BOARD_LISTS} from '../graphql/queries';
import {CREATE_LIST} from '../graphql/mutations';
import List from '../components/list';
import MediaQuery from 'react-responsive';
import Swipeable from 'react-swipeable';
import './board.css';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      boardId: this.props.match.params.id,
      swipedIndex: 0
    }
    this.handleSwipedLeft = this.handleSwipedLeft.bind(this);
    this.handleSwipedRight = this.handleSwipedRight.bind(this);
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }

  // avoids adjusting the index to the array size for now, since that would require querying the cache
  // the data is only available inside the query on the render, and setState should be avoided
  handleSwipedLeft() {
    this.setState({swipedIndex: this.state.swipedIndex + 1});
  }

  handleSwipedRight() {
    this.setState({swipedIndex: this.state.swipedIndex - 1});
  }

  render() {
    return (
      <Query query={BOARD_LISTS} variables={{boardId: this.state.boardId}}>
        {({data, error, loading, refetch}) => {
        if(error) {
          return <h2>Could not locate board</h2>
        }
        if(loading) {
          return <p>Loading</p>
        }
        let renderedLists;
        if(data.lists) {
          renderedLists = data.lists.map(list => {
            return <li key={list.id}><List data={list} boardId={this.state.boardId} /></li>
          });
        }
        return (
          <div className="outer-scroll-container">
            <div className="list-container">
              <MediaQuery minDeviceWidth={550}>
                {(matches) => {
                  if(matches) {
                    return (
                      <ul className="all-lists">
                        {renderedLists}
                      </ul>
                    );
                  } else {
                    // calculate the adjusted index inside of the render
                    const maxSize = renderedLists.length;
                    let newIndex = this.state.swipedIndex%maxSize;
                    if(newIndex < 0) {
                      newIndex = newIndex + maxSize;
                    }

                    return (
                      <Swipeable
                        onSwipedLeft={this.handleSwipedLeft}
                        onSwipedRight={this.handleSwipedRight}
                      >
                        {renderedLists[newIndex]}
                      </Swipeable>
                    );
                  }
                }}
              </MediaQuery>

              <Mutation mutation={CREATE_LIST}
                variables={{title: this.state.listName, boardId: this.state.boardId}}
                onCompleted={data => {
                  refetch();
              }}>
                {(addList, {error}) => {
                  return (
                    <form className="form-add-list" onSubmit={e => {
                      e.preventDefault();
                      addList();
                      this.setState({listName: ''   });
                    }}>
                      <label htmlFor="listName">List name</label>
                      <input type="text" name="listName" placeholder="Title"
                        value={this.state.listName} onChange={this.saveToState}></input>
                      <button type="submit">Add list</button>
                    </form>
                  );
                }}
              </Mutation>
            </div>
          </div>
        );
      }}
      </Query>
    );
    }
  }

export default withRouter(withApollo(BoardPage));