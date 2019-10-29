import React from 'react'

import SocketProvider from '../contexts/socket-context'
import BroadcasterPageInner from './BroadcasterPageInner'

function BroadcasterPage() {
  return (
    <SocketProvider>
      <BroadcasterPageInner />
    </SocketProvider>
  )
}

export default BroadcasterPage
