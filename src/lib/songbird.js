import axios from 'axios'
import Cookies from 'js-cookie'

const spotifyApiBaseUrl = `${process.env.REACT_APP_API_URL}/api/spotify`
const isOfflineMode = process.env.REACT_APP_IS_OFFLINE_MODE === 'true'

const setSpotifyAccessToken = (access_token, expires_in) => {
  // set the expires date
  const expires = new Date()
  expires.setSeconds(expires.getSeconds() + expires_in)

  Cookies.set('spotify_access_token', access_token, {
    expires
  })
}

const fetchSpotifyAccessToken = async (code, state) => {
  console.log('fetch spotfy token')
  if (isOfflineMode) {
    return 'offline'
  }
  console.log(isOfflineMode)
  const response = await axios.post(`${spotifyApiBaseUrl}/getAccessToken`, {
    code,
    state
  })
  const { access_token, expires_in, refresh_token } = response.data

  setSpotifyAccessToken(access_token, expires_in)
  Cookies.set('spotify_refresh_token', refresh_token)

  return response.data
}

const refreshSpotifyToken = async refresh_token => {
  console.log('refresh spotify token')
  if (isOfflineMode) {
    return 'offline'
  }
  const response = await axios.post(`${spotifyApiBaseUrl}/refreshToken`, {
    refresh_token
  })

  const { access_token, expires_in } = response.data
  setSpotifyAccessToken(access_token, expires_in)

  return response.data
}

const fetchSpotifyAuthUri = async () => {
  
  const response = await axios.get(`${spotifyApiBaseUrl}/login`)
  return response.data
}

export default {
  fetchSpotifyAccessToken,
  fetchSpotifyAuthUri,
  refreshSpotifyToken
}
