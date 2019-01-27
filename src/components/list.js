import React from 'react';
import {Query, Mutation, withApollo} from 'react-apollo';
import {LIST_CARDS, BOARD_LISTS, GET_DRAGGED_CARD} from '../graphql/queries';
import {CREATE_CARD, EDIT_LIST, DELETE_LIST, MOVE_CARD} from '../graphql/mutations';
import {FaTrashAlt} from 'react-icons/fa';
import Card from './card';
import './list.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardContents: ''
    }
    this.handleDrop = this.handleDrop.bind(this);
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }
  handleDrop(e) {
    console.log('drop');
    // console.log(e.dataTransfer.getData('application/json').cardId);
    let {draggedCard} = this.props.client.readQuery({query: GET_DRAGGED_CARD});
    let oldListId = draggedCard.listId;

    this.props.client.mutate({
      mutation: MOVE_CARD,
      variables: {cardId: draggedCard.id, listId: this.props.data.id},
      onCompleted(data) {
        console.log('data', data);
      }
    });
    
    const data = this.props.client.readQuery({ query: LIST_CARDS, variables: {listId: this.props.data.id} });
    data.cards = data.cards.concat(draggedCard);
    this.props.client.writeQuery({
      query: LIST_CARDS,
      data,
      variables: {listId: this.props.data.id}
    });

    const oldListData = this.props.client.readQuery({ query: LIST_CARDS, variables: {listId: oldListId} });
    oldListData.cards = oldListData.cards.filter(card => card.id !== draggedCard.id);
    this.props.client.writeQuery({
      query: LIST_CARDS,
      data: oldListData,
      variables: {listId: oldListId}
    });
    
    console.log('starting list data');
    console.log(oldListData);
    console.log('dest list data');
    console.log(data);
    console.log('dragged card');
    console.log(draggedCard);

    this.props.refetch();
    // console.log(draggedCardId);
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
                    data={card}
                  />
                </li>
              );
            });
          }
          return (
            <div className="list-card"
              onDrop={this.handleDrop}
              onDragOver={e => e.preventDefault()}
              onDragEnter={e => e.preventDefault()}
            >
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
                <h3>{this.props.data.title}</h3>
                <h3>{this.props.data.id}</h3>
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