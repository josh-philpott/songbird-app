import axios from 'axios'
import Cookies from 'js-cookie'

const broadcastApiUrl = `${process.env.REACT_APP_API_URL}/api/broadcast`

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
}

const create = async () => {
  const response = await axios.post(`${broadcastApiUrl}/create`)
  return response.data
}

const broadcast = async currentlyPlaying => {
  const response = await axios.put(
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
  create,
  broadcast,
  listen
}
