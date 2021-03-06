import spotifyApi from './spotify'

export const setupSpotifyWebPlayerCallback = onReady => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = spotifyApi.getAccessToken()
    const player = new window.Spotify.Player({
      name: 'Soundbridge',
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
      onReady(device_id)
    })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    console.log('connecting player')
    player.connect()
  }
}
