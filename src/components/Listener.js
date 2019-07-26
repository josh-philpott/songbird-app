import React from 'react'
import { Helmet } from 'react-helmet'
import querystring from 'query-string'

import spotifyApi from '../lib/spotify'
import broadcastApi from '../lib/broadcast'

import Navbar from './home/Navbar'

import Script from 'react-load-script'
import { setupSpotifyWebPlayerCallback } from '../lib/spotify-web-player'

import ListenerStreamController from './ListenerStreamController'

import styled from 'styled-components'

const DEBOUNCE_MS = 5000

const Body = styled.section`
  margin: 30px auto;
  width: 300px;
  text-align: center;
`

class Listener extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    const { broadcastId } = querystring.parse(this.props.location.search)
    const profile = await spotifyApi.getProfileInfo()
    const broadcast = await broadcastApi.listen(broadcastId)

    // poll for currently playing track

    const profileImage =
      profile.images && profile.images[0] && profile.images[0].url
        ? profile.images[0].url
        : ''

    const currentSongName =
      broadcast && broadcast.currentlyPlaying && broadcast.currentlyPlaying.item
        ? broadcast.currentlyPlaying.item.name
        : 'Nothing'

    const currentSongArtist =
      broadcast &&
      broadcast.currentlyPlaying &&
      broadcast.currentlyPlaying.item.artists &&
      broadcast.currentlyPlaying.item.artists[0]
        ? broadcast.currentlyPlaying.item.artists[0].name
        : 'Noone'

    this.setState({
      isLoading: false,
      name: profile.display_name,
      broadcasterName: broadcast.broadcasterName,
      broadcastProfileImageUrl: broadcast.profileImageUrl,
      currentSongName,
      currentSongArtist,
      profileImage,
      broadcastId
    })
  }

  render() {
    let body
    if (this.state.isLoading) {
      body = <Body>Loading...</Body>
    } else {
      let profileInfo = (
        <Body style={{ margin: '30px auto' }}>
          <p>You're listening to {this.state.broadcasterName}'s room.</p>
          <img
            src={this.state.broadcastProfileImageUrl}
            alt='User Profile Photo'
          />
          <p>
            Currently Playing: {this.state.currentSongName} by{' '}
            {this.state.currentSongArtist}
          </p>
        </Body>
      )

      body = (
        <div>
          <Navbar loggedIn={true} />
          {profileInfo}
          <ListenerStreamController broadcastId={this.state.broadcastId} />
        </div>
      )
    }
    return <div>{body}</div>
  }
}

export default Listener
