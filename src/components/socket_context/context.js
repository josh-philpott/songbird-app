import React, { createContext } from 'react'

const SocketContext = createContext({
  chatMessages: [],
  sendMessage: () => {}
  /*  songInfo,
  broadcasterInfo,
  viewers,
  setBroadcasterSyncEnabled: () => {},
  sendMessage: () => {}*/
})

export default SocketContext
