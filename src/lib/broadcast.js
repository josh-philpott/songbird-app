import axios from 'axios'
import Cookies from 'js-cookie'

const broadcastApiUrl = 'http://localhost:3001/api/broadcast'

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
}
const broadcast = async currentlyPlaying => {
  const response = await axios.post(
    `${broadcastApiUrl}/update`,
    {
      currentlyPlaying
    },
    {
      headers: { Authorization: 'Bearer ' + getAccessToken() }
    }
  )
  return response.data
}

const listen = async broadcastId => {
  const response = await axios.get(`${broadcastApiUrl}/${broadcastId}`)
  return response.data
}

export default {
  broadcast,
  listen
}
