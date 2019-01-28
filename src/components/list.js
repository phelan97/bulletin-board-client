import React from 'react';
import {Query, Mutation, withApollo} from 'react-apollo';
import {LIST_CARDS, BOARD_LISTS} from '../graphql/queries';
import {CREATE_CARD, DELETE_LIST, EDIT_LIST} from '../graphql/mutations';
import {FaTrashAlt} from 'react-icons/fa';
import EditableTitle from './clickable-title';
import Card from './card';
import './list.css';
import ClickableTitle from './clickable-title';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardContents: ''
    }
    this.handleRename = this.handleRename.bind(this);
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }

  handleRename(newTitle) {
    this.props.client.mutate({
      mutation: EDIT_LIST,
      variables: {listId: this.props.data.id, title: newTitle}
    })
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
                  return (
                    <button className="delete-button" onClick={deleteList}>
                      <FaTrashAlt />
                    </button>
                  );
                 }}
                </Mutation>
              </div>
              <div>
                <ClickableTitle startingValue={this.props.data.title} onRename={this.handleRename}/>
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
                      <input type="text" name="cardContents"
                        value={this.state.cardContents} onChange={this.saveToState}
                        placeholder="Add new card"
                      />
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

export default withApollo(List);