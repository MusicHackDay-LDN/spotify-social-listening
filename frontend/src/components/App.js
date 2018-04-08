import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { checkToken, getToken, login } from '../auth'
import { Provider as RebassProvider, Heading } from 'rebass'
import theme from '../theme'

import Login from './views/Login'
import Callback from './views/Callback'
import ProtectedRoutes from './ProtectedRoutes'

import { initGraphqlClient } from '../api'

const client = initGraphqlClient(
  'https://jjrtsvnrwfc6jemq3mlycfep24.appsync-api.eu-west-1.amazonaws.com/graphql'
)

class App extends Component {
  state = {
    authorised: checkToken()
  }
  authorise = () => {
    login().then(() => this.setState({ authorised: true }))
  }
  render() {
    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    )
  }
}

export default App
