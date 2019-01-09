import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './header';
import LandingPage from '../pages/landing';
import BoardsPage from '../pages/boards';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import BoardPage from '../pages/board';
import DemoPage from '../pages/demo';

const App = () => (
  <div>
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/demo" component={DemoPage} />
        <Route exact path="/boards" component={BoardsPage} />
        <Route exact path="/board/:id" component={BoardPage} />
      </Switch>
    </main>
  </div>
);

export default App;