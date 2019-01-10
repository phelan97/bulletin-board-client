import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router} from 'react-router-dom';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import App from './components/App';
import {endpoint, prodEndpoint} from './config';
import 'normalize.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
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
