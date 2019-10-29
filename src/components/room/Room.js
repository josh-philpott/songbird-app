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

const RoomContainer = styled.section`
  /*margin: 40px auto;*/
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-bottom: 20px;
  }
`

function Room(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [syncEnabled, setSyncEnabled] = useState(false)

  const {
    broadcastId,
    displayName: broadcasterName,
    profileImageUrl: broadcasterProfileImageUrl
  } = props.broadcastMeta

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

  const toggleSyncEnabled = () => {
    setSyncEnabled(!syncEnabled)
  }

  if (isLoading) {
    return <Body>Loading...</Body>
  } else {
    return (
      <RoomContainer>
        {props.isBroadcaster ? (
          <></>
        ) : syncEnabled ? (
          <SyncButton onClick={toggleSyncEnabled.bind(this)}>
            <span>pause broadcast</span>
          </SyncButton>
        ) : (
          <SyncButton onClick={toggleSyncEnabled.bind(this)}>
            <img
              src={process.env.PUBLIC_URL + '/img/play-icon.svg'}
              alt='play'
            />
            <span>play broadcast</span>
          </SyncButton>
        )}

        <Player
          isBroadcaster={props.isBroadcaster}
          broadcastMeta={props.broadcastMeta}
          currentlyPlaying={props.currentlyPlaying}
          syncEnabled={syncEnabled}
          listenerProfileInfo={listenerProfileInfo}
          toggleBroadcastEnabled={props.toggleBroadcastEnabled}
          broadcastEnabled={props.broadcastEnabled}
        />
      </RoomContainer>
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
