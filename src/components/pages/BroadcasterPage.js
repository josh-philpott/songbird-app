import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'
import { H1, H2, P } from '../styles/base'
import Navbar from '../Navbar'
import Room from '../room/Room'
import Chat from '../chat/Chat'

const PageContainer = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;

  /*background-image: radial-gradient(
    circle 274px at 7.4% 17.9%,
    rgba(82, 107, 248, 1) 0.3%,
    rgba(167, 139, 252, 1) 90.5%
  );*/

  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(40, 30, 30, 1) 0%,
    rgba(30, 30, 30, 1) 40%,
    rgba(15, 15, 15, 1) 90%
  );

  /** I really like this gradient I commented out
  background: #a8ff78; /* fallback for old browsers */
  /**background: -webkit-linear-gradient(
    to right,
    #78ffd6,
    #a8ff78
  ); /* Chrome 10-25, Safari 5.1-6 */
  /**background: linear-gradient(
    to right,
    #78ffd6,
    #a8ff78
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const NoiseOverlay = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background-repeat: repeat;
  background-image: url(${process.env.PUBLIC_URL + '/img/otis-redding.png'});
  opacity: 0.1;
`

const RoomContainer = styled.section`
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
`

const ChatContainer = styled.section`
  height: 100%;
  width: 350px;
  background-color: #151515;
  border-left: 1px solid #303030;
  z-index: 100;
`

function BroadcasterPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [broadcastEnabled, setBroadcastEnabled] = useState(true)
  const [broadcastId, setBroadcastId] = useState('')

  const broadcastEnabledRef = useRef(broadcastEnabled)
  broadcastEnabledRef.current = broadcastEnabled

  const getBroadcastEnabled = () => {
    return broadcastEnabled
  }

  const getBroadcastId = () => {
    return broadcastId
  }

  const fetchSpotifyProfileAndCreateBroadcast = async () => {
    const profile = await spotifyApi.getProfileInfo()
    const profileImageUrl = spotifyApi.extractProfileImage(profile)
    const newBroadcastId = await broadcastApi.init(
      profile.id,
      profile.display_name,
      profileImageUrl
    )

    console.log(`[BroadcasterPage] broadcast ${newBroadcastId} initialized`)

    setBroadcastId(newBroadcastId)
    setIsLoading(false)

    await broadcast(newBroadcastId, getBroadcastEnabled)
  }

  const broadcast = async (broadcastId, getBroadcastEnabled) => {
    if (broadcastEnabledRef.current) {
      console.debug(`[BroadcasterPage] updating broadcast ${broadcastId}`)
      const currentlyPlaying = await spotifyApi.getCurrentlyPlaying()
      await broadcastApi.broadcast(broadcastId, currentlyPlaying)
    }
    setTimeout(broadcast.bind(this, broadcastId, getBroadcastEnabled), 1000)
  }

  const toggleBroadcastEnabled = () => {
    setBroadcastEnabled(!broadcastEnabled)
    broadcastEnabledRef.current = broadcastEnabled
  }

  useEffect(() => {
    fetchSpotifyProfileAndCreateBroadcast()
  }, [])

  useEffect(() => {
    if (!broadcastEnabled) {
      broadcastApi.pauseBroadcast(broadcastId)
    }
  }, [broadcastEnabled])

  if (isLoading) {
    return <H1>Loading...</H1>
  } else {
    return (
      <>
        <PageContainer>
          <RoomContainer>
            <Room
              isBroadcaster={true}
              broadcastId={broadcastId}
              toggleBroadcastEnabled={toggleBroadcastEnabled}
              broadcastEnabled={broadcastEnabled}
            />
          </RoomContainer>
          <ChatContainer>
            <Chat />
          </ChatContainer>
        </PageContainer>
        <NoiseOverlay />
      </>
    )
  }
}

export default BroadcasterPage
