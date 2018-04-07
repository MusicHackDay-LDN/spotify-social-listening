import React, { Component } from 'react';
import { checkToken, getToken, login } from './auth';

class App extends Component {
  state = {
    authorised: checkToken()
  };
  authorise = () => {
    login()
      .then(() => this.setState({ authorised: true }))
      .then(this.setupConnect)
  }
  render() {
    return (
      <div>
        <header>
          <h1>Social Listening</h1>
        </header>
        <div>
          <button>

          </button>
        </div>
      </div>
    );
  }
}

export default App;
