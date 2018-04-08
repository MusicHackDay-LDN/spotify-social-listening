import React from 'react'
import Page from '../../layout/Page'
import { Button, Input } from 'rebass'
import gql from 'graphql-tag'
import Icon from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-solid'
import styled from 'styled-components'

import { Query, Mutation } from 'react-apollo'

import {
  Progress,
  ProgressBar,
  Artwork,
  Title,
  Controls,
  PlayerContainer
} from './styles'

const Vote = styled.div`
  cursor: pointer;
`

const UPVOTE = gql`
  mutation Upvote($code: Int!) {
    upvoteCurrentSong(code: $code) {
      activeTrack {
        image
        name
        artists {
          name
        }
      }
      currentUpvotes
      currentDownvotes
    }
  }
`
const DOWNVOTE = gql`
  mutation DownVote($code: Int!) {
    downvoteCurrentSong(code: $code) {
      activeTrack {
        image
        name
        artists {
          name
        }
      }
      currentUpvotes
      currentDownvotes
    }
  }
`

const GET_PARTY = gql`
  query Party($code: Int!) {
    getParty(code: $code) {
      activeTrack {
        image
        name
        artists {
          name
        }
      }
      currentUpvotes
      currentDownvotes
    }
  }
`

const Upvote = ({ code }) => (
  <Mutation mutation={UPVOTE} variables={{ code }}>
    {upvote => (
      <Vote onClick={upvote}>
        <Icon size="lg" icon={faThumbsUp} />
      </Vote>
    )}
  </Mutation>
)

const Downvote = ({ code }) => (
  <Mutation mutation={DOWNVOTE} variables={{ code }}>
    {downvote => (
      <Vote onClick={downvote}>
        <Icon size="lg" icon={faThumbsDown} />
      </Vote>
    )}
  </Mutation>
)

export default props => (
  <Page>
    <Query
      query={GET_PARTY}
      variables={{ code: props.match.params.partyId }}
      pollInterval={1000}
    >
      {({ loading, error, data, startPolling }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        const { activeTrack } = data.getParty

        return (
          <React.Fragment>
            <Artwork src={activeTrack.image} />
            <Title>
              {activeTrack.name} by {activeTrack.artists[0].name}
            </Title>

            <div>{data.getParty.currentUpvotes}</div>
            <div>{data.getParty.currentDownvotes}</div>
            <Upvote code={props.match.params.partyId} />
            <Downvote code={props.match.params.partyId} />
          </React.Fragment>
        )
      }}
    </Query>
  </Page>
)
