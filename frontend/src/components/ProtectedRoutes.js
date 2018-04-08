import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import HostOrJoin from './views/HostOrJoin'
import CreateParty from './views/CreateParty'
import PartyGuest from './views/PartyGuest'
import PartyHost from './views/Party/Host'

const ProtectedRoutes = ({}) => (
  <Switch>
    <Route exact path="/party/host/:partyId" component={PartyHost} />
    <Route exact path="/party/:partyId" component={PartyGuest} />
    <Route exact path="/create" component={CreateParty} />
    <Route exact path="*" component={HostOrJoin} />
  </Switch>
)

export default ProtectedRoutes
