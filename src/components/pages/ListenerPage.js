import React from 'react'
import SocketProvider from '../socket_context'
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
