import React from 'react'
import Page from '../../layout/Page'
import { Button, Input } from 'rebass'
import gql from 'graphql-tag'

import { Query, Mutation } from 'react-apollo'

import {
  Progress,
  ProgressBar,
  Artwork,
  Title,
  Controls,
  PlayerContainer
} from './styles'

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
    {upvote => <div onClick={upvote}>upvote!</div>}
  </Mutation>
)

const Downvote = ({ code }) => (
  <Mutation mutation={DOWNVOTE} variables={{ code }}>
    {downvote => <div onClick={downvote}>downvote!</div>}
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
