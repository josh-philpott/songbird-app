import axios from 'axios'

const fetchSpotifyAccessToken = async (code, state) => {
  const response = await axios.post(
    'http://localhost:3001/api/spotify/getAccessToken',
    {
      code,
      state
    }
  )

  return response.data
}

const fetchSpotifyAuthUri = async () => {
  const response = await axios.get('http://localhost:3001/api/spotify/login')
  return response.data
}

export default { fetchSpotifyAccessToken, fetchSpotifyAuthUri }
