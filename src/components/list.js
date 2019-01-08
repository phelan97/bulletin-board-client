import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {LIST_CARDS} from '../graphql/queries';
import {CREATE_CARD} from '../graphql/mutations';

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
              return <li key={card.id}><div>{card.content}</div></li>
            });
          }
          return (
            <React.Fragment>
              <div>
                <h3>{this.props.data.title}</h3>
                <ul>
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
            </React.Fragment>
          );
        }}
        </Query>
    );
  }
}

export default List;