import React from 'react'
import querystring from 'query-string'

import Navbar from '../Navbar'
import Room from '../room/Room'

function ListenerPage(props) {
  const { broadcastId } = querystring.parse(props.location.search)
  console.log(broadcastId)

  return (
    <>
      <Navbar loggedIn={true} />
      <Room isBroadcaster={false} broadcastId={broadcastId} />
    </>
  )
}

export default ListenerPage
