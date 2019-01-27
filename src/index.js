import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router} from 'react-router-dom';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import App from './components/App';
import {endpoint, prodEndpoint} from './config';
import 'normalize.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache();

const initialState = {
  draggedCardId: ''
};

const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers: {}
});

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
  // uri: prodEndpoint
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('Authorization');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

const link = ApolloLink.from([stateLink, authLink, httpLink]);

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
