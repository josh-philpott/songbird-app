import React, { useState, useEffect } from 'react'
import querystring from 'query-string'
import styled from 'styled-components'

import broadcastApi from '../../lib/broadcast'
import spotifyApi from '../../lib/spotify'

import { buttonBase } from '../styles/base'
import Navbar from '../home/Navbar'
import RoomInfo from '../listener/RoomInfo'
import ListenerPlayer from '../listener/player/ListenerPlayer'

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

const PageGrid = styled.section`
  margin: 40px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-bottom: 20px;
  }
`

function Listener(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [isValidBroadcastId, setIsValidBroadcastId] = useState(true)
  const [broadcasterName, setBroadcasterName] = useState('')
  const [broadcastId, setBroadcastId] = useState()
  const [broadcasterProfileImageUrl, setBroadcasterProfileImageUrl] = useState()
  const [syncEnabled, setSyncEnabled] = useState(false)
  const [viewers, setViewers] = useState([])

  const [listenerProfileInfo, setListenerProfileInfo] = useState({
    id: '',
    imageUrl: '',
    name: ''
  })

  const setBroadcasterInfo = async () => {
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

  const fetchListenerProfileInfo = async () => {
    console.log('fetching listener profile')
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
    console.log('fetch broadcaster info effect')
    setBroadcasterInfo()
  }, [])

  useEffect(() => {
    console.log('fetch listener effect')
    fetchListenerProfileInfo()
  }, [])

  const toggleSyncEnabled = () => {
    setSyncEnabled(!syncEnabled)
  }

  const handleBroadcastStatusChange = broadcasting => {
    setIsBroadcasting(broadcasting)
  }

  const handleViewersUpdate = viewers => {
    setViewers(viewers)
    console.log('set viewers')
    console.log(viewers)
  }

  //TODO: Fix the styling here. This element should define the placement of the components
  //below it!
  if (isLoading) {
    return <Body>Loading...</Body>
  } else {
    if (!isValidBroadcastId) return <Body>Not a valid broadcast id...</Body>
    else {
      return (
        <>
          <Navbar loggedIn={true} />
          <PageGrid>
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
              handleBroadcastStatusChange={handleBroadcastStatusChange.bind(
                this
              )}
              handleViewersUpdate={handleViewersUpdate.bind(this)}
              listenerProfileInfo={listenerProfileInfo}
              viewers={viewers}
            />
          </PageGrid>
        </>
      )
    }
  }
}

export default Listener
