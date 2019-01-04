import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './header';
import LandingPage from '../pages/landing';
import BoardsPage from '../pages/boards';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

const App = () => (
  <div>
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/boards" component={BoardsPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </main>
  </div>
);

export default App;