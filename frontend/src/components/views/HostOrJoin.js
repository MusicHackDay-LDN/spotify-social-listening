import React from 'react'
import Page from '../layout/Page'
import { Link } from 'react-router-dom'
import { GradientButton, Button } from '../layout/Button'
import { PartyNameInput } from './CreateParty'

export default () => (
  <Page>
    <div>
      <PartyNameInput mb={2} placeholder="party code" />
      <Button f={2} mb={3}>
        Join a Party
      </Button>
    </div>
    <div>
      <p>or</p>
      <Link to="/create">Host a Party</Link>
    </div>
  </Page>
)
