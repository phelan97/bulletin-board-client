import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {LIST_CARDS, BOARD_LISTS} from '../graphql/queries';
import {CREATE_CARD, EDIT_LIST, DELETE_LIST} from '../graphql/mutations';
import Card from './card';
import './list.css';

class List extends React.Component {
  state = {
    cardContents: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }
  render() {
    return (
      <Query query={LIST_CARDS} variables={{listId: this.props.data.id}}>
        {({data, error, loading, refetch}) => {
          if(error) {
            return <div>Error</div>
          }
          let renderedCards;
          if(loading) {
            renderedCards = <li><div>Loading</div></li>
          }
          if(data.cards) {
            renderedCards = data.cards.map(card => {
              return (
                <li key={card.id}>
                  <Card
                    id={card.id}
                    content={card.content}
                    refetch={refetch}
                  />
                </li>
              );
            });
          }
          return (
            <div className="list-card">
              <div className="list-controls">
                {/* <Mutation mutation={EDIT_LIST}
                  variables={{content: this.state.cardContents, listId: this.props.data.id}}
                  onCompleted={data => {
                    refetch();
                }}>
                 {(addCard, {error}) => {
                  return <button>Edit</button>;
                 }}
                </Mutation> */}
                <Mutation mutation={DELETE_LIST}
                  variables={{listId: this.props.data.id}}
                  update={(cache, {data: {deleteList}}) => {
                    const data = cache.readQuery({ query: BOARD_LISTS, variables: {boardId: this.props.boardId} });
                    data.lists = data.lists.filter(list => list.id !== this.props.data.id);
                    cache.writeQuery({
                      query: BOARD_LISTS,
                      data,
                      variables: {boardId: this.props.boardId}
                    });
                }}>
                 {(deleteList, {error}) => {
                  return <button onClick={deleteList}>Delete</button>;
                 }}
                </Mutation>
              </div>
              <div>
                <h3>{this.props.data.title}</h3>
                <ul className="ul-cards">
                  {renderedCards}
                </ul>
              </div>
              <Mutation mutation={CREATE_CARD}
                variables={{content: this.state.cardContents, listId: this.props.data.id}}
                onCompleted={data => {
                  refetch();
              }}>
                {(addCard, {error}) => {
                  return (
                    <form onSubmit={e => {
                      e.preventDefault();
                      addCard();
                      this.setState({cardContents: ''});
                    }}>
                      <label htmlFor="cardContents">Add new card</label>
                      <input type="text" name="cardContents"
                        value={this.state.cardContents} onChange={this.saveToState}></input>
                      <button type="submit">Add card</button>
                    </form>
                  );
                }}
              </Mutation>
            </div>
          );
        }}
        </Query>
    );
  }
}

export default List;