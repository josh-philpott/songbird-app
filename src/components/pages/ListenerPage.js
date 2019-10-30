import React from 'react'
import SocketProvider from '../contexts/socket-context'
import UserProvider from '../contexts/user-context'
import querystring from 'query-string'
import ListenerPageInner from './ListenerPageInner'

function ListenerPage(props) {
  const { broadcastId } = querystring.parse(props.location.search)

  return (
    <SocketProvider>
      <UserProvider>
        <ListenerPageInner broadcastId={broadcastId} />
      </UserProvider>
    </SocketProvider>
  )
}

export default ListenerPage
