import axios from 'axios'
import Cookies from 'js-cookie'
import io from 'socket.io-client'

const broadcastApiUrl = `${process.env.REACT_APP_API_URL}/api/broadcast`
const socket = io(process.env.REACT_APP_API_URL)

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
}

const init = async (id, broadcasterName, profileImageUrl) => {
  const broadcastCreatePromise = new Promise((resolve, reject) => {
    console.log('creating broadcast')
    socket.emit('init broadcast', id, broadcasterName, profileImageUrl, val => {
      console.log(`broadcast created ${val}`)
      resolve(val)
    }) //TODO: Timeout for reject?
  })

  const broadcastId = await broadcastCreatePromise

  return broadcastId
}

const broadcast = async (broadcastId, currentlyPlaying) => {
  socket.emit('update broadcast', broadcastId, currentlyPlaying)
}

const pauseBroadcast = async broadcastId => {
  console.log('emiting broadcaster paused')
  socket.emit('pause broadcast', broadcastId)
}

const registerListener = async (
  broadcastId,
  isBroadcaster,
  broadcastUpdatedCallback,
  viewersUpdateHandler,
  broadcasterDisconnectedCallback,
  listenerProfileInfo
) => {
  socket.on('broadcast updated', async currentlyPlaying => {
    await broadcastUpdatedCallback(currentlyPlaying)
  })

  socket.on('broadcaster disconnected', async () => {
    await broadcasterDisconnectedCallback()
  })

  socket.on('viewers update', async viewers => {
    console.log('viewers updated')
    console.log(viewers)
    if (viewersUpdateHandler) {
      await viewersUpdateHandler(viewers)
    }
  })

  socket.on('broadcaster paused', async () => {
    console.log('got broadcaster paused event')
  })

  if (listenerProfileInfo) {
    socket.emit(
      'join',
      broadcastId,
      isBroadcaster,
      listenerProfileInfo.id,
      listenerProfileInfo.name,
      listenerProfileInfo.imageUrl
    )
  } else {
    socket.emit('join', broadcastId, isBroadcaster)
  }
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
  broadcast,
  getActiveBroadcasts,
  getBroadcastInfo,
  init,
  pauseBroadcast,
  registerListener
}
