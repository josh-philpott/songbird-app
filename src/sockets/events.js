import { socket } from './index'

export const socketEvents = ({ setValue }) => {
  socket.on('message', message => {
    setValue(state => {
      let chatMessages = []
      if (state.chatMessages) {
        chatMessages = [...state.chatMessages, message]
      } else {
        chatMessages = [message]
      }
      return { ...state, chatMessages }
    })
  })

  socket.on('sob', sob => {
    setValue(state => {
      let newState = { ...state }
      if (sob.currentlyPlaying) {
        newState.currentlyPlaying = sob.currentlyPlaying
      }
      if (sob.viewers) {
        newState.viewers = sob.viewers
      }
      if (sob.broadcastMeta) {
        newState.broadcastMeta = sob.broadcastMeta
      }
      console.log('sob update', newState)
      return newState
    })
  })

  socket.on('broadcast updated', currentlyPlaying => {
    setValue(state => {
      const stateCopy = { ...state }
      stateCopy.currentlyPlaying = currentlyPlaying
      stateCopy.broadcastMeta.isSyncEnabled = true
      stateCopy.broadcastMeta.isConnected = true
      return stateCopy
    })
  })

  socket.on('viewers update', async viewers => {
    setValue(state => {
      return { ...state, viewers }
    })
  })

  socket.on('broadcaster paused', async () => {
    setValue(state => {
      const stateCopy = { ...state }
      stateCopy.broadcastMeta.isSyncEnabled = true
      return stateCopy
    })
  })

  socket.on('broadcaster disconnected', async () => {
    setValue(state => {
      const stateCopy = { ...state }
      stateCopy.broadcastMeta.isConnected = false
      return stateCopy
    })
  })
}
