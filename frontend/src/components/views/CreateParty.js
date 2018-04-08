import React, { Component } from 'react'
import { withState } from 'recompose'
import Page from '../layout/Page'
import Input from '../layout/Input'
import { Button } from '../layout/Button'
import { Label } from 'rebass'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

export const PartyNameInput = styled(Input)``

const withPartyName = withState('partyName', 'updatePartyName', '')
const CreateParty = ({ partyName, updatePartyName }) => (
  <Page>
    <div style={{ width: 300 }}>
      <Label>Party Name</Label>
      <PartyNameInput
        placeholder="Music Hack Day 2018"
        mb={3}
        value={partyName}
        onChange={e => updatePartyName(e.target.value)}
      />
    </div>
    <Button>Create Party</Button>
  </Page>
)

export default withPartyName(CreateParty)
