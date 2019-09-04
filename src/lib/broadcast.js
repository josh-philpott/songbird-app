import axios from 'axios'
import Cookies from 'js-cookie'
import io from 'socket.io-client'

const broadcastApiUrl = `${process.env.REACT_APP_API_URL}/api/broadcast`

const socket = io('http://localhost:8080')

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
}

const create = async (id, broadcasterName, profileImageUrl) => {
  const broadcastCreatePromise = new Promise((resolve, reject) => {
    console.log('creating broadcast')
    socket.emit(
      'create broadcast',
      id,
      broadcasterName,
      profileImageUrl,
      val => {
        console.log(`broadcast created ${val}`)
        resolve(val)
      }
    ) //TODO: Timeout for reject?
  })

  const broadcastId = await broadcastCreatePromise

  return broadcastId
}

const broadcast = async (broadcastId, currentlyPlaying) => {
  console.log(`update broadcast ${broadcastId}`)
  socket.emit('update broadcast', broadcastId, currentlyPlaying)
}

const registerListener = async (broadcastId, callback) => {
  socket.on('broadcast updated', async currentlyPlaying => {
    await callback(currentlyPlaying)
  })
  socket.emit('join', broadcastId)
}

const listen = async broadcastId => {
  const response = await axios.get(`${broadcastApiUrl}/${broadcastId}`)
  return response.data
}

export default {
  create,
  broadcast,
  listen,
  registerListener
}
