import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/App';
import {endpoint, prodEndpoint} from './config';
import './index.css';
import * as serviceWorker from './serviceWorker';

// TODO: authLink
const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
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
