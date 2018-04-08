import React from 'react'
import Page from '../layout/Page'
import { Container, Heading, Measure } from 'rebass'
import { Button } from '../layout/Button'

export default ({ authorise }) => (
  <Page>
    <Measure f={3} mb={4}>
      Welcome to the Social Jukebox, a tool that allows you to find the perfect
      playlist for a room full of people, no matter what their taste is.
    </Measure>
    <Button onClick={authorise}>Login with Spotify</Button>
  </Page>
)
