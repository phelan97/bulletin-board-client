import React from 'react';
import {Link} from 'react-router-dom';
import RegisterForm from '../components/register-form';
import './landing.css';

const LandingPage = () => (
  <div>
    <section className="landing">
      <div className="info">
        <h1>Bulletin Board</h1>
        <p>Keep track of tasks with bulletin boards that can hold lists of items. This app offers Trello-like functionality and uses modern technologies based off of GraphQL.</p>
        <p>Interested in seeing a demo? No need to create an account! Just click <Link to="/demo">here!</Link></p>
      </div>
      <RegisterForm />
    </section>
  </div>
);

export default LandingPage;