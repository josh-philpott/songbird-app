import React from 'react'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'

import isSyncRequired from '../../services/syncRequired'

import Script from 'react-load-script'
import { setupSpotifyWebPlayerCallback } from '../../lib/spotify-web-player'

class ListenerStreamController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      syncInProgress: false
    }
    setupSpotifyWebPlayerCallback(this.setDeviceId.bind(this))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.syncEnabled === true && this.props.syncEnabled === false) {
      //if the stream was paused
      console.log('pausing because sync was disabled')
      spotifyApi.pause()
    }
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

  async handleStreamUpdate(broadcasterCurrentlyPlaying) {
    console.log('handle stream update')
    console.log(broadcasterCurrentlyPlaying)
    if (this.state.handlingUpdate) {
      //if we're already handling a sync, don't pile on
      return
    }

    this.setState({
      handlingUpdate: true
    })

    try {
      const listenerCurrentlyPlaying = await spotifyApi.getCurrentlyPlaying()
      this.props.streamUpdateHandler(broadcasterCurrentlyPlaying)

      const syncRequired = isSyncRequired(
        listenerCurrentlyPlaying,
        broadcasterCurrentlyPlaying,
        this.state.deviceId
      )

      if (syncRequired && this.state.deviceId && this.props.syncEnabled) {
        console.debug('syncing')

        await this.setListener(
          broadcasterCurrentlyPlaying.item.uri,
          broadcasterCurrentlyPlaying.progress_ms,
          broadcasterCurrentlyPlaying.is_playing,
          listenerCurrentlyPlaying.is_playing,
          this.state.deviceId
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        handlingUpdate: false
      })
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
    broadcastApi.registerListener(
      this.props.broadcastId,
      this.handleStreamUpdate.bind(this)
    )
    console.log('listener registered')
  }

  componentDidMount() {
    console.log('component did mount')
  }

  render() {
    return <Script url='https://sdk.scdn.co/spotify-player.js' />
  }
}

export default ListenerStreamController
