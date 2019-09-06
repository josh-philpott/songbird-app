import React, { useState, useEffect } from 'react'
import querystring from 'query-string'

import broadcastApi from '../../lib/broadcast'

import Navbar from '../home/Navbar'

import RoomInfo from './RoomInfo'
import ListenerPlayer from './player/ListenerPlayer'

import styled from 'styled-components'
import { buttonBase } from '../styles/base'

const Body = styled.section`
  margin: 30px auto;
  width: 300px;
  text-align: center;
`

const SyncButton = styled.button`
  width: 238px;
  height: 44px;

  margin: 0px auto;

  ${buttonBase}
`

function Listener(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [isValidBroadcastId, setIsValidBroadcastId] = useState(true)
  const [broadcasterName, setBroadcasterName] = useState('')
  const [broadcastId, setBroadcastId] = useState()
  const [broadcasterProfileImageUrl, setBroadcasterProfileImageUrl] = useState()
  const [syncEnabled, setSyncEnabled] = useState(false)

  const setProfileInfo = async () => {
    const { broadcastId } = querystring.parse(props.location.search)
    const broadcastInfo = await broadcastApi.getBroadcastInfo(broadcastId)

    if (broadcastInfo) {
      setBroadcastId(broadcastId)
      setBroadcasterName(broadcastInfo.broadcasterName)
      setBroadcasterProfileImageUrl(broadcastInfo.profileImageUrl)
      setIsLoading(false)
    } else {
      setIsValidBroadcastId(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setProfileInfo()
  })

  const toggleSyncEnabled = () => {
    setSyncEnabled(!syncEnabled)
  }

  const handleBroadcastStatusChange = broadcasting => {
    setIsBroadcasting(broadcasting)
  }

  if (isLoading) {
    return <Body>Loading...</Body>
  } else {
    if (!isValidBroadcastId) return <Body>Not a valid broadcast id...</Body>
    else {
      return (
        <>
          <Navbar loggedIn={true} />
          <RoomInfo
            broadcasterProfileImage={broadcasterProfileImageUrl}
            broadcasterName={broadcasterName}
            isBroadcasting={isBroadcasting}
          />

          {syncEnabled ? (
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

          <ListenerPlayer
            broadcastId={broadcastId}
            syncEnabled={syncEnabled}
            handleBroadcastStatusChange={handleBroadcastStatusChange.bind(this)}
          />
        </>
      )
    }
  }
}

export default Listener
