import React, { createContext } from 'react'

const SocketContext = createContext({
  chatMessages: [],
  sendMessage: () => {},
  initBroadcast: () => {},
  sendCurrentlyPlayingUpdate: () => {},
  subscribeAsBroadcaster: () => {},
  subscribeAsListener: () => {},
  pauseBroadcast: () => {}
  /*  songInfo,
  broadcasterInfo,
  viewers,
  setBroadcasterSyncEnabled: () => {},
  sendMessage: () => {}*/
})

export default SocketContext
