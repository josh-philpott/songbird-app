import axios from 'axios'
import Cookies from 'js-cookie'

const broadcastApiUrl = `${process.env.REACT_APP_API_URL}/api/broadcast`

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
}

const getBroadcastInfo = async broadcastId => {
  const response = await axios.get(`${broadcastApiUrl}/${broadcastId}`)
  return response.data
}

const getActiveBroadcasts = async () => {
  const response = await axios.get(`${broadcastApiUrl}/list`)
  return response.data
}

export default {
  getActiveBroadcasts,
  getBroadcastInfo
}
