import React, { useState, useEffect } from 'react'
import SocketContext from './context'
import { initSockets } from '../../../sockets'

const SocketProvider = props => {
  const [value, setValue] = useState({
    broadcastMeta: {},
    currentlyPlaying: {},
    chatMessages: [],
    sendMessage: () => {},
    initBroadcast: () => {},
    sendCurrentlyPlayingUpdate: () => {},
    subscribeAsBroadcaster: () => {},
    subscribeAsListener: () => {},
    pauseBroadcase: () => {}
  })

  useEffect(() => {
    initSockets({ setValue })
  }, [initSockets])

  useEffect(() => {
    console.log('Broadcast state changed: ', value)
  }, [value])

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
