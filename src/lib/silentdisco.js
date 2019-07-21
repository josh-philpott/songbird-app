import axios from 'axios'
import Cookies from 'js-cookie'

const spotifyApiBaseUrl = `${process.env.REACT_APP_API_URL}/api/spotify`

const fetchSpotifyAccessToken = async (code, state) => {
  const response = await axios.post(`${spotifyApiBaseUrl}/getAccessToken`, {
    code,
    state
  })

  Cookies.set('spotify_access_token', response.data.access_token, {
    maxAge: response.data.expires_in * 1000
  })
  Cookies.set('spotify_refresh_token', response.data.refresh_token)

  return response.data
}

const fetchSpotifyAuthUri = async () => {
  const response = await axios.get(`${spotifyApiBaseUrl}/login`)
  return response.data
}

export default { fetchSpotifyAccessToken, fetchSpotifyAuthUri }
