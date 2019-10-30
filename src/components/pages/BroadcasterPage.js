import React from 'react'

import SocketProvider from '../contexts/socket-context'
import UserProvider from '../contexts/user-context'
import BroadcasterPageInner from './BroadcasterPageInner'

function BroadcasterPage() {
  return (
    <SocketProvider>
      <UserProvider>
        <BroadcasterPageInner />
      </UserProvider>
    </SocketProvider>
  )
}

export default BroadcasterPage
