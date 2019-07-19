import React from 'react'
import { Helmet } from 'react-helmet'

import spotifyApi from '../lib/spotify'

const initializeSpotifyWebPlayer = () => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = spotifyApi.getAccessToken()
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => {
        cb(token)
      }
    })
    // Error handling
    player.addListener('initialization_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('authentication_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('account_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('playback_error', ({ message }) => {
      console.error(message)
    })

    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state)
    })

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
    })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    player.connect()
  }
}

class Broadcaster extends React.Component {
  constructor(props) {
    super(props)
    initializeSpotifyWebPlayer()
    this.state = {
      isLoading: true,
      name: '',
      profileImage: '',
      isBroadcasting: false
    }
  }

  async logCurrentlyPlaying() {
    const currentlyPlaying = await spotifyApi.getCurrentlyPlaying()
    console.log(currentlyPlaying)

    if (!currentlyPlaying) {
      this.setState({ isBroadcasting: false })
    } else {
      this.setState({
        isBroadcasting: true,
        ...currentlyPlaying
      })
    }
  }

  async componentDidMount() {
    const profile = await spotifyApi.getProfileInfo()
    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profile.images[0].url
    })
    // poll for currently playing track
    setInterval(this.logCurrentlyPlaying.bind(this), 3000)
  }

  render() {
    let body
    if (this.state.isLoading) {
      body = <div>Loading...</div>
    } else {
      let profileInfo = (
        <div>
          <h1>Sup, {this.state.name}</h1>
          <img src={this.state.profileImage} alt='User Profile Photo' />
        </div>
      )

      let currentlyBroadcasting

      if (!this.state.isBroadcasting) {
        currentlyBroadcasting = (
          <p>
            To start broadcasting, open up a spotify player and start playing a
            song!
          </p>
        )
      } else {
        currentlyBroadcasting = (
          <div>Currently Broadcasting: {this.state.item.name}</div>
        )
      }

      body = (
        <div>
          {profileInfo}
          {currentlyBroadcasting}
        </div>
      )
    }
    return (
      <div>
        <Helmet>
          <script src='https://sdk.scdn.co/spotify-player.js' />
        </Helmet>
        {body}
      </div>
    )
  }
}

export default Broadcaster
