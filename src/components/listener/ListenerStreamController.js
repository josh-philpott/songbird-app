import React from 'react'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'

import Script from 'react-load-script'
import { setupSpotifyWebPlayerCallback } from '../../lib/spotify-web-player'

const DEBOUNCE_MS = 5000
const IS_DEV_MODE = process.env.REACT_APP_DEV_MODE === 'true'

class ListenerStreamController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    setupSpotifyWebPlayerCallback(this.setDeviceId.bind(this))
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
    if (!this.props.broadcastId) return

    try {
      const listenerStatus = await spotifyApi.getCurrentlyPlaying()

      const broadcast = await broadcastApi.listen(this.props.broadcastId)
      const broadcasterStatus = broadcast.currentlyPlaying

      this.props.streamUpdateHandler(broadcasterStatus)

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
        isWebPlayerReady &&
        this.props.syncEnabled &&
        !IS_DEV_MODE
      ) {
        console.debug('syncing')
        await this.setListener(
          broadcasterUri,
          broadcasterProgressMs,
          broadcasterIsPlaying,
          listenerIsPlaying,
          this.state.deviceId
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(this.syncPlayback.bind(this), 500)
    }
  }

  /**
   * Receives the device ID from the Spotify Web Player
   * @param {} deviceId
   */
  setDeviceId(deviceId) {
    console.debug(`Spotify Web Player Ready with Device ID: ${deviceId}!`)
    this.setState({
      deviceId
    })
  }

  async componentDidMount() {
    this.syncPlayback()
  }

  render() {
    return <Script url='https://sdk.scdn.co/spotify-player.js' />
  }
}

export default ListenerStreamController
