import React from 'react'
import { Helmet } from 'react-helmet'

import spotifyApi from '../lib/spotify'
import broadcastApi from '../lib/broadcast'

import { initializeSpotifyWebPlayer } from '../lib/spotify-web-player'

const DEBOUNCE_MS = 5000

class Listener extends React.Component {
  constructor(props) {
    super(props)
    initializeSpotifyWebPlayer()
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
    listenerIsPlaying
  ) {
    if (listenerIsPlaying && !broadcasterIsPlaying) {
      //pause listener
      await spotifyApi.pause()
    } else {
      //play listener at broadcaster position
      await spotifyApi.play(broadcasterUri, broadcasterProgressMs)
    }
  }

  async syncPlayback() {
    const listenerStatus = await spotifyApi.getCurrentlyPlaying()
    const broadcasterStatus = await broadcastApi.listen('abc')

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

    console.log(idsEqual)
    console.log(isPlayingEqual)
    console.log(isWithinDebouncePeriod)
    if (!idsEqual || !isPlayingEqual || !isWithinDebouncePeriod) {
      console.log('syncing')
      await this.setListener(
        broadcasterUri,
        broadcasterProgressMs,
        broadcasterIsPlaying,
        listenerIsPlaying
      )
    }
    setTimeout(this.syncPlayback.bind(this), 3000)
  }

  async componentDidMount() {
    const profile = await spotifyApi.getProfileInfo()
    // poll for currently playing track
    this.syncPlayback()

    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profile.images[0].url
    })
  }

  render() {
    let body
    if (this.state.isLoading) {
      body = <div>Loading...</div>
    } else {
      let profileInfo = (
        <div>
          <h1>Hi, {this.state.name}</h1>
          <p>You're in listening mode! Broadcast 'abc'</p>
          <img src={this.state.profileImage} alt='User Profile Photo' />
        </div>
      )

      body = <div>{profileInfo}</div>
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

export default Listener
