import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'

import spotifyApi from '../../lib/spotify'
import { H1 } from '../styles/base'
import Room from '../room/Room'
import Chat from '../chat/Chat'
import SocketContext from '../contexts/socket-context/context'

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
  z-index: 100;
`

function BroadcasterPageInner() {
  const [isLoading, setIsLoading] = useState(true)
  const [broadcastId, setBroadcastId] = useState('')
  const [broadcastEnabled, setBroadcastEnabled] = useState(true)

  const {
    //broadcast subscription return
    broadcastMeta,
    currentlyPlaying,
    viewers,

    //subscription
    subscribeAsBroadcaster,

    //broadcast control functions
    pauseBroadcast,
    initBroadcast,
    sendCurrentlyPlayingUpdate
  } = useContext(SocketContext)

  /**
   * These are being used within the timer function and get updated when SocketContext is initialized so
   * I'm using a ref to access them. I feel like there must be a better way to do this?
   */
  const broadcastEnabledRef = useRef(broadcastEnabled)
  broadcastEnabledRef.current = broadcastEnabled

  const sendCurrentlyPlayingUpdateRef = useRef(sendCurrentlyPlayingUpdate)
  sendCurrentlyPlayingUpdateRef.current = sendCurrentlyPlayingUpdate

  const broadcastIdRef = useRef(broadcastId)
  broadcastIdRef.current = broadcastId

  const pauseBroadcastRef = useRef(pauseBroadcast)
  pauseBroadcastRef.current = pauseBroadcast

  /**
   * broadcastEnabled indicates if the broadcaster is sending stream updates or not
   */
  const toggleBroadcastEnabled = () => {
    setBroadcastEnabled(!broadcastEnabled)
    broadcastEnabledRef.current = broadcastEnabled
  }

  useEffect(() => {
    const initializeBroadcast = async () => {
      //initialize the broadcast on component load
      const profile = await spotifyApi.getProfileInfo()
      const profileImageUrl = spotifyApi.extractProfileImage(profile)
      const newBroadcastId = await initBroadcast(
        profile.id,
        profile.display_name,
        profileImageUrl
      )

      console.log(`[BroadcasterPage] broadcast ${profile.id} initialized`)
      setBroadcastId(profile.id)
      setIsLoading(false)
      subscribeAsBroadcaster(profile.id)
    }
    initializeBroadcast()
  }, [initBroadcast])

  useEffect(() => {
    const interval = setInterval(async () => {
      const broadcastId = broadcastIdRef.current
      if (broadcastId && broadcastEnabledRef.current) {
        console.debug(`[BroadcasterPage] updating broadcast ${broadcastId}`)
        const currentlyPlaying = await spotifyApi.getCurrentlyPlaying()
        await sendCurrentlyPlayingUpdateRef.current(
          broadcastId,
          currentlyPlaying
        )
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [broadcastId])

  useEffect(() => {
    if (!broadcastEnabled) {
      pauseBroadcastRef.current(broadcastId)
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
              broadcastMeta={broadcastMeta}
              currentlyPlaying={currentlyPlaying}
              viewers={viewers}
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

export default BroadcasterPageInner
