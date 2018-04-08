import React, { Component } from 'react'
import { withState } from 'recompose'
import Page from '../layout/Page'
import Input from '../layout/Input'
import { Button } from '../layout/Button'
import { Label } from 'rebass'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import { Mutation } from 'react-apollo'
import { getToken } from '../../auth'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'

export const PartyNameInput = styled(Input)``

const mutation = gql`
  mutation CreateParty($name: String!, $token: String!) {
    createParty(input: { name: $name, hostToken: $token }) {
      code
      name
      activeTrack {
        id
      }
    }
  }
`

const withPartyName = withState('partyName', 'updatePartyName', '')
const CreateParty = ({ partyName, updatePartyName }) => (
  <Page>
    <Mutation mutation={mutation}>
      {(mutation, result) => {
        console.log(result)
        if (result.data) {
          return <Redirect to={`/party/host/${result.data.createParty.code}`} />
        }
        return (
          <div style={{ width: 300 }}>
            <Label>Party Name</Label>
            <PartyNameInput
              placeholder="Music Hack Day 2018"
              mb={3}
              value={partyName}
              onChange={e => updatePartyName(e.target.value)}
            />
            <Button
              onClick={() =>
                mutation({ variables: { name: partyName, token: getToken() } })
              }
            >
              Create Party
            </Button>
          </div>
        )
      }}
    </Mutation>
  </Page>
)

export default withPartyName(CreateParty)
