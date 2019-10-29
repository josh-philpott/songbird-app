import React from 'react'
import SocketProvider from '../contexts/socket-context'
import querystring from 'query-string'
import ListenerPageInner from './ListenerPageInner'

function ListenerPage(props) {
  const { broadcastId } = querystring.parse(props.location.search)

  return (
    <SocketProvider>
      <ListenerPageInner broadcastId={broadcastId} />
    </SocketProvider>
  )
}

export default ListenerPage
