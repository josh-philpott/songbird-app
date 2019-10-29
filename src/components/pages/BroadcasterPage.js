import React from 'react'

import SocketProvider from '../socket_context'
import BroadcasterPageInner from './BroadcasterPageInner'

function BroadcasterPage() {
  return (
    <SocketProvider>
      <BroadcasterPageInner />
    </SocketProvider>
  )
}

export default BroadcasterPage
