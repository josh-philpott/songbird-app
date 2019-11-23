import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import broadcastApi from '../../lib/broadcast'
import spotifyApi from '../../lib/spotify'

import { buttonBase } from '../styles/base'
import Player from './player/Player'

const Body = styled.section`
  margin: 30px auto;
  width: 300px;
  text-align: center;
  background-color: #171716;
`

const SyncButton = styled.button`
  width: 238px;
  height: 44px;
  ${buttonBase}
`

function Room(props) {
  const [isLoading, setIsLoading] = useState(true)

  const [listenerProfileInfo, setListenerProfileInfo] = useState({
    id: '',
    imageUrl: '',
    name: ''
  })

  const setBroadcasterInfo = async () => {
    const broadcastId = props.broadcastId
    const broadcastInfo = await broadcastApi.getBroadcastInfo(broadcastId)

    if (broadcastInfo) {
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  const fetchListenerProfileInfo = async () => {
    const profile = await spotifyApi.getProfileInfo()
    if (profile) {
      const profileImageUrl = spotifyApi.extractProfileImage(profile)

      setListenerProfileInfo({
        id: profile.id,
        imageUrl: profileImageUrl,
        name: profile.display_name
      })
    }
  }

  useEffect(() => {
    setBroadcasterInfo()
  }, [])

  useEffect(() => {
    fetchListenerProfileInfo()
  }, [])

  if (isLoading) {
    return <Body>Loading...</Body>
  } else {
    console.log(props.viewers)
    return (
      <Player
        isBroadcaster={props.isBroadcaster}
        broadcastMeta={props.broadcastMeta}
        currentlyPlaying={props.currentlyPlaying}
        listenerProfileInfo={listenerProfileInfo}
        toggleBroadcastEnabled={props.toggleBroadcastEnabled}
        broadcastEnabled={props.broadcastEnabled}
        viewerCount={props.viewers.length}
      />
    )
  }
}

export default Room

Room.propTypes = {
  isBroadcaster: PropTypes.bool,
  broadcastId: PropTypes.string,
  toggleBroadcastEnabled: PropTypes.func,
  broadcastEnabled: PropTypes.bool
}
