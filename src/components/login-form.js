import React from 'react';
import { Mutation } from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {LOGIN} from '../graphql/mutations';
import './login-form.css';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
    return (
      <Mutation mutation={LOGIN} variables={{email: this.state.email, password: this.state.password}}
        update={(cache, {data: {login}}) => {
          localStorage.setItem("Authorization", login);
          this.props.history.push('/boards');
        }}>
        {(login, {loading, error}) => {    
          return (
            <form method='post' onSubmit={(e) => {
              console.log('login mutation triggered');
              e.preventDefault();
              login();
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <legend>Log in</legend>
                {/* <Error error={error} /> */}
              
                <label htmlFor="email">Email</label>
                <input 
                type='email' 
                name='email' 
                placeholder='Email' 
                value={this.state.email}
                onChange={this.saveToState} />
                <label htmlFor="password">Password</label>
                <input 
                type='password' 
                name='password' 
                placeholder='Password' 
                value={this.state.email}
                onChange={this.saveToState} />
                <button type='submit'>Log in</button>
              </fieldset>
            </form>
          )}}
      </Mutation>
    );
  }
}


export default withRouter(LoginForm);