import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { checkToken, getToken, login } from '../auth'
import { Provider as RebassProvider, Heading } from 'rebass'
import theme from '../theme'

import Login from './views/Login'
import Callback from './views/Callback'
import ProtectedRoutes from './ProtectedRoutes'

console.log(theme)

class App extends Component {
  state = {
    authorised: checkToken()
  }
  authorise = () => {
    login().then(() => this.setState({ authorised: true }))
  }
  render() {
    return (
      <RebassProvider theme={theme}>
        <Router>
          <div>
            <Heading my={4} color="white">
              Social Jukebox
            </Heading>
            <Switch>
              <Route exact path="/callback/" component={Callback} />
              {this.state.authorised ? (
                <ProtectedRoutes />
              ) : (
                <Route
                  path="*"
                  render={() => <Login authorise={this.authorise} />}
                />
              )}
            </Switch>
          </div>
        </Router>
      </RebassProvider>
    )
  }
}

export default App
