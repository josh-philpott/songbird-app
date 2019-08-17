import React from 'react'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'

import Script from 'react-load-script'
import { setupSpotifyWebPlayerCallback } from '../../lib/spotify-web-player'
import ListenerStream from '../../services/listener-stream'

const DEBOUNCE_MS = 5000
const IS_DEV_MODE = process.env.REACT_APP_DEV_MODE === 'true'

class ListenerStreamController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastUpdated: null
    }
    this.listenerStream = new ListenerStream(
      this.props.broadcastId,
      this.props.streamUpdateHandler
    )
    setupSpotifyWebPlayerCallback(this.setDeviceId.bind(this))
  }

  //TODO: You'll need to add an 'setSyncEnabled' to the ListnerStreamController and handle this, finish hooking up listener-stream service, remove extra things from here
  componentDidUpdate(prevProps) {
    if (prevProps.syncEnabled === true && this.props.syncEnabled === false) {
      //if the stream was paused
      console.log('pausing because sync was disabled')
      spotifyApi.pause()
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
