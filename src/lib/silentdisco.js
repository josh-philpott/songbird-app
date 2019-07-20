import axios from 'axios'

const spotifyApiBaseUrl = `${process.env.REACT_APP_API_URL}/api/spotify`

const fetchSpotifyAccessToken = async (code, state) => {
  const response = await axios.post(
    `${spotifyApiBaseUrl}/getAccessToken`,
    {
      code,
      state
    },
    {
      withCredentials: true
    }
  )

  return response.data
}

const fetchSpotifyAuthUri = async () => {
  const response = await axios.get(`${spotifyApiBaseUrl}/login`, {
    withCredentials: true
  })
  return response.data
}

export default { fetchSpotifyAccessToken, fetchSpotifyAuthUri }
