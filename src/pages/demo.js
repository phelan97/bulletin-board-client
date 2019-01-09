import React from 'react';
import {withRouter} from 'react-router-dom';
import {Query} from 'react-apollo';
import {DEMO_LOGIN} from '../graphql/queries';

class DemoPage extends React.Component {
  componentWillMount() {
    const loggedIn = localStorage.getItem('Authorization') !== null;
    if(loggedIn) {
      this.props.history.push('/boards');
    }
  }
  render() {
    return (
      <Query query={DEMO_LOGIN}
        onCompleted={data => {
          localStorage.setItem('Authorization', data.demoAccount);
          this.props.history.push('/boards');
        }}>
        {({loading, error}) => {
          if(loading) {
            return <h2>Loading...</h2>
          } else if(error) {
            return <h2>Demo account not found</h2>
          } else {
            return <h2>Attempting to log in... if you are not redirected within a few seconds, try refreshing the page</h2>
          }
        }}
      </Query>
    );
  }
}

export default withRouter(DemoPage);