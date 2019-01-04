import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './header.css';
class Header extends React.Component {
  logout() {
    localStorage.clear('Authorization');
    this.props.history.push('/');
  }

  render() {
    const token = localStorage.getItem('Authorization');
    const loggedIn = token !== null;

    const logInButton = <li><Link to="/login"><button>Login</button></Link></li>;
    const logOutButton = <li><button onClick={() => this.logout()}>Log out</button></li>

    return (
      <header>
          <nav>
            <ul>
              <li className="button-home"><Link to="/"><button>Home</button></Link></li>
              {loggedIn ? <li><Link to="/boards"><button>Boards</button></Link></li> : null}
              {loggedIn ? logOutButton : logInButton}
              {loggedIn ? null : <li><Link to="/register"><button>Register</button></Link></li>}
            </ul>
          </nav>
        </header>
    );
  }
}

export default withRouter(Header);