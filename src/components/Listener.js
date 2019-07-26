import React from 'react'
import { Helmet } from 'react-helmet'
import querystring from 'query-string'

import spotifyApi from '../lib/spotify'
import broadcastApi from '../lib/broadcast'

import Script from 'react-load-script'
import { setupSpotifyWebPlayerCallback } from '../lib/spotify-web-player'

const DEBOUNCE_MS = 5000

class Listener extends React.Component {
  constructor(props) {
    super(props)
    setupSpotifyWebPlayerCallback(this.setDeviceId.bind(this))
    this.state = {
      isLoading: true
    }
  }

  isWithinDebouncePeriod(listenerProgressMs, broadcasterProgressMs) {
    const diff = Math.abs(broadcasterProgressMs - listenerProgressMs)
    return diff < DEBOUNCE_MS
  }

  async setListener(
    broadcasterUri,
    broadcasterProgressMs,
    broadcasterIsPlaying,
    listenerIsPlaying,
    deviceId
  ) {
    if (listenerIsPlaying && !broadcasterIsPlaying) {
      //pause listener
      await spotifyApi.pause()
    } else {
      //play listener at broadcaster position
      await spotifyApi.play(broadcasterUri, broadcasterProgressMs, deviceId)
    }
  }

  async syncPlayback() {
    if (!this.state.broadcastId) return

    const listenerStatus = await spotifyApi.getCurrentlyPlaying()
    const broadcasterStatus = await broadcastApi.listen(this.state.broadcastId)

    const listenerId = listenerStatus.id
    const listenerProgressMs = listenerStatus.progress_ms
    const listenerIsPlaying = listenerStatus.is_playing

    const broadcasterId = broadcasterStatus.id
    const broadcasterUri = broadcasterStatus.item.uri
    const broadcasterProgressMs = broadcasterStatus.progress_ms
    const broadcasterIsPlaying = broadcasterStatus.is_playing

    const idsEqual = listenerId === broadcasterId
    const isPlayingEqual = listenerIsPlaying === broadcasterIsPlaying
    const isWithinDebouncePeriod = this.isWithinDebouncePeriod(
      listenerProgressMs,
      broadcasterProgressMs
    )

    const isWebPlayerReady = this.state.deviceId

    if (
      (!idsEqual || !isPlayingEqual || !isWithinDebouncePeriod) &&
      isWebPlayerReady
    ) {
      console.log('syncing')
      await this.setListener(
        broadcasterUri,
        broadcasterProgressMs,
        broadcasterIsPlaying,
        listenerIsPlaying,
        this.state.deviceId
      )
    }
    setTimeout(this.syncPlayback.bind(this), 3000)
  }

  /**
   * Receives the device ID from the Spotify Web Player
   * @param {} deviceId
   */
  setDeviceId(deviceId) {
    console.log(`Spotify Web Player Ready with Device ID: ${deviceId}!`)
    this.setState({
      deviceId
    })
  }

  async componentDidMount() {
    const { broadcastId } = querystring.parse(this.props.location.search)
    const profile = await spotifyApi.getProfileInfo()
    // poll for currently playing track

    const profileImage =
      profile.images && profile.images[0] && profile.images[0].url
        ? profile.images[0].url
        : ''

    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage,
      broadcastId
    })

    this.syncPlayback()
  }

  render() {
    let body
    if (this.state.isLoading) {
      body = <div>Loading...</div>
    } else {
      let profileInfo = (
        <div>
          <h1>Hi, {this.state.name}</h1>
          <p>You're in listening mode! Broadcast {this.state.broadcastId}</p>
          <img src={this.state.profileImage} alt='User Profile Photo' />
        </div>
      )

      body = (
        <div>
          {profileInfo}
          <Script url='https://sdk.scdn.co/spotify-player.js' />
        </div>
      )
    }
    return <div>{body}</div>
  }
}

export default Listener
