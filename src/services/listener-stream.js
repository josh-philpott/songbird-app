import spotifyApi from '../../lib/spotify'

const DEBOUNCE_MS = 5000
const IS_DEV_MODE = process.env.REACT_APP_DEV_MODE === 'true'

class ListenerStream {
  constructor(broadcastId, deviceId, streamUpdateHandler) {
    this.broadcastId = broadcastId
    this.lastUpdated = null
    this.deviceId = deviceId
    this.streamUpdateHandler = streamUpdateHandler
    this.syncEnabled = false
  }

  isWithinDebouncePeriod() {
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

  setSyncEnabled(enabled) {
    this.syncEnabled = enabled
  }

  setDeviceId(deviceId) {
    this.deviceId = deviceId
  }

  async syncPlaybackLoop() {
    try {
      const listenerStatus = await spotifyApi.getCurrentlyPlaying()

      const broadcast = await broadcastApi.listen(this.broadcastId)

      if (broadcast.lastUpdated !== this.lastUpdated) {
        this.lastUpdated = broadcast.lastUpdated
        const broadcasterStatus = broadcast.currentlyPlaying

        this.streamUpdateHandler(broadcasterStatus)

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

        const isWebPlayerReady = this.deviceId

        if (
          (!idsEqual || !isPlayingEqual || !isWithinDebouncePeriod) &&
          isWebPlayerReady &&
          this.syncEnabled &&
          !IS_DEV_MODE
        ) {
          console.debug('syncing')
          await this.setListener(
            broadcasterUri,
            broadcasterProgressMs,
            broadcasterIsPlaying,
            listenerIsPlaying,
            deviceId
          )
        }
      } else {
        console.log('equal')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(
        this.syncPlaybackLoop(
          broadcastId,
          lastUpdated,
          deviceId,
          streamUpdateHandler
        ),
        500
      )
    }
  }
}

export default ListenerStream
