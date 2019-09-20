import axios from 'axios'
import Cookies from 'js-cookie'

import songbridgeApi from './songbird'

const getAccessToken = async () => {
  //Check and see if an access_token is available
  const storedAccessToken = Cookies.get('spotify_access_token')
  const refreshToken = Cookies.get('spotify_refresh_token')

  if (storedAccessToken) {
    return storedAccessToken
  } else if (refreshToken) {
    await songbridgeApi.refreshSpotifyToken(refreshToken)
    return Cookies.get('spotify_access_token')
  } else {
    window.location.assign('/')
  }
}

const getProfileInfo = async () => {
  const accessToken = await getAccessToken()
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })

  return response.data
}

const getCurrentlyPlaying = async () => {
  const accessToken = await getAccessToken()
  const response = await axios.get(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
  return response.data
}

const pause = async () => {
  const accessToken = await getAccessToken()
  await axios.put(
    'https://api.spotify.com/v1/me/player/pause',
    {},
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
}

const play = async (uri, position_ms, deviceId) => {
  const accessToken = await getAccessToken()
  await axios.put(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      uris: [uri],
      position_ms
      //TODO: I need to control the device here... We'll need a UI element for that as well
    },
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
}

//utils
const extractProfileImage = profile => {
  return profile && profile.images && profile.images[0]
    ? profile.images[0].url
    : ''
}

export default {
  // Spotify API Requests
  getAccessToken,
  getCurrentlyPlaying,
  getProfileInfo,
  pause,
  play,
  // Utility functions
  extractProfileImage
}
