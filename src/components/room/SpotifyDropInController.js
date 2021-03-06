import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import spotifyApi from '../../lib/spotify'

import isSyncRequired from '../../services/syncRequired'

import Script from 'react-load-script'
import { setupSpotifyWebPlayerCallback } from '../../lib/spotify-web-player'

function SpotifyDropInController(props) {
  const [syncInProgress, setSyncInProgress] = useState(false)
  const [deviceId, setDeviceId] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setupSpotifyWebPlayerCallback(setDeviceId)
  }, [])

  useEffect(() => {
    if (!props.syncEnabled) {
      if (isPlaying) {
        console.log('pausing because sync is not enabled')
        spotifyApi.pause()
      }
    } else {
      sendPlayCommandIfRequired()
    }
  }, [props.syncEnabled, props.broadcasterCurrentlyPlaying, deviceId])

  useEffect(() => {
    console.log(
      'SpotifyController: broadcaster update ',
      props.broadcasterCurrentlyPlaying
    )
  }, [props.broadcasterCurrentlyPlaying])

  const sendSpotifyCommand = async (
    broadcasterUri,
    broadcasterProgressMs,
    broadcasterIsPlaying,
    listenerIsPlaying,
    deviceId
  ) => {
    console.log(`sendSpotifyCommand: deviceId: ${deviceId}`)
    if (listenerIsPlaying && !broadcasterIsPlaying) {
      //pause listener
      await spotifyApi.pause()
      setIsPlaying(false)
    } else {
      //play listener at broadcaster position
      await spotifyApi.play(broadcasterUri, broadcasterProgressMs, deviceId)
      setIsPlaying(true)
    }
  }

  /** I may be able to chill this logic out now that I've moved most of it to the server */
  const sendPlayCommandIfRequired = async () => {
    if (syncInProgress || !props.syncEnabled || !deviceId) return
    try {
      setSyncInProgress(true)
      const { broadcasterCurrentlyPlaying } = props
      const listenerCurrentlyPlaying = await spotifyApi.getCurrentlyPlaying()

      console.log(broadcasterCurrentlyPlaying)
      console.log(listenerCurrentlyPlaying)

      const syncRequired = isSyncRequired(
        listenerCurrentlyPlaying,
        broadcasterCurrentlyPlaying,
        deviceId
      )

      if (syncRequired) {
        await sendSpotifyCommand(
          broadcasterCurrentlyPlaying.item.uri,
          broadcasterCurrentlyPlaying.progress_ms,
          broadcasterCurrentlyPlaying.is_playing,
          listenerCurrentlyPlaying.is_playing,
          deviceId
        )
      }
    } finally {
      setSyncInProgress(false)
    }
  }

  return <Script url='https://sdk.scdn.co/spotify-player.js' />
}

export default SpotifyDropInController

SpotifyDropInController.propTypes = {
  syncEnabled: PropTypes.bool,
  broadcasterCurrentlyPlaying: PropTypes.object
}
