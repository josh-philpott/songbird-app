import { socket } from './index'

export const socketEvents = ({ setValue }) => {
  /* socket.on('broadcast updated', currentlyPlaying => {
        //write function to transform currentlyPlaying to 'songInfo' (probably in API)

        setValue(state => {
            return {...state}//, songInfo}
        });
    })

    
    socket.on('broadcaster disconnected', async () => {
        //await broadcasterDisconnectedCallback()
        // maybe I just need one 'broadcasterUpdate' event and the broadcastInfo contain 'isBroadcasterConnected'
    })

    
    socket.on('viewers update', async viewers => {
        console.log('viewers updated')
        console.log(viewers)
        if (viewersUpdateHandler) {
            await viewersUpdateHandler(viewers)
        }
        setValue(state => {
            return {...state//, viewers}
        });
    })

    //part of broadcasterInfo? isBroadcasterSyncing
    socket.on('broadcaster paused', async () => {
        console.log('got broadcaster paused event')
    })*/

  socket.on('message', message => {
    console.log('got message', message)
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
}
