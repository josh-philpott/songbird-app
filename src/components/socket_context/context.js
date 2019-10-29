import React, { createContext } from 'react'

const SocketContext = createContext({
  chatMessages: [],
  sendMessage: () => {},
  initBroadcast: () => {},
  sendCurrentlyPlayingUpdate: () => {},
  subscribeAsBroadcaster: () => {},
  pauseBroadcast: () => {}
  /*  songInfo,
  broadcasterInfo,
  viewers,
  setBroadcasterSyncEnabled: () => {},
  sendMessage: () => {}*/
})

export default SocketContext
