import React, { Component } from 'react'
import { checkToken, getToken, login } from '../../../auth'
import openSocket from 'socket.io-client'
import Icon from '@fortawesome/react-fontawesome'
import {
  faStepBackward,
  faStepForward,
  faPlay,
  faPause
} from '@fortawesome/fontawesome-free-solid'
import Page from '../../layout/Page'
import {
  Progress,
  ProgressBar,
  Artwork,
  Title,
  Controls,
  PlayerContainer,
  ArtworkContainer,
  Upvotes,
  Downvotes
} from './styles'
import gql from 'graphql-tag'
import { graphql, Mutation } from 'react-apollo'
import idx from 'idx'
import { Flex } from 'grid-styled'
import styled from 'styled-components'

const Genres = styled.div`
  padding: 24px 48px;
  text-align: center;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const query = gql`
  query getParty($code: Int!) {
    getParty(code: $code) {
      code
      genres
      currentUpvotes
      currentDownvotes
      activeTrack {
        id
      }
    }
  }
`

const gotoNextMutation = gql`
  mutation goToNext($token: String!, $code: Int!) {
    goToNextSong(hostToken: $token, code: $code) {
      code
      activeTrack {
        id
      }
    }
  }
`

const withQuery = graphql(query, {
  options: ({ match }) => ({
    variables: { code: +match.params.partyCode },
    pollInterval: 500
  })
})

class Party extends Component {
  state = {}
  componentDidMount() {
    if (checkToken()) {
      this.setupConnect()
    }
  }
  componentWillReceiveProps(nextProps) {
    const currentTrackId = idx(this.props, _ => _.data.getParty.activeTrack.id)
    const nextTrackId = idx(nextProps, _ => _.data.getParty.activeTrack.id)

    if (nextTrackId && nextTrackId !== currentTrackId) {
      this.emit('play', { id: nextTrackId })
    }
  }
  setProgress = (progress, timestamp) => {
    const trackLength = this.state.activeTrack.duration_ms
    this.setState({
      progress: progress,
      progressPercent: progress / trackLength * 100
    })
  }
  setPlaybackState = isPlaying => {
    this.setState({
      isPlaying
    })
  }
  setDevice = device => {
    this.setState({
      device
    })
  }
  setVolume = volume => {
    this.setState({
      volume
    })
  }
  setTrack = activeTrack => {
    this.setState({
      activeTrack
    })
  }
  emit = (event, value) => {
    this.io.emit(event, value)

    // optimistic updates
    switch (event) {
      case 'play':
        this.setPlaybackState(true)
        break
      case 'pause':
        this.setPlaybackState(false)
        break
      default:
        break
    }
  }
  onError = error => {
    this.setState({ error: error.message || error })
  }
  setupConnect = trackId => {
    const io = openSocket('https://spotify-connect-ws.herokuapp.com/connect')
    const wrappedHandler = (event, handler) => {
      io.on(event, data => {
        console.info(event, data)
        handler(data)
      })
    }
    io.emit('initiate', { accessToken: getToken() })
    wrappedHandler('initial_state', state => {
      this.setVolume(state.device.volume_percent)
      this.setDevice(state.device)
      this.setPlaybackState(state.is_playing)
      this.setTrack(state.item)
      this.setProgress(state.progress_ms)
      this.setState({ playerReady: true })
      this.emit('play', { id: trackId })
      this.progressTimer = window.setInterval(() => {
        if (this.state.isPlaying) {
          this.setProgress(this.state.progress + 1000)
        }
      }, 1000)
    })
    wrappedHandler('track_change', this.setTrack)
    wrappedHandler('seek', this.setProgress)
    wrappedHandler('playback_started', () => this.setPlaybackState(true))
    wrappedHandler('playback_paused', () => this.setPlaybackState(false))
    wrappedHandler('device_change', this.setDevice)
    wrappedHandler('volume_change', this.setVolume)
    wrappedHandler('track_end', () => {})
    wrappedHandler('connect_error', this.onError)

    this.io = io
  }
  render() {
    const { error, activeTrack, playerReady, isPlaying } = this.state
    if (this.props.data.loading) {
      return <Page>'Loading...'</Page>
    }

    return (
      <Page>
        {playerReady ? (
          <Flex>
            <PlayerContainer>
              <ArtworkContainer>
                <Artwork
                  src={activeTrack.album.images[0].url}
                  alt={`${activeTrack.name} by ${activeTrack.artists[0].name}`}
                />
                {this.props.data.getParty.currentUpvotes > 0 && (
                  <Upvotes>
                    😍 {this.props.data.getParty.currentUpvotes}
                  </Upvotes>
                )}
                {this.props.data.getParty.currentDownvotes > 0 && (
                  <Downvotes>
                    👺 {this.props.data.getParty.currentDownvotes}
                  </Downvotes>
                )}
              </ArtworkContainer>
              <Title>
                {activeTrack.name} by {activeTrack.artists[0].name}
              </Title>
              <Controls>
                <Icon
                  onClick={() => this.emit(isPlaying ? 'pause' : 'play')}
                  size="lg"
                  icon={isPlaying ? faPause : faPlay}
                />
                <Mutation mutation={gotoNextMutation}>
                  {mutation => (
                    <Icon
                      onClick={() =>
                        mutation({
                          variables: {
                            code: this.props.match.params.partyCode,
                            token: getToken()
                          }
                        })
                      }
                      icon={faStepForward}
                    />
                  )}
                </Mutation>
              </Controls>
              <ProgressBar>
                <Progress
                  style={{ width: `${this.state.progressPercent}%` }}
                  className="Progress"
                >
                  <span />
                </Progress>
              </ProgressBar>
            </PlayerContainer>
            <Genres>
              <h3>Genres</h3>
              {this.props.data.loading ? null : (
                <ul>
                  {this.props.data.getParty.genres.map(genre => (
                    <li>{genre}</li>
                  ))}
                </ul>
              )}
            </Genres>
          </Flex>
        ) : error ? (
          <div className="Container">{error}</div>
        ) : (
          <div className="Container">Loading...</div>
        )}
      </Page>
    )
  }
}

export default withQuery(Party)
