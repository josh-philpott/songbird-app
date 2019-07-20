import axios from 'axios'
import Cookies from 'js-cookie'

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
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
  getAccessToken,
  getCurrentlyPlaying,
  getProfileInfo,
  pause,
  play
}
