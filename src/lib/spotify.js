import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

const CLIENT_ID = 'b272fc29d92a4976b7e672079986f602'

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
}

const generateSpotifyAuthLink = () => {
  const generateRandomString = length => {
    var text = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  var state = generateRandomString(16)
  var stateKey = 'spotify_auth_state'

  document.cookie = `${stateKey}=${state};max-age=604800;domain=localhost:3001`

  // your application requests authorization
  const redirectUri = 'http://localhost:3001/spotify/callback'
  var scope =
    'user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state'
  return `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: redirectUri,
    state: state
  })}`
}

const getProfileInfo = async () => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + getAccessToken() }
  })

  return response.data
}

const getCurrentlyPlaying = async () => {
  const response = await axios.get(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: { Authorization: 'Bearer ' + getAccessToken() }
    }
  )
  return response.data
}

const pause = async () => {
  await axios.put(
    'https://api.spotify.com/v1/me/player/pause',
    {},
    {
      headers: { Authorization: 'Bearer ' + getAccessToken() }
    }
  )
}

const play = async (uri, position_ms) => {
  await axios.put(
    'https://api.spotify.com/v1/me/player/play',
    {
      uris: [uri],
      position_ms
      //TODO: I need to control the device here... We'll need a UI element for that as well
    },
    {
      headers: { Authorization: 'Bearer ' + getAccessToken() }
    }
  )
}

export default {
  generateSpotifyAuthLink,
  getAccessToken,
  getCurrentlyPlaying,
  getProfileInfo,
  pause,
  play
}
