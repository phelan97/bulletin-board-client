import React from 'react';
import {Query, Mutation, withApollo} from 'react-apollo';
import {LIST_CARDS, BOARD_LISTS, GET_DRAGGED_CARD} from '../graphql/queries';
import {CREATE_CARD, EDIT_LIST, DELETE_LIST, MOVE_CARD} from '../graphql/mutations';
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
    this.handleDrop = this.handleDrop.bind(this);
    this.handleRename = this.handleRename.bind(this);
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})   
  }
  handleDrop(e) {
    let {draggedCard} = this.props.client.readQuery({query: GET_DRAGGED_CARD});
    let oldListId = draggedCard.listId;

    // move the card to the specified list
    this.props.client.mutate({
      mutation: MOVE_CARD,
      variables: {cardId: draggedCard.id, listId: this.props.data.id},
    });
    
    // update drop target (this list) + the listId on the card
    const data = this.props.client.readQuery({ query: LIST_CARDS, variables: {listId: this.props.data.id} });
    draggedCard.listId = this.props.data.id;
    data.cards = data.cards.concat(draggedCard);
    this.props.client.writeQuery({
      query: LIST_CARDS,
      data,
      variables: {listId: this.props.data.id}
    });

    // update drag start (other list)
    const oldListData = this.props.client.readQuery({ query: LIST_CARDS, variables: {listId: oldListId} });
    oldListData.cards = oldListData.cards.filter(card => card.id !== draggedCard.id);
    this.props.client.writeQuery({
      query: LIST_CARDS,
      data: oldListData,
      variables: {listId: oldListId}
    });
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
                <ClickableTitle startingValue={this.props.data.title} onRename={this.handleRename}/>
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
                      <textarea name="cardContents"
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