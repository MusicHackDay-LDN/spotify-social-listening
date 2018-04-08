import React from 'react'
import Page from '../layout/Page'
import { Link } from 'react-router-dom'
import { GradientButton, Button } from '../layout/Button'
import { PartyNameInput } from './CreateParty'
import { withState } from 'recompose'

const withCode = withState('code', 'updateCode', '')

export default withCode(({ code, updateCode }) => (
  <Page>
    <div>
      <PartyNameInput
        mb={2}
        placeholder="party code"
        value={code}
        onChange={e => updateCode(e.target.value)}
      />
      <Button f={2} mb={3} onClick={() => (window.location = `/party/${code}`)}>
        Join a Party
      </Button>
    </div>
    <div>
      <p>or</p>
      <Link to="/create">Host a Party</Link>
    </div>
  </Page>
))
